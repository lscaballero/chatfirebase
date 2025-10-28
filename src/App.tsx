import { Route, Routes } from 'react-router'
import RouteLayout from './layouts/RouteLayout'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import HomePage from './pages/public/HomePage'
import DashboardPage from './pages/admin/DashboardPage'
import ProfilePage from './pages/admin/ProfilePage'
import ChatPage from './pages/admin/ChatPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import NotFound from './pages/public/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<RouteLayout /> } >
        {/* public  */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path='*' element={<NotFound />} />
        </Route>

        {/* private */}
        <Route path='admin' element={<AdminLayout />}>
           <Route index element={<DashboardPage />} />
           <Route path='profile' element={<ProfilePage />} />
           <Route path='chat' element={<ChatPage />} />
        </Route>

        {/* admin */}
        <Route path='auth' element={<AuthLayout />}>
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
        
      </Route>
    </Routes>
  )
}

export default App
