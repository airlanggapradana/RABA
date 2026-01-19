"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const error_handler_1 = require("./middleware/error-handler");
const auth_controller_1 = require("./controller/auth.controller");
const progress_controller_1 = require("./controller/progress.controller");
const auth_1 = require("./middleware/auth");
const media_controller_1 = require("./controller/media.controller");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB
}));
// Serve static files from client assets
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "../../client/src/assets")));
// auth
app.post("/auth/register", auth_controller_1.register);
app.post("/auth/login", auth_controller_1.login);
// media routes
app.post("/teacher/upload-audio", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), media_controller_1.uploadAudio);
app.post("/teacher/upload-image", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), media_controller_1.uploadImage);
app.get("/images", auth_1.authenticate, media_controller_1.getImages);
app.delete("/audio/:audioId", auth_1.authenticate, media_controller_1.deleteAudio);
app.delete("/images/:imageId", auth_1.authenticate, media_controller_1.deleteImage);
// audio routes
app.get("/audio", progress_controller_1.getAudioFiles);
app.post("/audio/mark-opened", auth_1.authenticate, progress_controller_1.markAudioOpened);
app.post("/audio/mark-downloaded", auth_1.authenticate, progress_controller_1.markAudioDownloaded);
// teacher assignment routes
app.post("/teacher/assign-audio", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), progress_controller_1.assignAudioToStudent);
app.post("/teacher/remove-assignment", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), progress_controller_1.removeAudioAssignment);
app.get("/teacher/all-students", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), progress_controller_1.getAllStudents);
app.get("/teacher/assignments", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), progress_controller_1.getTeacherAssignments);
app.get("/teacher/parent-links", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), progress_controller_1.getParentLinks);
app.post("/teacher/link-parent-to-student", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), progress_controller_1.linkParentToStudent);
app.delete("/teacher/parent-links/:linkId", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), progress_controller_1.deleteParentLink);
app.get("/teacher/all-parents", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), progress_controller_1.getAllParents);
// parent routes
app.post("/parent/link-child", auth_1.authenticate, (0, auth_1.authorize)(["PARENT"]), auth_controller_1.linkParentChild);
// progress routes
app.get("/me/progress", auth_1.authenticate, progress_controller_1.myProgress);
app.get("/teacher/children-progress", auth_1.authenticate, (0, auth_1.authorize)(["TEACHER"]), progress_controller_1.teacherChildrenProgress);
app.get("/parent/children-progress", auth_1.authenticate, (0, auth_1.authorize)(["PARENT"]), progress_controller_1.parentChildrenProgress);
// ESP32 child token route
app.get("/child/token", auth_1.authenticate, (0, auth_1.authorize)(["CHILD"]), auth_controller_1.getChildToken);
app.use(error_handler_1.errorHandler);
// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(8080, () => {
        console.log("Server is running on http://localhost:8080");
    });
}
// Export for Vercel
exports.default = app;
//# sourceMappingURL=server.js.map