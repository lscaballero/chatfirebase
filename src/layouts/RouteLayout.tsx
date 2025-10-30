import { Outlet } from "react-router"
import { Toaster } from "sonner"

const RouteLayout = () => {
  return (
    <div>
      <Outlet />
      <Toaster className="top-right" richColors/>
    </div>
  )
}

export default RouteLayout
