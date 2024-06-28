// <-- Core Imports -->
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { GoogleLogin } from "@react-oauth/google";

// <-- Icon Imports -->
import { Eye, EyeOff, Globe, Loader } from "lucide-react";

// <-- Component Imports -->
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { store } from "@/store";
import { useToast } from "@/components/ui/use-toast";

// <-- Utility Imports -->
import { userLogin } from "@/api/auth";
import { login as loginAction } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import { Separator } from "@/components/ui/separator";

// <-- Form Schema for Login form -->
const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await userLogin(values);

      dispatch(loginAction(response.data));
      const { userData } = store.getState().auth;

      if (userData && userData?.record?.authtoken) {
        navigate("/dashboard");
        toast({
          title: "Login successful!",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        });
      }
    } catch (error) {
      console.log(error, 101010);
      toast({
        title: "Invalid Credentials!",
        description: error?.response?.data?.error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="flex h-screen justify-center max-md:h-full max-md:flex-col max-md:items-center max-md:gap-10 max-md:p-2 max-md:py-10">
        <div className="bg-brand-grey-900 relative hidden h-full overflow-hidden bg-white text-white lg:block lg:w-1/2">
          <div className="flex h-full flex-col items-center justify-center gap-10 bg-auth-sidebar-gradient">
            <div className="auth-sidebar-content-wrapper max-w-xl space-y-4 text-center text-4xl font-bold drop-shadow-lg">
              <h1>Welcome back.</h1>
              <h1 className="leading-tight">
                Let's pick up where you left off.
              </h1>
            </div>
            <img
              src="/assets/LoginSidebarImageAsset.svg"
              alt="LoginSidebarBackgroundImage"
              className="w-[30rem]"
            />
          </div>
        </div>
        <Card className="login-auth-wrapper relative m-auto mx-auto flex max-w-[30rem] flex-col items-start justify-center shadow-lg max-md:max-w-[24rem] max-md:items-center">
          <CardHeader>
            <CardTitle className="text-4xl">
              Log <span className="text-secondary">In</span>
            </CardTitle>
            <CardDescription>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
              sapiente quam voluptate tempora aliquam repellat,
            </CardDescription>
          </CardHeader>
          <CardContent className="login-auth-form w-full flex flex-col gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleLoginSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                            />
                            <Button
                              type="button"
                              variant="unstyled"
                              size="icon"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 cursor-pointer pr-2 text-gray-900"
                            >
                              {showPassword ? (
                                <Eye className="h-5 w-5" />
                              ) : (
                                <EyeOff className="h-5 w-5" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Link to="/forgot-password">
                      <Label className="cursor-pointer font-semibold underline-offset-4 transition-all ease-in-out hover:text-primary hover:underline">
                        Forgot Password?
                      </Label>
                    </Link>
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full">
                  {loading ? <Loader className="animate-spin" /> : "Login"}
                </Button>
              </form>
            </Form>
            <Separator />
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </CardContent>
          <CardFooter className="dont-have-account-wrapper w-full text-center font-medium text-gray-800">
            <span>
              Don't have account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-primary underline-offset-4 hover:text-primary hover:underline"
              >
                Sign up
              </Link>
            </span>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default LoginPage;
