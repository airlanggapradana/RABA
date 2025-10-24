import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Music, Download, Play, CheckCircle2} from "lucide-react";
import {toast} from "sonner";


interface AudioProgress {
  opened_at: string | null;
  downloaded_at: string | null;
}

const Dashboard = () => {
  const [progress, setProgress] = useState<Record<string, AudioProgress>>({});

  const fetchData = [
    {
      id: "audio1",
      title: "Relaxing Music",
      description: "A soothing track to help you unwind.",
      audio_url: "https://file-examples.com/storage/feace5d51968fb543999f8f/2017/11/file_example_MP3_700KB.mp3",
      image_url: "https://picsum.photos/300/400?random=1"
    },
    {
      id: "audio2",
      title: "Motivational Speech",
      description: "Get inspired with this powerful speech.",
      audio_url: "https://file-examples.com/storage/feace5d51968fb543999f8f/2017/11/file_example_MP3_700KB.mp3",
      image_url: "https://picsum.photos/300/400?random=2"
    }
  ]

  const markAsOpened = async (audioId: string) => {
    const now = new Date().toISOString();
    setProgress(prev => {
      const existing = prev[audioId] ?? {opened_at: null, downloaded_at: null};
      return {
        ...prev,
        [audioId]: {...existing, opened_at: now}
      };
    });
  };

  const handleDownload = async (audioUrl: string, audioId: string) => {
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

      const now = new Date().toISOString();
      setProgress(prev => {
        const existing = prev[audioId] ?? {opened_at: null, downloaded_at: null};
        return {
          ...prev,
          [audioId]: {...existing, downloaded_at: now}
        };
      });

      toast.success("Audio downloaded successfully");
    } catch (error) {
      toast.error("Error downloading audio");
      console.error(error);
    }
  };

  const totalAudio = fetchData.length;
  const playedAudio = Object.values(progress).filter(p => p.opened_at).length;
  const downloadedAudio = Object.values(progress).filter(p => p.downloaded_at).length;
  const overallProgress = totalAudio > 0 ? Math.round((playedAudio / totalAudio) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1
          className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Track your progress with audio files
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Audio Files</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAudio}</div>
            <p className="text-xs text-muted-foreground">Available in library</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Played</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playedAudio}</div>
            <p className="text-xs text-muted-foreground">Audio files opened</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground"/>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <p className="text-xs text-muted-foreground">{downloadedAudio} downloaded</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fetchData.map((audio) => {
          const audioProgress = progress[audio.id];
          const isOpened = audioProgress?.opened_at;
          const isDownloaded = audioProgress?.downloaded_at;

          return (
            <Card key={audio.id}
                  className="shadow-lg hover:shadow-2xl sm:max-w-sm hover:scale-105 transition-all duration-300 overflow-hidden border-0 bg-card">
              {audio.image_url && (
                <div
                  className="relative w-full h-56 bg-gradient-to-br from-muted to-muted/50 overflow-hidden group rounded-lg">
                  <img
                    src={audio.image_url}
                    alt={audio.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                  {(isOpened || isDownloaded) && (
                    <div className="absolute top-3 right-3 bg-teal-500 rounded-full p-1 shadow-lg">
                      <CheckCircle2 className="h-5 w-5 text-success text-teal-100"/>
                    </div>
                  )}
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-xl leading-tight">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600">
                        <Music className="h-5 w-5 text-gray-50"/>
                      </div>
                      {audio.title}
                    </CardTitle>
                    {audio.description && (
                      <CardDescription className="mt-3 text-sm leading-relaxed">
                        {audio.description}
                      </CardDescription>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {isOpened && (
                    <Badge variant="default"
                           className="text-xs font-medium bg-teal-600 text-teal-100 hover:bg-teal-600/90">
                      ✓ Opened
                    </Badge>
                  )}
                  {isDownloaded && (
                    <Badge className="text-xs font-medium bg-success/10 text-success hover:bg-success/20 border-0">
                      ✓ Downloaded
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-primary hover:text-white transition-colors"
                    onClick={() => {
                      markAsOpened(audio.id);
                      window.open(audio.audio_url, "_blank");
                    }}
                  >
                    <Play className="h-4 w-4 mr-2 text-teal-500"/>
                    Play
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-green-700 hover:shadow-lg transition-all"
                    onClick={() => handleDownload(audio.audio_url, audio.id)}
                  >
                    <Download className="h-4 w-4 mr-2"/>
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {fetchData.length === 0 && (
        <Card className="shadow-lg border-0">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="p-4 bg-muted rounded-full mb-4">
              <Music className="h-12 w-12 text-muted-foreground"/>
            </div>
            <p className="text-lg font-semibold mb-2">No audio files yet</p>
            <p className="text-muted-foreground text-center max-w-sm">
              Audio files will appear here once they are added by administrators
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;