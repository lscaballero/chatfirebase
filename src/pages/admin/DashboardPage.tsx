import { Button } from "@/components/ui/button";
import { useAuthActions } from "@/hooks/useAuthActions";
import { useUser } from "reactfire"

const DashboardPage = () => {

  const {data: user} = useUser();
  const { logout } = useAuthActions();
  return (
    <div className="container mx-auto p-4">
      <h1>Dasboard page</h1>
      <p>Welcome, {user?.displayName || "Guest"}!</p>
      <p>Email: {user?.email || "Guest"}</p>
      <Button variant={"destructive"} onClick={logout}> Sing Out</Button>
    </div>
  )
}

export default DashboardPage
