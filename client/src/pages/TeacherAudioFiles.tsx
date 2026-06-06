import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Music, Plus, Trash2} from "lucide-react";
import {toast} from "sonner";
import Swal from "sweetalert2";
import {getAudioFiles} from "@/utils/authService";
import {Modal} from "@/components/ui/modal";

interface AudioFile {
  id: string;
  title: string;
  description?: string;
  audioUrl: string;
  theme?: string;
}

const TeacherAudioFiles = () => {
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTheme, setNewTheme] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const data = await getAudioFiles();
        setAudios(data);
      } catch (err) {
        toast.error("Failed to load audio files");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAudios();
  }, []);

  const getThemeCount = (theme: string) => {
    return audios.filter(audio => audio.theme === theme).length;
  };

  const isThemeFull = (theme: string) => {
    return getThemeCount(theme) >= 9;
  };

  const handleAddAudio = async () => {
    if (!newTitle || !audioFile || !newTheme) {
      toast.error("Title, theme, and audio file required");
      return;
    }

    if (isThemeFull(newTheme)) {
      toast.error("Theme is full! Maximum 9 items per theme");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("description", newDescription);
      formData.append("theme", newTheme);
      formData.append("audio", audioFile);

      const res = await fetch(`${API_URL}/teacher/upload-audio`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`},
        body: formData
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || errorData.message || "Upload failed");
      }

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Audio file added successfully",
        timer: 2000
      });

      setNewTitle("");
      setNewDescription("");
      setNewTheme("");
      setAudioFile(null);
      setIsModalOpen(false);

      const data = await getAudioFiles();
      setAudios(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add audio");
      console.error(error);
    }
  };

  const handleDeleteAudio = async (audioId: string) => {
    const confirm = await Swal.fire({
      title: "Delete Audio?",
      text: "This audio will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete"
    });

    if (!confirm.isConfirmed) return;

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${API_URL}/audio/${audioId}`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Audio deleted");
      const data = await getAudioFiles();
      setAudios(data);
    } catch (error) {
      toast.error("Failed to delete audio");
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Audio Files
          </h1>
          <p className="text-muted-foreground">Manage your audio library</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4"/>
          Add Audio
        </Button>
      </div>

      {loading ? (
        <Card><CardContent className="pt-6 text-center">Loading...</CardContent></Card>
      ) : audios.length === 0 ? (
        <Card><CardContent className="pt-6 text-center text-muted-foreground">No audio files yet</CardContent></Card>
      ) : (
        <div className="space-y-6">
          {Array.from(new Set(audios.map(a => a.theme).filter(Boolean)))
            .sort()
            .map((theme) => {
              const themeAudios = audios.filter(a => a.theme === theme);
              return (
                <div key={theme}>
                  <div className="mb-3 flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-gray-700">{theme}</h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      themeAudios.length >= 9 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {themeAudios.length}/9
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {themeAudios.map((audio) => (
                      <Card key={audio.id} className="shadow-md">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500">
                              <Music className="h-5 w-5 text-white"/>
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="truncate">{audio.title}</CardTitle>
                              {audio.description && (
                                <p className="text-xs text-muted-foreground truncate">{audio.description}</p>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => window.open(audio.audioUrl)}
                            >
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteAudio(audio.id)}
                            >
                              <Trash2 className="h-4 w-4"/>
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

      {/* Add Audio Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Audio"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              placeholder="Audio title"
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
              placeholder="Audio description (optional)"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>

          <Button 
            onClick={handleAddAudio} 
            className="w-full"
            disabled={newTheme !== ""  && isThemeFull(newTheme)}
          >
            Add Audio
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherAudioFiles;