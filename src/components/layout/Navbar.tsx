import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Logo from "@/assets/payquick-logo.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/auth.slice";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth);
  const user = authData.user || { full_name: " User" };
  const firstName = user.full_name.split(" ")[0];
  const greeting = `Hi, ${firstName}`;

  return (
    <header className="bg-white border-b">
      <div className="h-16 max-w-6xl mx-auto px-6 flex items-center justify-between">
        <img src={Logo} alt="PayQuick logo" className="h-10 w-auto" />

        <div className="flex items-center gap-4">
          <span className="text-md font-medium">{greeting}</span>
          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="outline"
            className="hover:bg-amber-600 hover:text-white"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
