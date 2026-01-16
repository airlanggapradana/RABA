import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import Auth from "@/pages/Auth.tsx";
import NotFound from "@/pages/NotFound.tsx";
import DashboardLayout from "@/components/layout/DashboardLayout.tsx";
import Home from "@/pages/Home.tsx";
import DashboardChild from "@/pages/DashboardChild.tsx";
import DashboardTeacher from "@/pages/DashboardTeacher.tsx";
import DashboardParent from "@/pages/DashboardParent.tsx";
import TeacherAudioFiles from "@/pages/TeacherAudioFiles.tsx";
import TeacherImages from "@/pages/TeacherImages.tsx";
import TeacherAssignments from "@/pages/TeacherAssignments.tsx";
import TeacherParentLink from "@/pages/TeacherParentLink.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path={'/dashboard'} element={<DashboardLayout/>}>
          <Route path="child" element={<DashboardChild/>}/>
          <Route path="teacher" element={<DashboardTeacher/>}/>
          <Route path="parent" element={<DashboardParent/>}/>
          <Route path="teacher/assignments" element={<TeacherAssignments/>}/>
          <Route path="teacher/parent-links" element={<TeacherParentLink/>}/>
          <Route path="teacher/audio-files" element={<TeacherAudioFiles/>}/>
          <Route path="teacher/images" element={<TeacherImages/>}/>
          <Route index element={<Navigate to="/auth" replace />}/>
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
