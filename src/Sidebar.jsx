import {
  LayoutDashboard,
  Search,
  PlusCircle,
  ClipboardList,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "./AuthContext.jsx";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "browse", label: "Browse Items", icon: Search },
  { id: "report", label: "Report Item", icon: PlusCircle },
  { id: "my-reports", label: "My Reports", icon: ClipboardList },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const bottomItems = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help & FAQ", icon: HelpCircle },
];

function NavList({ items, activePage, onNavigate }) {
  return (
    <ul className="space-y-1">
      {items.map(({ id, label, icon: Icon }) => {
        const isActive = activePage === id;
        return (
          <li key={id}>
            <button
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className={`w-[18px] h-[18px] ${isActive ? "text-blue-500" : "text-gray-400"}`} />
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Sidebar({ activePage, onNavigate, mobile = false }) {
  const { user, logout } = useAuth();

  return (
    <aside className={`${mobile ? "flex" : "hidden lg:flex"} flex-col w-56 bg-white border-r border-gray-200 flex-shrink-0`}>
      {/* Logo */}
      {!mobile && (
        <div className="px-5 py-5 border-b border-gray-100">
          <h1 className="text-base font-bold text-blue-500 leading-tight">
            Campus
            <br />
            Lost &amp; Found
          </h1>
        </div>
      )}

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4">
        <NavList items={navItems} activePage={activePage} onNavigate={onNavigate} />
      </nav>

      {/* Bottom nav */}
      <div className="px-3 py-3 border-t border-gray-100">
        <NavList items={bottomItems} activePage={activePage} onNavigate={onNavigate} />
      </div>

      {/* User section */}
      {user && (
        <div className="px-3 py-3 border-t border-gray-100">
          <div className="flex items-center gap-2.5 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-blue-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
              <p className="text-[11px] text-gray-400 capitalize">{user.role}</p>
            </div>
            <button
              onClick={logout}
              className="text-gray-300 hover:text-red-500 transition-colors p-1"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
