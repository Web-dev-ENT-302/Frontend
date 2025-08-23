import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'

/* components */
import ToastNotification from './components/toast-notification/ToastNotifcation'

/* pages */
import Register from './pages/auths/register/Register'
import Login from './pages/auths/login/Login'
import MainLayout from './components/MainLayout'
import StudentDashboard from './pages/dashboard/students/StudentDashboard'
import DashboardLayout from './pages/dashboard/components/layout/DashboardLayout'
import ConfirmRide from './pages/dashboard/students/ConfirmRide'

/* hooks */
import ScrollToTop from './hooks/useScrollToTop'

/* styles */
import './App.css'
import DriverDashboard from './pages/dashboard/driver/DriverDashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop /> {/* scroll to top hook */}
        <ToastNotification /> {/* Reuseable component that displays a toast notification when called i.e: Notification('success', 'Something was successful'); */}

        <AuthProvider>
          <Routes>
            {/* Public Routes using MainLayout */}
            <Route path='/' element={<MainLayout><Login /></MainLayout>} />
            <Route path='/login' element={<MainLayout><Login /></MainLayout>} />
            <Route path='/register' element={<MainLayout><Register /></MainLayout>} />

            {/* Protected  Route(STUDENT)*/}
            <Route path='/student' element={
              <ProtectedRoute>
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* confirm ride page */}
            <Route path='/student/confirm-ride'
              element={
                <ProtectedRoute>
                  <ConfirmRide />
                </ProtectedRoute>} />


            {/* Protected  Route(DRIVER)*/}
            <Route path='/driver' element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DriverDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            {/* Handle Invalid Routes */}
            <Route path='*' element={<MainLayout><Register /></MainLayout>} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}

export default App
