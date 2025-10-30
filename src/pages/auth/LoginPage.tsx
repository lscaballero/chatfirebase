import { Button } from "@/components/ui/button"
import { useAuthActions } from "../../hooks/useAuthActions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const LoginPage = () => {

  const { loginWithGoogle} = useAuthActions()
  
  const handleLoginWithGoogle = async () => {
    const response = await loginWithGoogle()
    if (!response.success) {
      console.error(response.error)
      return
    }
    console.log(response)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to your acoutn using email and password
        </CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      <CardFooter>
        <Button onClick={handleLoginWithGoogle} className="w-full">Login with Google</Button>
      </CardFooter>
    </Card>
  )
}

export default LoginPage
