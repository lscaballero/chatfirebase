import { useProfileActions } from "@/hooks/useProfileActions";
import { profileZodSchema, type profileZodSchemaType } from "@/lib/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { User } from "firebase/auth";
import { toast } from "sonner";

interface Props {
  user: User;
}

const FormProfile = ({ user }: Props) => {
  const { loading, updateUserProfile } = useProfileActions();

  const form = useForm<profileZodSchemaType>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  async function onSubmit(values: profileZodSchemaType) {
    const result = await updateUserProfile(values);
    if (result.success) {
      return toast.success("Profile updated successfully");
    }
    toast.error("Error updating profile");
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Form {...form}>
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>DisplayName</FormLabel>
              <FormControl>
                <Input
                  type="displayName"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photoURL"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phpto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating profile" : "update"}
        </Button>
      </Form>
    </form>
  );
};

export default FormProfile;
