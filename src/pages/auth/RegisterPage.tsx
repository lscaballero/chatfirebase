import CardFooterAuth from "@/components/CardFooterAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthActions } from "@/hooks/useAuthActions";
import {
  registerZodSchema,
  type registerZodSchemaType,
} from "@/lib/zod.schema";
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

const RegisterPage = () => {
  const { loading, login } = useAuthActions();

  const form = useForm<registerZodSchemaType>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: registerZodSchemaType) => {
    const response = await login(data);
    if (!response.success) {
      if (response.error?.code === "auth/email-already-in-use") {
        toast.error("Email already in use", {
          description: "Please use a different email",
        });
        form.setError("email", {
          type: "manual",
          message: "Invalid email or password",
        });
      }

      form.setError("password", {
        type: "manual",
        message: "Invalid email or password",
      });
      return;
    } else {
      toast.success("Login successful", {
        description: "Welcome back",
      });
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
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>displayName</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your displayName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>confirmPassword</FormLabel>
                  <FormControl>
                    <Input
                      type="confirmPassword"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Register in..." : "register"}
            </Button>
          </Form>
        </form>
      </CardContent>
      <CardFooterAuth type="register" loading={loading} />
    </Card>
  );
};

export default RegisterPage;
