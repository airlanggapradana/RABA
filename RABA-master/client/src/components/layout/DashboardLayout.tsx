import {Outlet, useNavigate, useLocation} from "react-router";
import {useEffect, useState} from "react";
import {authService} from "@/utils/authService";
import {Button} from "@/components/ui/button";
import {LayoutDashboard, Music, Image, Link as LinkIcon, Users, LogOut} from "lucide-react";
import logo from "@/assets/logo.webp";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = authService.getRole();
  const token = authService.getToken();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/auth");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-6 space-y-8 overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="RABA" className="w-8 h-8"/>
          <span className="text-2xl font-bold text-primary">Raba</span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <Button
            variant={isActive("/dashboard/child") || isActive("/dashboard/teacher") || isActive("/dashboard/parent") ? "default" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => {
              if (role === "CHILD") navigate("/dashboard/child");
              else if (role === "TEACHER") navigate("/dashboard/teacher");
              else if (role === "PARENT") navigate("/dashboard/parent");
            }}
          >
            <LayoutDashboard className="h-5 w-5"/>
            Dashboard
          </Button>

          {/* Teacher only menus */}
          {role === "TEACHER" && (
            <>
              <Button
                variant={isActive("/dashboard/teacher/assignments") ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => navigate("/dashboard/teacher/assignments")}
              >
                <LinkIcon className="h-5 w-5"/>
                Assign Audio
              </Button>

              <Button
                variant={isActive("/dashboard/teacher/parent-links") ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => navigate("/dashboard/teacher/parent-links")}
              >
                <Users className="h-5 w-5"/>
                Parent Links
              </Button>

              <Button
                variant={isActive("/dashboard/teacher/audio-files") ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => navigate("/dashboard/teacher/audio-files")}
              >
                <Music className="h-5 w-5"/>
                Audio Files
              </Button>

              <Button
                variant={isActive("/dashboard/teacher/images") ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                onClick={() => navigate("/dashboard/teacher/images")}
              >
                <Image className="h-5 w-5"/>
                Images
              </Button>
            </>
          )}
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-8 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5"/>
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-8">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
