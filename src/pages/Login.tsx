import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login } from "../features/auth/auth.thunks";
import { loginSchema, type LoginSchema } from "../features/auth/auth.schema";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/payquick-logo.svg";
import Background from "@/assets/login-bg.jpg";

export default function Login() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/transactions");
    }
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    dispatch(login(data));
  };

  return (
    <div className="relative p-4 min-h-screen sm:grid sm:grid-cols-[40%_60%] w-full h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
      <Card className="w-full h-full z-10 text-[#05061E] border-0 rounded-2xl shadow-lg bg-white/85 sm:bg-white">
        <CardHeader>
          <img src={Logo} alt="PayQuick logo" height={56} width={208} />
          <CardTitle className="mt-30 text-6xl sm:text-[60px] font-normal">
            Welcome back!
          </CardTitle>
          <CardDescription className="text-xl font-light mt-2 sm:mt-0">
            Please enter your details to log in to your PayQuick account.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 mt-5">
            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                id="email"
                placeholder="Enter your email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* API Error */}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>

          <CardFooter className="mt-5">
            <Button
              type="submit"
              className="w-full bg-[#300B57] hover:bg-[#450D78] text-white font-medium"
              disabled={isLoading}
              size={"lg"}
              variant={"default"}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className="w-full h-full absolute z-0 sm:px-4 sm:static ">
        <div className="w-full h-full sm:rounded-2xl flex items-center justify-start">
          <img
            src={Background}
            alt="Login Background"
            className="h-full w-auto object-cover sm:rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
