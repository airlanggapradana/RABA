import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus, Trash2, Users} from "lucide-react";
import {toast} from "sonner";
import Swal from "sweetalert2";
import {Modal} from "@/components/ui/modal";
import {authService, getAllStudents, getAllParents} from "@/utils/authService";

interface Student {
  id: string;
  fullName: string;
}

interface Parent {
  id: string;
  fullName: string;
  email: string;
}

interface ParentLink {
  id: string;
  parentId: string;
  childId: string;
  parent: { id: string; fullName: string };
  child: { id: string; fullName: string };
}

const TeacherParentLink = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [parentLinks, setParentLinks] = useState<ParentLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<string>("");

  const API_URL = import.meta.env.VITE_API_URL;

  const token = authService.getToken();

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [studentsData, parentsData] = await Promise.all([
          getAllStudents(token),
          getAllParents(token)
        ]);

        setStudents(studentsData);
        setParents(parentsData);

        // Fetch parent links
        const res = await fetch(`${API_URL}/teacher/parent-links`, {
          headers: {"Authorization": `Bearer ${token}`}
        });
        if (res.ok) {
          const data = await res.json();
          setParentLinks(data);
        }
      } catch (err) {
        toast.error("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleLinkParent = async () => {
    if (!selectedParent || !selectedStudent) {
      toast.error("Select both parent and student");
      return;
    }

    if (!token) return;

    // Get parent email from selected parent
    const parent = parents.find(p => p.id === selectedParent);
    if (!parent) {
      toast.error("Parent not found");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const res = await fetch(`${API_URL}/teacher/link-parent-to-student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({parentEmail: parent.email, studentId: selectedStudent})
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to link parent");
      }

      Swal.fire({
        icon: "success",
        title: "Linked!",
        text: "Parent linked to student successfully",
        timer: 2000
      });

      setSelectedParent("");
      setSelectedStudent("");
      setIsModalOpen(false);

      // Refresh links
      const res2 = await fetch(`${API_URL}/teacher/parent-links`, {
        headers: {"Authorization": `Bearer ${token}`}
      });
      if (res2.ok) {
        const data = await res2.json();
        setParentLinks(data);
      }
    } catch (error) {
      toast.error((error as Error).message || "Failed to link parent");
      console.error(error);
    }
  };

  const handleRemoveLink = async (linkId: string) => {
    if (!token) return;

    const confirm = await Swal.fire({
      title: "Remove Link?",
      text: "Are you sure you want to remove this parent-student link?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove"
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}/teacher/parent-links/${linkId}`, {
        method: "DELETE",
        headers: {"Authorization": `Bearer ${token}`}
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Link removed");

      const res2 = await fetch("${API_URL}/teacher/parent-links", {
        headers: {"Authorization": `Bearer ${token}`}
      });
      if (res2.ok) {
        const data = await res2.json();
        setParentLinks(data);
      }
    } catch (error) {
      toast.error("Failed to remove link");
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
            Link Parent to Student
          </h1>
          <p className="text-muted-foreground">Manage parent-student relationships</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4"/>
          New Link
        </Button>
      </div>

      {loading ? (
        <Card><CardContent className="pt-6 text-center">Loading...</CardContent></Card>
      ) : parentLinks.length === 0 ? (
        <Card><CardContent className="pt-6 text-center text-muted-foreground">No parent-student links yet</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {parentLinks.map((link) => (
            <Card key={link.id} className="shadow-md">
              <CardContent className="pt-6 flex items-center justify-between">
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    <Users className="h-4 w-4"/>
                    {link.parent.fullName}
                  </p>
                  <p className="text-sm text-muted-foreground">Parent of: {link.child.fullName}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveLink(link.id)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4"/>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Link Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Link Parent to Student"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Parent</label>
            <select
              value={selectedParent}
              onChange={(e) => setSelectedParent(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">-- Choose Parent --</option>
              {parents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.fullName} ({parent.email})
                </option>
              ))}
            </select>
          </div>

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

          <Button onClick={handleLinkParent} className="w-full">
            Link Parent to Student
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherParentLink;