import { CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useAuthActions } from "@/hooks/useAuthActions";
import { Mail } from "lucide-react";
import { Link } from "react-router";

interface Props {
  type: "login" | "register";
  loading: boolean;
}

const CardFooterAuth = ({ type, loading }: Props) => {
  const { loginWithGoogle } = useAuthActions();

  const isLogin = type === "login";

  const handleLoginWithGoogle = async () => {
    const response = await loginWithGoogle();
    if (!response.success) {
      console.error(response.error);
      return;
    }
    console.log(response);
  };
  return (
    <CardFooter className="flex flex-col items-center gap-4">
      <Button
        onClick={handleLoginWithGoogle}
        className="w-full"
        disabled={loading}
      >
        <Mail className="mr-2" />
        {isLogin ? "login with google" : "Register with google"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Link to={isLogin ? "Register" : "Sing in"}></Link>
      </p>
    </CardFooter>
  );
};

export default CardFooterAuth;
