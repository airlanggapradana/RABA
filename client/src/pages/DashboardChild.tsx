import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Download, Play, CheckCircle2, LogOut } from "lucide-react";
import { toast } from "sonner";
import { authService, type ProgressData, markAudioOpened, markAudioDownloaded } from "@/utils/authService";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Modal } from "@/components/ui/modal";

const DashboardChild = () => {
  const navigate = useNavigate();
  const [audios, setAudios] = useState<ProgressData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<ProgressData | null>(null);

  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      navigate("/auth");
      return;
    }

    const fetchProgress = async () => {
      try {
        // Fetch hanya audio yang di-assign teacher ke student ini
        const progressData = await authService.getMyProgress(token);
        setAudios(progressData);
      } catch (err) {
        toast.error("Failed to load progress");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/auth");
  };

  const handlePlayClick = (audio: ProgressData) => {
    setSelectedAudio(audio);
    setIsModalOpen(true);
  };

  const handleAudioEnded = async () => {
    if (!selectedAudio) return;
    
    const token = authService.getToken();
    if (!token) return;

    try {
      // Mark as opened only when finished
      await markAudioOpened(token, selectedAudio.id);
      
      // Update local state
      setAudios(prev => prev.map(a => 
        a.id === selectedAudio.id ? {...a, openedAt: new Date().toISOString()} : a
      ));

    //   Swal.fire({
    //     icon: "success",
    //     title: "Excellent!",
    //     text: "Audio completed and marked as opened",
    //     timer: 2000
    //   });

    } catch (error) {
      toast.error("Error marking audio");
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAudio(null);
  };

  const handleDownload = async (audioUrl: string, audioId: string) => {
    const token = authService.getToken();
    if (!token) return;

    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audio-${audioId}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Mark as downloaded
      await markAudioDownloaded(token, audioId);

      // Update local state
      setAudios(prev => prev.map(a => 
        a.id === audioId ? {...a, downloadedAt: new Date().toISOString()} : a
      ));

      Swal.fire({
        icon: "success",
        title: "Downloaded",
        text: "Audio downloaded successfully",
        timer: 2000
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Error downloading audio"
      });
      console.error(error);
    }
  };

  const playedCount = audios.filter(a => a.openedAt).length;
  const downloadedCount = audios.filter(a => a.downloadedAt).length;
  const progressPercent = audios.length > 0 ? Math.round((playedCount / audios.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            My Progress
          </h1>
          <p className="text-muted-foreground text-lg">Track your assigned audio learning</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Audio Assigned</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{audios.length}</div>
            <p className="text-xs text-muted-foreground">From your teacher</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playedCount}</div>
            <p className="text-xs text-muted-foreground">Audio files completed</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progressPercent}%</div>
            <p className="text-xs text-muted-foreground">{downloadedCount} downloaded</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <Card><CardContent className="pt-6 text-center">Loading...</CardContent></Card>
      ) : audios.length === 0 ? (
        <Card><CardContent className="pt-6 text-center text-muted-foreground">No audio assigned yet. Wait for your teacher to assign audio.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {audios.map((audio) => (
            <Card key={audio.id} className="shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border-0 bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-xl leading-tight">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600">
                        <Music className="h-5 w-5 text-gray-50" />
                      </div>
                      {audio.title}
                    </CardTitle>
                  </div>
                  {(audio.openedAt || audio.downloadedAt) && (
                    <div className="bg-teal-500 rounded-full p-1">
                      <CheckCircle2 className="h-5 w-5 text-teal-100" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {audio.openedAt && (
                    <Badge className="text-xs bg-teal-600 text-teal-100">✓ Completed</Badge>
                  )}
                  {audio.downloadedAt && (
                    <Badge className="text-xs bg-success/10 text-success">✓ Downloaded</Badge>
                  )}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => handlePlayClick(audio)}
                  >
                    <Play className="h-4 w-4 mr-2 text-teal-500" />
                    Play
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-green-700 hover:shadow-lg transition-all"
                    onClick={() => handleDownload(audio.audioUrl, audio.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Audio Player Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedAudio?.title}
      >
        <div className="space-y-4">
          {selectedAudio && (
            <AudioPlayer
              audioUrl={selectedAudio.audioUrl}
              title={selectedAudio.title}
              onEnded={handleAudioEnded}
            />
          )}
          <p className="text-sm text-muted-foreground text-center">
            Listen to the full audio to mark it as completed
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardChild;