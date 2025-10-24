import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Music} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, type LoginSchema, signupSchema, type SignupSchema} from "@/utils/zod.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";

const Auth = () => {
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
    },
    resolver: zodResolver(signupSchema),
  })

  const handleSignup: SubmitHandler<SignupSchema> = async (data) => {
    await new Promise(resolve => {
      setTimeout(() => {
        console.log(data);
        resolve(true);
      }, 1000);
    })
  }

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    await new Promise(resolve => {
      setTimeout(() => {
        console.log(data);
        resolve(true);
      }, 1000);
    })
  }
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center space-y-2">
          <div
            className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-2">
            <Music className="h-6 w-6 text-primary-foreground"/>
          </div>
          <CardTitle className="text-2xl">Welcome to RABA</CardTitle>
          <CardDescription>Manage your audio and image collections</CardDescription>
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
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Loading..." : "Login"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="signup">
              <Form {...formRegister}>
                <form onSubmit={formRegister.handleSubmit(handleSignup)} className="space-y-4">
                  <FormField
                    control={formRegister.control}
                    name="fullName"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            id="signup-name"
                            type="text"
                            placeholder="John Doe"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formRegister.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            id="signup-email"
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
                    control={formRegister.control}
                    name="password"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            id="signup-password"
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={formRegister.formState.isSubmitting}>
                    {formRegister.formState.isSubmitting ? "Loading..." : "Sign Up"}
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
