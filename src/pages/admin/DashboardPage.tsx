import { useAuth, useUser } from "reactfire"

const DashboardPage = () => {

    const auth = useAuth();
    const {data: user} = useUser();
  return (
    <div>
      <h1>Dasboard page</h1>
      <p>Welcome, {user?.displayName || "Guest"}!</p>
      <p>Email: {user?.email || "Guest"}</p>
      <button onClick={() => auth.signOut()}> Sing Out</button>
    </div>
  )
}

export default DashboardPage
