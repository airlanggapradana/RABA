import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, type LoginSchema, signupSchema, type SignupSchema} from "@/utils/zod.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import logo from "@/assets/logo.webp"
import {useNavigate} from "react-router";
import {authService} from "@/utils/authService.ts";
import {toast} from "sonner";
import {useState} from "react";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"CHILD" | "PARENT" | "TEACHER">("CHILD");

  const form = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const formRegister = useForm<SignupSchema>({
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      role: "CHILD",
    },
    resolver: zodResolver(signupSchema),
  })

  const handleSignup: SubmitHandler<SignupSchema> = async (data) => {
    setIsLoading(true);
    try {
      const res = await authService.register(data.email, data.password, data.fullName, data.role);
      toast.success("Registration successful! Please login.");
      formRegister.reset();
    } catch (err) {
      toast.error("Registration failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setIsLoading(true);
    try {
      const res = await authService.login(data.email, data.password);
      authService.saveToken(res.token, res.role, res.userId);
      toast.success("Login successful!");
      
      // Route ke dashboard sesuai role
      if (res.role === "TEACHER") navigate('/dashboard/teacher');
      else if (res.role === "PARENT") navigate('/dashboard/parent');
      else navigate('/dashboard/child');
    } catch (err) {
      toast.error("Login failed");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center space-y-2">
          <img src={logo} alt="RABA logo" className="w-24 object-contain object-center mx-auto"/>
          <CardTitle className="text-2xl">Welcome to RABA</CardTitle>
          <CardDescription>Manage your progress here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="signup">
              <Form {...formRegister}>
                <form onSubmit={formRegister.handleSubmit(handleSignup)} className="space-y-4">
                  <FormField
                    control={formRegister.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formRegister.control}
                    name="fullName"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formRegister.control}
                    name="password"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formRegister.control}
                    name="role"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <select {...field} className="w-full border rounded px-2 py-2 text-sm">
                            <option value="CHILD">Student</option>
                            <option value="PARENT">Parent</option>
                            <option value="TEACHER">Teacher</option>
                          </select>
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Sign Up"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;