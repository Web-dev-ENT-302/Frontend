import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* components */
import ToastNotification from './components/toast-notification/ToastNotifcation'

/* pages */
import Register from './pages/auths/register/Register'

/* styles */
import './App.css'
import Login from './pages/auths/login/Login'
import MainLayout from './components/MainLayout'
import StudentDashboard from './pages/dashboard/students/StudentDashboard'
import DashboardLayout from './pages/dashboard/components/layout/DashboardLayout'
import ConfirmRide from './pages/dashboard/students/ConfirmRide'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastNotification /> {/* Reuseable component that displays a toast notification when called i.e: Notification('success', 'Something was successful'); */}

        <Routes>
          {/* Public Routes using MainLayout */}
          <Route path='/' element={<MainLayout><Register /></MainLayout>} />
          <Route path='/login' element={<MainLayout><Login /></MainLayout>} />
          <Route path='/register' element={<MainLayout><Register /></MainLayout>} />

          {/* Protected Dashboard Routes using DashboardLayout */}
          <Route path='/student-dashboard' element={<DashboardLayout><StudentDashboard /></DashboardLayout>} />
          <Route path='/confirm-ride' element={<ConfirmRide />} />

          {/* Handle Invalid Routes */}
          <Route path='*' element={<MainLayout><Register /></MainLayout>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
