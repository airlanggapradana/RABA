import express, { Application } from "express";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";
import { errorHandler } from "./middleware/error-handler";
import { register, login, linkParentChild, getChildToken } from "./controller/auth.controller";
import { 
  myProgress, 
  teacherChildrenProgress, 
  parentChildrenProgress,
  getAudioFiles,
  markAudioOpened,
  markAudioDownloaded,
  assignAudioToStudent,
  removeAudioAssignment,
  getAllStudents,
  getTeacherAssignments,
  getParentLinks,
  linkParentToStudent,
  deleteParentLink,
  getAllParents
} from "./controller/progress.controller";
import { authenticate, authorize } from "./middleware/auth";
import { uploadAudio, uploadImage, getImages, deleteAudio, deleteImage } from "./controller/media.controller";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
}));

// Serve static files from client assets
app.use("/assets", express.static(path.join(__dirname, "../../client/src/assets")));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// auth
app.post("/auth/register", register);
app.post("/auth/login", login);

// media routes
app.post("/teacher/upload-audio", authenticate, authorize(["TEACHER"]), uploadAudio);
app.post("/teacher/upload-image", authenticate, authorize(["TEACHER"]), uploadImage);
app.get("/images", authenticate, getImages);
app.delete("/audio/:audioId", authenticate, deleteAudio);
app.delete("/images/:imageId", authenticate, deleteImage);

// audio routes
app.get("/audio", getAudioFiles);
app.post("/audio/mark-opened", authenticate, markAudioOpened);
app.post("/audio/mark-downloaded", authenticate, markAudioDownloaded);

// teacher assignment routes
app.post("/teacher/assign-audio", authenticate, authorize(["TEACHER"]), assignAudioToStudent);
app.post("/teacher/remove-assignment", authenticate, authorize(["TEACHER"]), removeAudioAssignment);
app.get("/teacher/all-students", authenticate, authorize(["TEACHER"]), getAllStudents);
app.get("/teacher/assignments", authenticate, authorize(["TEACHER"]), getTeacherAssignments);
app.get("/teacher/parent-links", authenticate, authorize(["TEACHER"]), getParentLinks);
app.post("/teacher/link-parent-to-student", authenticate, authorize(["TEACHER"]), linkParentToStudent);
app.delete("/teacher/parent-links/:linkId", authenticate, authorize(["TEACHER"]), deleteParentLink);
app.get("/teacher/all-parents", authenticate, authorize(["TEACHER"]), getAllParents);

// parent routes
app.post("/parent/link-child", authenticate, authorize(["PARENT"]), linkParentChild);

// progress routes
app.get("/me/progress", authenticate, myProgress);
app.get("/teacher/children-progress", authenticate, authorize(["TEACHER"]), teacherChildrenProgress);
app.get("/parent/children-progress", authenticate, authorize(["PARENT"]), parentChildrenProgress);

// ESP32 child token route
app.get("/child/token", authenticate, authorize(["CHILD"]), getChildToken);

app.use(errorHandler);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});