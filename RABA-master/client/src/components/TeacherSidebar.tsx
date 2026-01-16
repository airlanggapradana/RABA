import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music, Image, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface TeacherSidebarProps {
  onAudioAdded?: () => void;
}

export const TeacherSidebar = ({ onAudioAdded }: TeacherSidebarProps) => {
  const [audioTitle, setAudioTitle] = useState("");
  const [audioDescription, setAudioDescription] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudioFile(e.target.files[0]);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!audioTitle || !audioFile) {
      toast.error("Title and audio file required");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", audioTitle);
      formData.append("description", audioDescription);
      formData.append("audioFile", audioFile);
      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const res = await fetch("http://localhost:8080/teacher/upload-audio", {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");

      Swal.fire({
        icon: "success",
        title: "Uploaded!",
        text: "Audio and image uploaded successfully",
        timer: 2000
      });

      setAudioTitle("");
      setAudioDescription("");
      setAudioFile(null);
      setImageFile(null);
      
      if (onAudioAdded) onAudioAdded();
    } catch (error) {
      toast.error("Upload failed");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border p-6 space-y-6 overflow-y-auto max-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-2">Add Content</h2>
        <p className="text-sm text-muted-foreground">Upload new audio and images</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Audio File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              placeholder="Audio title"
              value={audioTitle}
              onChange={(e) => setAudioTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Input
              placeholder="Audio description"
              value={audioDescription}
              onChange={(e) => setAudioDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select Audio</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioFileChange}
              className="w-full"
            />
            {audioFile && (
              <p className="text-xs text-muted-foreground mt-1">
                Selected: {audioFile.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Image (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              className="w-full"
            />
            {imageFile && (
              <p className="text-xs text-muted-foreground mt-1">
                Selected: {imageFile.name}
              </p>
            )}
          </div>

          <Button
            onClick={handleUpload}
            className="w-full gap-2"
            disabled={isUploading}
          >
            <Plus className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Audio & Image"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};