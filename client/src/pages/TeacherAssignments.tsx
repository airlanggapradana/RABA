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
}

interface Assignment {
  id: string;
  audioId: string;
  studentId: string;
  audio: AudioFile;
  student: Student;
}

const TeacherAssignments = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [audios, setAudios] = useState<AudioFile[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedAudio, setSelectedAudio] = useState<string>("");

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
            Assign Audio
          </h1>
          <p className="text-muted-foreground">Manage audio assignments for students</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Assignment
        </Button>
      </div>

      {loading ? (
        <Card><CardContent className="pt-6 text-center">Loading...</CardContent></Card>
      ) : assignments.length === 0 ? (
        <Card><CardContent className="pt-6 text-center text-muted-foreground">No assignments yet. Create one to get started.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="shadow-md">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{getAudioTitle(assignment.audioId)}</p>
                  <p className="text-sm text-muted-foreground">Assigned to: {getStudentName(assignment.studentId)}</p>
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

      {/* Assign Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Assign Audio to Student"
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
        </div>
      </Modal>
    </div>
  );
};

export default TeacherAssignments;