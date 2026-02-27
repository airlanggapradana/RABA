import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Download, CheckCircle2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { authService } from "@/utils/authService";
import { Modal } from "@/components/ui/modal";
import { AudioPlayer } from "@/components/ui/audio-player";
import Swal from "sweetalert2";

interface MediaProgress {
  id: string;
  mediaId: string;
  mediaType: string;
  openedAt: string | null;
  downloadedAt: string | null;
  details: {
    id: string;
    title: string;
    audioUrl?: string;
    imageUrl?: string;
  };
}

interface ThemeAssignment {
  id: string;
  theme: string;
  teacher: { id: string; fullName: string };
  totalMedia: number;
  openedMedia: number;
  percentage: number;
  createdAt: string;
  media: MediaProgress[];
}

const StudentThemeAssignments = () => {
  const [assignments, setAssignments] = useState<ThemeAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<ThemeAssignment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaProgress | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = authService.getToken();
    if (!token) return;

    const fetchAssignments = async () => {
      try {
        const res = await fetch(`${API_URL}/student/theme-assignments`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Failed to fetch assignments");

        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        toast.error("Failed to load theme assignments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const handleMarkOpened = async (assignmentId: string, mediaId: string) => {
    const token = authService.getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/student/mark-media-opened`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ assignmentId, mediaId })
      });

      if (!res.ok) throw new Error("Failed to mark as opened");

      // Update local state
      setAssignments(prev => prev.map(assignment =>
        assignment.id === assignmentId
          ? {
              ...assignment,
              media: assignment.media.map(m =>
                m.mediaId === mediaId
                  ? { ...m, openedAt: new Date().toISOString() }
                  : m
              ),
              openedMedia: assignment.media.some(m => m.mediaId === mediaId && !m.openedAt)
                ? assignment.openedMedia + 1
                : assignment.openedMedia,
              percentage: Math.round((
                (assignment.openedMedia + (assignment.media.some(m => m.mediaId === mediaId && !m.openedAt) ? 1 : 0)) /
                assignment.totalMedia
              ) * 100)
            }
          : assignment
      ));

      if (selectedTheme?.id === assignmentId) {
        setSelectedTheme(prev => prev ? {
          ...prev,
          media: prev.media.map(m =>
            m.mediaId === mediaId
              ? { ...m, openedAt: new Date().toISOString() }
              : m
          ),
          openedMedia: prev.media.some(m => m.mediaId === mediaId && !m.openedAt)
            ? prev.openedMedia + 1
            : prev.openedMedia,
          percentage: Math.round((
            (prev.openedMedia + (prev.media.some(m => m.mediaId === mediaId && !m.openedAt) ? 1 : 0)) /
            prev.totalMedia
          ) * 100)
        } : null);
      }
    } catch (error) {
      toast.error("Failed to mark media as opened");
      console.error(error);
    }
  };

  const handleMarkDownloaded = async (assignmentId: string, mediaId: string) => {
    const token = authService.getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/student/mark-media-downloaded`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ assignmentId, mediaId })
      });

      if (!res.ok) throw new Error("Failed to mark as downloaded");

      await handleMarkOpened(assignmentId, mediaId);

      Swal.fire({
        icon: "success",
        title: "Downloaded",
        text: "Media downloaded successfully",
        timer: 1500
      });
    } catch (error) {
      toast.error("Failed to download media");
      console.error(error);
    }
  };

  const handlePlayAudio = (media: MediaProgress) => {
    if (media.mediaType === "AUDIO") {
      setSelectedMedia(media);
      setIsMediaModalOpen(true);
    }
  };

  const handleAudioEnded = async () => {
    if (!selectedMedia || !selectedTheme) return;
    await handleMarkOpened(selectedTheme.id, selectedMedia.mediaId);
  };

  if (loading) {
    return <Card><CardContent className="pt-6 text-center">Loading theme assignments...</CardContent></Card>;
  }

  if (assignments.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          No theme assignments yet. Wait for your teacher to assign themes.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <BookOpen className="h-6 w-6" />
          Theme Assignments
        </h2>
        <p className="text-muted-foreground">Learning themes assigned by your teacher</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="shadow-md hover:shadow-lg transition-all cursor-pointer" onClick={() => {
            setSelectedTheme(assignment);
            setIsModalOpen(true);
          }}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{assignment.theme}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">by {assignment.teacher.fullName}</p>
                </div>
                <Badge className="ml-2">
                  {assignment.openedMedia}/{assignment.totalMedia}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Progress</span>
                  <span className="font-bold">{assignment.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-500"
                    style={{ width: `${assignment.percentage}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {assignment.openedMedia} of {assignment.totalMedia} media opened
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Theme Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTheme(null);
        }}
        title={selectedTheme?.theme}
      >
        {selectedTheme && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="p-3 bg-blue-100 rounded-lg">
                <div className="font-bold text-blue-900">{selectedTheme.totalMedia}</div>
                <div className="text-xs text-blue-700">Total Media</div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <div className="font-bold text-green-900">{selectedTheme.openedMedia}</div>
                <div className="text-xs text-green-700">Opened</div>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <div className="font-bold text-purple-900">{selectedTheme.percentage}%</div>
                <div className="text-xs text-purple-700">Progress</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Media List</h3>
              {selectedTheme.media.map((media) => (
                <div key={media.mediaId} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {media.mediaType === "AUDIO" ? (
                          <span className="text-sm font-medium">🎵 {media.details.title}</span>
                        ) : (
                          <span className="text-sm font-medium">🖼️ {media.details.title}</span>
                        )}
                      </div>
                      <div className="flex gap-2 mt-1">
                        {media.openedAt && (
                          <Badge className="text-xs bg-green-100 text-green-800">✓ Opened</Badge>
                        )}
                        {media.downloadedAt && (
                          <Badge className="text-xs bg-blue-100 text-blue-800">✓ Downloaded</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {media.mediaType === "AUDIO" ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handlePlayAudio(media)}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Play
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleMarkDownloaded(selectedTheme.id, media.mediaId)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => window.open(media.details.imageUrl)}
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleMarkDownloaded(selectedTheme.id, media.mediaId)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                      </>
                    )}
                    {!media.openedAt && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMarkOpened(selectedTheme.id, media.mediaId)}
                      >
                        Mark ✓
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Audio Player Modal */}
      <Modal
        isOpen={isMediaModalOpen}
        onClose={() => {
          setIsMediaModalOpen(false);
          setSelectedMedia(null);
        }}
        title={selectedMedia?.details.title}
      >
        {selectedMedia && selectedMedia.mediaType === "AUDIO" && (
          <div className="space-y-4">
            <AudioPlayer
              audioUrl={selectedMedia.details.audioUrl!}
              title={selectedMedia.details.title}
              onEnded={handleAudioEnded}
            />
            <p className="text-sm text-muted-foreground text-center">
              Listen to the full audio to mark it as completed
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default StudentThemeAssignments;
