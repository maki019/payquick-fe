import { Menu, LogOut } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "@/features/auth/auth.slice";
import Logo from "@/assets/payquick-logo.svg";

export default function Navbar({
  onHamburgerClick,
}: {
  onHamburgerClick?: () => void;
}) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <nav className="h-16 w-full bg-white flex items-center justify-between px-4 shadow border-b border-gray-400 shadow">
      <div className="flex items-center">
        <button className="mr-4 md:hidden" onClick={onHamburgerClick}>
          <Menu className="w-6 h-6 text-[#300B57] hover:text-[#450D78]" />
        </button>

        <img src={Logo} alt="PayQuick logo" className="h-10 w-auto" />
      </div>

      <button
        className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-purple-800 dark:hover:text-white transition"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </nav>
  );
}
