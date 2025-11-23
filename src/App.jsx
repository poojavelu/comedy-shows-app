import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ShowsList from './components/ShowsList'
import ShowDetails from './components/ShowDetails'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>🎭 Comedy Shows</h1>
        </header>
        <Routes>
          <Route path="/" element={<ShowsList />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
