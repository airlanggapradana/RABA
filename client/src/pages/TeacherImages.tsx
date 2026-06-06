import {useEffect, useState} from "react";
import {Card, CardContent,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Plus, Trash2} from "lucide-react";
import {toast} from "sonner";
import Swal from "sweetalert2";
import {Modal} from "@/components/ui/modal";
import {getImages, authService} from "@/utils/authService";

interface Image {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  theme?: string;
}

const TeacherImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTheme, setNewTheme] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const getThemeCount = (theme: string) => {
    return images.filter(image => image.theme === theme).length;
  };

  const isThemeFull = (theme: string) => {
    return getThemeCount(theme) >= 9;
  };

  const fetchImagesData = async () => {
    const token = authService.getToken();
    if (!token) return;

    try {
      const data = await getImages(token);
      setImages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagesData();
  }, []);

  const handleAddImage = async () => {
    if (!newTitle || !imageFile || !newTheme) {
      toast.error("Title, theme, and image file required");
      return;
    }

    if (isThemeFull(newTheme)) {
      toast.error("Theme is full! Maximum 9 items per theme");
      return;
    }

    const token = authService.getToken();
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("description", newDescription);
      formData.append("theme", newTheme);
      formData.append("image", imageFile);

      const res = await fetch(`${API_URL}/teacher/upload-image`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${token}`},
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || errorData.message || "Upload failed");
      }

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Image added successfully",
        timer: 2000
      });

      setNewTitle("");
      setNewDescription("");
      setNewTheme("");
      setImageFile(null);
      setIsModalOpen(false);

      await fetchImagesData();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add image");
      console.error(error);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    const token = authService.getToken();
    if (!token) return;

    const confirm = await Swal.fire({
      title: "Delete Image?",
      text: "This image will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete"
    });

    if (!confirm.isConfirmed) return;

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${API_URL}/images/${imageId}`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${token}`}
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Image deleted");
      await fetchImagesData();
    } catch (error) {
      toast.error("Failed to delete image");
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Images
          </h1>
          <p className="text-muted-foreground">Manage your image library</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4"/>
          Add Image
        </Button>
      </div>

      {loading ? (
        <Card><CardContent className="pt-6 text-center">Loading...</CardContent></Card>
      ) : images.length === 0 ? (
        <Card><CardContent className="pt-6 text-center text-muted-foreground">No images yet</CardContent></Card>
      ) : (
        <div className="space-y-6">
          {Array.from(new Set(images.map(i => i.theme).filter(Boolean)))
            .sort()
            .map((theme) => {
              const themeImages = images.filter(i => i.theme === theme);
              return (
                <div key={theme}>
                  <div className="mb-3 flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-700">{theme}</h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      themeImages.length >= 9 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {themeImages.length}/9
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {themeImages.map((image) => (
                      <Card key={image.id} className="shadow-md overflow-hidden">
                        <div className="aspect-square bg-muted overflow-hidden">
                          <img
                            src={image.imageUrl}
                            alt={image.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                            onError={(e) => {
                              console.error("Image failed to load:", image.imageUrl);
                              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50' y='50' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23999'%3EFailed to load%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <CardContent className="pt-3">
                          <p className="text-sm font-medium truncate">{image.title}</p>
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 h-8"
                              onClick={() => window.open(image.imageUrl)}
                            >
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10 h-8"
                              onClick={() => handleDeleteImage(image.id)}
                            >
                              <Trash2 className="h-3 w-3"/>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Add Image Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Image"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              placeholder="Image title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Theme <span className="text-destructive">*</span>
              {newTheme && (
                <span className={`ml-2 text-xs ${isThemeFull(newTheme) ? 'text-destructive' : 'text-green-600'}`}>
                  ({getThemeCount(newTheme)}/9)
                </span>
              )}
            </label>
            <Input
              placeholder="e.g., Alat makan, Buah-buahan, Hewan"
              value={newTheme}
              onChange={(e) => setNewTheme(e.target.value)}
            />
            {newTheme && isThemeFull(newTheme) && (
              <p className="text-xs text-destructive mt-1">⚠️ This theme is full (9/9 items). Choose another theme.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Input
              placeholder="Image description (optional)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image File</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>

          <Button 
            onClick={handleAddImage} 
            className="w-full"
            disabled={newTheme !== "" && isThemeFull(newTheme)}
          >
            Add Image
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherImages;