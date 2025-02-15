import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Home from './pages/home.jsx'
import Genres from './pages/genres.jsx'
import Navbar from './components/navbar.jsx'

function AppContent() {
  const location = useLocation()
  const showNavbarPaths = ['/home', '/genres']
  const shouldShowNavbar = showNavbarPaths.includes(location.pathname)

  return (
    <div className="min-h-screen bg-[#1e201e]">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/genres" element={<Genres />} />
      </Routes>
    </div>
  )
}

// Main App component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App