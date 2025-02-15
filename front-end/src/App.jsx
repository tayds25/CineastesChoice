import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login.jsx'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#1e201e]">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App