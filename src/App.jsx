import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ToastNotification from './components/toast-notification/ToastNotifcation'

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastNotification /> {/* Reuseable component that displays a toast notification when called i.e: Notification('success', 'Something was successful'); */}

        <Routes>
          {/* Routes */}
          <Route path='/' element={""} />

          {/* Handle Invalid Routes */}
          <Route path='*' element={""} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
