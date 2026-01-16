import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, LogOut, Music } from "lucide-react";
import { toast } from "sonner";
import { 
  authService, 
  type ChildProgress
} from "@/utils/authService";
import { useNavigate } from "react-router";

const DashboardTeacher = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState<ChildProgress[]>([]);
  const [totalAudio, setTotalAudio] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    const role = authService.getRole();
    if (!token || role !== "TEACHER") {
      navigate("/auth");
      return;
    }

    const fetchData = async () => {
      try {
        const childrenData = await authService.getTeacherChildrenProgress(token);
        setChildren(childrenData.children);
        setTotalAudio(childrenData.totalAudio);
      } catch (err) {
        toast.error("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/auth");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Students Progress
          </h1>
          <p className="text-muted-foreground text-lg">Monitor your students' learning</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{children.length}</div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Audio</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalAudio}</div>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <Card><CardContent className="pt-6 text-center">Loading...</CardContent></Card>
      ) : children.length === 0 ? (
        <Card><CardContent className="pt-6 text-center text-muted-foreground">No students with assignments yet</CardContent></Card>
      ) : (
        <div className="space-y-4">
          {children.map((child) => (
            <Card key={child.childId} className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{child.fullName}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{child.progressPercent}%</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={child.progressPercent} className="h-3" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-xl font-bold">{child.played} / {totalAudio}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Downloaded</p>
                    <p className="text-xl font-bold">{child.downloaded} / {totalAudio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardTeacher;