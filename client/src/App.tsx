import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import Auth from "@/pages/Auth.tsx";
import NotFound from "@/pages/NotFound.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace/>}/>
        <Route path="/auth" element={<Auth/>}/>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
