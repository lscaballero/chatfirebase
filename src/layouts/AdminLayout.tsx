
import { Navigate, Outlet } from 'react-router'
import { useSigninCheck } from 'reactfire'

const AdminLayout = () => {

    const {status, data: signInCheckResult, hasEmitted} = useSigninCheck();

    if (status === "loading" || !hasEmitted) {
        return <div>loading</div>
    }

    if (!signInCheckResult.signedIn) {
        return <Navigate to="auth/login" replace />
    }
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AdminLayout
