import CardFooterAuth from "@/components/CardFooterAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "@/hooks/useAuthActions";
import { loginZodSchema, type loginZodSchemaType } from "@/lib/zod.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LoginPage = () => {
  const { loading, login } = useAuthActions();

  const form = useForm<loginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginZodSchemaType) => {
    const response = await login(data);
    if (!response.success) {
      if (response.error?.code === "auth/invalid-login-credentials") {
        // form.setError("email", {
        //   type: "manual",
        //   message: "Invalid email or password",
        // });

        // form.setError("password", {
        //   type: "manual",
        //   message: "Invalid email or password",
        // });

        toast.error("Invalid email or password", {
          description: "Please check your credentials",
        });
      }
      return;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your acoutn using email and password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Form {...form}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
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
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loggin in..." : "login"}
            </Button>
          </Form>
        </form>
      </CardContent>
      <CardFooterAuth type="login" loading={loading} />
    </Card>
  );
};

export default LoginPage;
