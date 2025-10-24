import {useState} from "react";
import {Outlet, useNavigate, useLocation} from "react-router";
import {LayoutDashboard, Music, Image as ImageIcon, LogOut, Menu, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import logo from "@/assets/upscalemedia-transformed (2).webp"

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {icon: LayoutDashboard, label: "Dashboard", path: "/dashboard"},
    {icon: Music, label: "Audio Files", path: "/audio"},
    {icon: ImageIcon, label: "Images", path: "/images"},
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-sidebar border-r border-sidebar-border transition-all duration-300 overflow-hidden`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold flex items-center">
              <img src={logo} alt="RABA Logo" className="h-8 w-8 mr-2 object-contain rounded-md"/>
              <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
                Raba
              </span>
            </h1>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-3 h-5 w-5"/>
                {item.label}
              </Button>
            ))}
          </nav>

          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => navigate('/auth')}
          >
            <LogOut className="mr-3 h-5 w-5"/>
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
          </Button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
