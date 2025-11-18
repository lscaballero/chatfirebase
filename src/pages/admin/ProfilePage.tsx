import FormProfile from "@/components/profile/FormProfile";
import { useUser } from "reactfire";

const ProfilePage = () => {
  const { data: user } = useUser();
  if (!user) {
    return <div>loading</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-medium">Profile</h1>
      <FormProfile user={user} />
    </div>
  );
};

export default ProfilePage;
