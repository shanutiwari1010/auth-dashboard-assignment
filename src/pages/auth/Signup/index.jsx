// <-- Core Imports -->
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

// <-- Icon Imports -->
import { Eye, EyeOff, Loader } from "lucide-react";

// <-- Component Imports -->
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// <-- Utility Imports -->
import { userSignup, userLogin } from "@/api/auth";
import { useDispatch } from "react-redux";
import { login as loginAction } from "@/store/slices/authSlice";

// <-- Form Schema for Sign up form -->
const FormSchema = z.object({
  first_name: z.string().min(2, { message: "Enter your first name" }),
  last_name: z.string().min(2, { message: "Enter your last name" }),
  email: z
    .string()
    .min(2, { message: "Enter your email" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password must not be empty" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password is too long" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
  confirm_password: z
    .string()
    .min(1, { message: "Confirm Password must not be empty" })
    .min(8, { message: "Confirm Password must be at least 8 characters" })
    .max(20, { message: "Confirm Password is too long" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Confirm Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }),
  country_code: z.string().min(1, { message: "Enter your country code" }),
  phone_no: z
    .string()
    .min(1, { message: "Enter your phone number" })
    .max(10, { message: "Phone number cannot be more than 10 characters" }),
});

const SignUpPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpForm = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      country_code: "",
      phone_no: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleuserSignupSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await userSignup(data);

      if (response.status === 201) {
        toast({
          title: "Registered successfully!",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        });
        const loginResponse = await userLogin({
          email: data.email,
          password: data.password,
        });
        dispatch(loginAction(loginResponse.data));
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: error?.response?.data?.error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="flex h-screen justify-center overflow-y-auto max-md:flex-col max-md:items-center max-md:gap-10 max-md:p-2 max-md:py-12">
        <div className="bg-brand-grey-900 relative hidden h-full overflow-hidden bg-white text-foreground lg:block lg:w-1/2">
          <div className="z-50 flex h-screen flex-col items-center justify-center gap-10">
            <div className="auth-sidebar-content-wrapper z-50 space-y-4">
              <>
                <h1 className="max-w-sm text-4xl font-bold drop-shadow-lg">
                  Sign up now to get early access
                </h1>
                <p className="max-w-md text-lg leading-tight text-muted-foreground">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas quae amet unde cum ex, eveniet.
                </p>
              </>
            </div>
            <div className="z-50 h-[31rem]">
              <img
                src="/assets/AuthSignUpImage.svg"
                alt="AuthSignUpImage"
                className="h-[25rem] w-[30rem]"
              />
            </div>
          </div>
        </div>
        <div className="login-auth-wrapper item-center mx-auto flex flex-col justify-center">
          <div className="item-center flex h-full max-w-[30rem] flex-col justify-evenly max-md:max-w-[24rem] max-md:gap-10">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-4xl">
                  Sign <span className="text-secondary">Up</span>
                </CardTitle>
                <CardDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique, nemo debitis doloremque repellendus.
                </CardDescription>
              </CardHeader>
              <CardContent className="login-auth-form w-full">
                <FormProvider {...signUpForm}>
                  <form
                    onSubmit={signUpForm.handleSubmit(handleuserSignupSubmit)}
                    className="space-y-2"
                  >
                    <FormField
                      control={signUpForm.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Enter your first name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Enter your last name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Enter your email address"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
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
                    <FormField
                      control={signUpForm.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
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
                    <div className="flex gap-2 items-center w-full">
                      <FormField
                        control={signUpForm.control}
                        name="country_code"
                        render={({ field }) => (
                          <FormItem className="w-32">
                            <FormLabel>Country Code</FormLabel>
                            <FormControl>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem>+ 91</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={signUpForm.control}
                        name="phone_no"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="text"
                                placeholder="Enter your phone number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      {loading ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </form>
                </FormProvider>
              </CardContent>
              <CardFooter className="dont-have-account-wrapper w-full text-center font-medium text-gray-800">
                <span>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-primary underline-offset-4 hover:text-primary hover:underline"
                  >
                    Login
                  </Link>
                </span>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
