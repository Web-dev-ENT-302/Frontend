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

/* styles */
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastNotification /> {/* Reuseable component that displays a toast notification when called i.e: Notification('success', 'Something was successful'); */}

        <AuthProvider>
          <Routes>
            {/* Public Routes using MainLayout */}
            <Route path='/' element={<MainLayout><Register /></MainLayout>} />
            <Route path='/login' element={<MainLayout><Login /></MainLayout>} />
            <Route path='/register' element={<MainLayout><Register /></MainLayout>} />

            {/* Protected Dashboard Route*/}
            <Route path='/student-dashboard' element={
              <ProtectedRoute>
                <DashboardLayout>
                  <StudentDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* confirm ride page */}
            <Route path='/confirm-ride'
              element={
                <ProtectedRoute>
                  <ConfirmRide />
                </ProtectedRoute>} />

            {/* Handle Invalid Routes */}
            <Route path='*' element={<MainLayout><Register /></MainLayout>} />
            
          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}

export default App
