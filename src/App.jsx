import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* components */
import ToastNotification from './components/toast-notification/ToastNotifcation'

/* pages */
import Register from './pages/auths/register/Register'

/* styles */
import './App.css'
import Login from './pages/auths/login/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastNotification /> {/* Reuseable component that displays a toast notification when called i.e: Notification('success', 'Something was successful'); */}

        <Routes>
          {/* Routes */}
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Handle Invalid Routes */}
          <Route path='*' element={""} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
