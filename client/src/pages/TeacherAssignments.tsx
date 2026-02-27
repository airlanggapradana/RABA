import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { Modal } from "@/components/ui/modal";
import { 
  authService, 
  getAllStudents, 
  getAudioFiles,
  getTeacherAssignments,
  teacherAssignAudio,
  removeAudioAssignment
} from "@/utils/authService";

interface Student {
  id: string;
  fullName: string;
}

interface AudioFile {
  id: string;
  title: string;
  theme?: string;
}

interface Assignment {
  id: string;
  audioId: string;
  studentId: string;
  audio: AudioFile;
  student: Student;
}

interface ThemeAssignment {
  id: string;
  theme: string;
  student: { id: string; fullName: string };
  teacher: { id: string; fullName: string };
  totalMedia: number;
  openedMedia: number;
  percentage: number;
  createdAt: string;
}

const TeacherAssignments = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [themeAssignments, setThemeAssignments] = useState<ThemeAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedAudio, setSelectedAudio] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"audio" | "theme">("audio");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = authService.getToken();
    if (!token) return;

    const fetchData = async () => {
      try {
        const [studentsData, audiosData, assignmentsData] = await Promise.all([
          getAllStudents(token),
          getAudioFiles(),
          getTeacherAssignments(token)
        ]);

        setStudents(studentsData);
        setAudios(audiosData);
        setAssignments(assignmentsData);

        // Fetch theme assignments
        const themeRes = await fetch(`${API_URL}/teacher/theme-assignments`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (themeRes.ok) {
          const themeData = await themeRes.json();
          setThemeAssignments(themeData);
        }
      } catch (err) {
        toast.error("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignAudio = async () => {
    if (!selectedStudent || !selectedAudio) {
      toast.error("Select both student and audio");
      return;
    }

    const token = authService.getToken();
    if (!token) return;

    try {
      await teacherAssignAudio(token, selectedAudio, selectedStudent);
      
      const assignmentsData = await getTeacherAssignments(token);
      setAssignments(assignmentsData);

      Swal.fire({
        icon: "success",
        title: "Assigned!",
        text: "Audio assigned to student successfully",
        timer: 2000
      });

      setSelectedStudent("");
      setSelectedAudio("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to assign audio");
      console.error(error);
    }
  };

  const handleAssignTheme = async () => {
    if (!selectedStudent || !selectedTheme) {
      toast.error("Select both student and theme");
      return;
    }

    const token = authService.getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/teacher/assign-theme`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          studentId: selectedStudent,
          theme: selectedTheme
        })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to assign theme");
      }

      // Refresh theme assignments
      const themeRes = await fetch(`${API_URL}/teacher/theme-assignments`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (themeRes.ok) {
        const themeData = await themeRes.json();
        setThemeAssignments(themeData);
      }

      Swal.fire({
        icon: "success",
        title: "Assigned!",
        text: "Theme assigned to student successfully",
        timer: 2000
      });

      setSelectedStudent("");
      setSelectedTheme("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to assign theme");
      console.error(error);
    }
  };

  const handleRemoveAssignment = async (audioId: string, studentId: string) => {
    const token = authService.getToken();
    if (!token) return;

    const confirm = await Swal.fire({
      title: "Remove Assignment?",
      text: "Are you sure you want to remove this audio assignment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove"
    });

    if (!confirm.isConfirmed) return;

    try {
      await removeAudioAssignment(token, audioId, studentId);
      
      const assignmentsData = await getTeacherAssignments(token);
      setAssignments(assignmentsData);

      toast.success("Assignment removed");
    } catch (error) {
      toast.error("Failed to remove assignment");
      console.error(error);
    }
  };

  const handleRemoveThemeAssignment = async (assignmentId: string) => {
    const token = authService.getToken();
    if (!token) return;

    const confirm = await Swal.fire({
      title: "Remove Assignment?",
      text: "Are you sure you want to remove this theme assignment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove"
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/teacher/theme-assignment/${assignmentId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Failed to remove");

      // Refresh theme assignments
      const themeRes = await fetch(`${API_URL}/teacher/theme-assignments`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (themeRes.ok) {
        const themeData = await themeRes.json();
        setThemeAssignments(themeData);
      }

      toast.success("Assignment removed");
    } catch (error) {
      toast.error("Failed to remove assignment");
      console.error(error);
    }
  };

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student?.fullName || "Unknown";
  };

  const getAudioTitle = (audioId: string) => {
    const audio = audios.find(a => a.id === audioId);
    return audio?.title || "Unknown";
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Assignments
          </h1>
          <p className="text-muted-foreground">Manage audio and theme assignments</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Assignment
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("audio")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "audio"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Audio Assignments
        </button>
        <button
          onClick={() => setActiveTab("theme")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "theme"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Theme Assignments
        </button>
      </div>

      {/* Audio Assignments Tab */}
      {activeTab === "audio" && (
        <>
          {loading ? (
            <Card><CardContent className="pt-6 text-center">Loading...</CardContent></Card>
          ) : assignments.length === 0 ? (
            <Card><CardContent className="pt-6 text-center text-muted-foreground">No audio assignments yet.</CardContent></Card>
          ) : (
            <div className="space-y-3">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="shadow-md">
                  <CardContent className="pt-6 flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{assignment.audio.title}</p>
                      <p className="text-sm text-muted-foreground">Assigned to: {assignment.student.fullName}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveAssignment(assignment.audioId, assignment.studentId)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Theme Assignments Tab */}
      {activeTab === "theme" && (
        <>
          {loading ? (
            <Card><CardContent className="pt-6 text-center">Loading...</CardContent></Card>
          ) : themeAssignments.length === 0 ? (
            <Card><CardContent className="pt-6 text-center text-muted-foreground">No theme assignments yet.</CardContent></Card>
          ) : (
            <div className="space-y-3">
              {themeAssignments.map((assignment) => (
                <Card key={assignment.id} className="shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{assignment.theme}</p>
                        <p className="text-sm text-muted-foreground">Student: {assignment.student.fullName}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {assignment.openedMedia} / {assignment.totalMedia} media opened
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-green-500 transition-all"
                            style={{ width: `${assignment.percentage}%` }}
                          />
                        </div>
                        <p className="font-bold text-lg">{assignment.percentage}%</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveThemeAssignment(assignment.id)}
                        className="text-destructive hover:bg-destructive/10 ml-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Assignment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent("");
          setSelectedAudio("");
          setSelectedTheme("");
        }}
        title={activeTab === "audio" ? "Assign Audio to Student" : "Assign Theme to Student"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">-- Choose Student --</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.fullName}
                </option>
              ))}
            </select>
          </div>

          {activeTab === "audio" ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Select Audio</label>
                <select
                  value={selectedAudio}
                  onChange={(e) => setSelectedAudio(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                >
                  <option value="">-- Choose Audio --</option>
                  {audios.map((audio) => (
                    <option key={audio.id} value={audio.id}>
                      {audio.title}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handleAssignAudio} className="w-full">
                Assign Audio
              </Button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Select Theme</label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-sm"
                >
                  <option value="">-- Choose Theme --</option>
                  {Array.from(new Set(audios.map((a) => a.theme).filter(Boolean))).map((theme) => (
                    <option key={theme} value={theme}>
                      {theme}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={handleAssignTheme} className="w-full">
                Assign Theme
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TeacherAssignments;