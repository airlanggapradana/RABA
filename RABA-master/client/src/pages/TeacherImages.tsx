import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Modal } from "@/components/ui/modal";
import { getImages, authService } from "@/utils/authService";

interface Image {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
}

const TeacherImages = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

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
    if (!newTitle || !imageFile) {
      toast.error("Title and image file required");
      return;
    }

    const token = authService.getToken();
    if (!token) return;

    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("description", newDescription);
      formData.append("image", imageFile);

      const res = await fetch("http://localhost:8080/teacher/upload-image", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Image added successfully",
        timer: 2000
      });

      setNewTitle("");
      setNewDescription("");
      setImageFile(null);
      setIsModalOpen(false);

      await fetchImagesData();
    } catch (error) {
      toast.error("Failed to add image");
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

    try {
      const res = await fetch(`http://localhost:8080/images/${imageId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Images
          </h1>
          <p className="text-muted-foreground">Manage your image library</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Image
        </Button>
      </div>

      {loading ? (
        <Card><CardContent className="pt-6 text-center">Loading...</CardContent></Card>
      ) : images.length === 0 ? (
        <Card><CardContent className="pt-6 text-center text-muted-foreground">No images yet</CardContent></Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
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
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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

          <Button onClick={handleAddImage} className="w-full">
            Add Image
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherImages;