import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import ShowsList from './components/ShowsList'
import ShowDetails from './components/ShowDetails'
import AdminPanel from './components/AdminPanel'
import { API_BASE_URL } from './config'
import './App.css'

function App() {
  const [allShows, setAllShows] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchShows = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/api/shows/`)
      setAllShows(response.data.results || response.data)
    } catch (err) {
      console.error('Failed to fetch shows:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchShows()
  }, [])

  return (
    <Router>
      <div className="App">
        {/* Static Navigation Bar */}
        <nav className="top-nav">
          <div className="nav-top">
            <Link to="/" className="nav-logo-link">
              <img 
                src="https://cuo-email-photos.s3.us-east-1.amazonaws.com/cuo-white-logo.png" 
                alt="Comedy UO" 
                className="nav-logo"
              />
            </Link>
          </div>
          <div className="nav-bottom">
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/manage-shows" className="nav-link">Manage Shows</Link>
            <a href="#" className="nav-link">Analytics</a>
            <a href="#" className="nav-link">Guest List</a>
            <a href="#" className="nav-link">Settings</a>
            <a href="#" className="nav-link">Help</a>
          </div>
        </nav>

        {/* Dynamic Content Area */}
        <Routes>
          <Route path="/" element={<ShowsList allShows={allShows} loading={loading} />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/manage-shows" element={<AdminPanel allShows={allShows} onShowsChange={fetchShows} />} />
        </Routes>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Comedy UO</h3>
              <p>Show Management System</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/" className="footer-link">Dashboard</Link>
              <Link to="/manage-shows" className="footer-link">Manage Shows</Link>
              <a href="#" className="footer-link">Analytics</a>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <a href="#" className="footer-link">Documentation</a>
              <a href="#" className="footer-link">Contact Support</a>
              <a href="#" className="footer-link">Report Issue</a>
            </div>
            <div className="footer-section">
              <h4>Account</h4>
              <a href="#" className="footer-link">Settings</a>
              <a href="#" className="footer-link">Guest List</a>
              <a href="#" className="footer-link">Logout</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Comedy UO. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
