import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useSigninCheck, useUser } from "reactfire";

const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  if (status === "loading" || !hasEmitted) {
    return <div>loading</div>;
  }

  if (!signInCheckResult.signedIn) {
    return <Navigate to="auth/login" replace />;
  }
  return (
    <Suspense fallback={<div>loading user..</div>}>
      <AuthenticatedLayout />
    </Suspense>
  );
};

export default AdminLayout;

const AuthenticatedLayout = () => {
  useUser({ suspense: true });
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};
