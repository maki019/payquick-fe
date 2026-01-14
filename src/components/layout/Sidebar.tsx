import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { HomeIcon, CreditCardIcon, UserIcon, SettingsIcon } from "lucide-react";

export default function Sidebar({ className }: { className?: string }) {
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <CreditCardIcon className="w-5 h-5" />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserIcon className="w-5 h-5" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <SettingsIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full justify-between bg-white border-r border-gray-400 shadow",
        className
      )}
    >
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md hover:text-white hover:bg-[#450D78] transition-colors",
                isActive ? "bg-[#450D78] text-white" : ""
              )
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="text-sm text-gray-400">© 2026 PayQuick Demo</div>
    </div>
  );
}
