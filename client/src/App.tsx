import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from "react-router";
import Auth from "@/pages/Auth.tsx";
import NotFound from "@/pages/NotFound.tsx";
import DashboardLayout from "@/components/layout/DashboardLayout.tsx";
import Dashboard from "@/pages/Dashboard.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path={'/dashboard'} element={<DashboardLayout/>}>
          <Route index element={<Dashboard/>}/>
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
