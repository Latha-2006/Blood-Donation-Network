import { Home, FileText, User, Award } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface BottomNavProps {
  items?: NavItem[];
}

const BottomNav = ({ items }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const defaultItems: NavItem[] = [
    { icon: Home, label: "Home", path: "" },
    { icon: FileText, label: "Requests", path: "/requests" },
    { icon: Award, label: "Rewards", path: "/rewards" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const navItems = items || defaultItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const fullPath = location.pathname.split('/').slice(0, 3).join('/') + item.path;
          const isActive = location.pathname === fullPath;

          return (
            <button
              key={item.label}
              onClick={() => navigate(fullPath)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
