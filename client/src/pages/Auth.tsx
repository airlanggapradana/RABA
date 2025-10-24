import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Music} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import {loginSchema, type LoginSchema} from "@/utils/zod.ts";
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

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    console.log(data);
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
          <CardTitle className="text-2xl">Welcome to AudioHub</CardTitle>
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
                  <Button type="submit" className="w-full" disabled={form.formState.isLoading}>
                    {form.formState.isLoading ? "Loading..." : "Login"}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/*<TabsContent value="signup">*/}
            {/*  <form onSubmit={handleSignup} className="space-y-4">*/}
            {/*    <div className="space-y-2">*/}
            {/*      <Label htmlFor="signup-name">Full Name</Label>*/}
            {/*      <Input*/}
            {/*        id="signup-name"*/}
            {/*        type="text"*/}
            {/*        placeholder="John Doe"*/}
            {/*        value={fullName}*/}
            {/*        onChange={(e) => setFullName(e.target.value)}*/}
            {/*        required*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div className="space-y-2">*/}
            {/*      <Label htmlFor="signup-email">Email</Label>*/}
            {/*      <Input*/}
            {/*        id="signup-email"*/}
            {/*        type="email"*/}
            {/*        placeholder="you@example.com"*/}
            {/*        value={email}*/}
            {/*        onChange={(e) => setEmail(e.target.value)}*/}
            {/*        required*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div className="space-y-2">*/}
            {/*      <Label htmlFor="signup-password">Password</Label>*/}
            {/*      <Input*/}
            {/*        id="signup-password"*/}
            {/*        type="password"*/}
            {/*        placeholder="••••••••"*/}
            {/*        value={password}*/}
            {/*        onChange={(e) => setPassword(e.target.value)}*/}
            {/*        required*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <Button type="submit" className="w-full" disabled={loading}>*/}
            {/*      {loading ? "Loading..." : "Sign Up"}*/}
            {/*    </Button>*/}
            {/*  </form>*/}
            {/*</TabsContent>*/}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
