import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../config'

function AdminPanel() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    date_time: '',
    location: '',
    description: '',
    comedian: '',
    ticket_price: '',
    ticket_url: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const dataToSend = {
        ...formData,
        ticket_price: formData.ticket_price ? parseFloat(formData.ticket_price) : null
      }

      const response = await axios.post(`${API_BASE_URL}/api/shows/`, dataToSend)
      
      setMessage({ type: 'success', text: 'Show created successfully!' })
      
      // Reset form
      setFormData({
        title: '',
        date_time: '',
        location: '',
        description: '',
        comedian: '',
        ticket_price: '',
        ticket_url: ''
      })

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to create show' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-panel">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Shows
      </button>

      <div className="admin-card">
        <h1>Add New Comedy Show</h1>
        
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter show title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date_time">Date & Time *</label>
            <input
              type="datetime-local"
              id="date_time"
              name="date_time"
              value={formData.date_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter venue location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter show description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comedian">Comedian</label>
            <input
              type="text"
              id="comedian"
              name="comedian"
              value={formData.comedian}
              onChange={handleChange}
              placeholder="Enter comedian name (optional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ticket_price">Ticket Price</label>
            <input
              type="number"
              id="ticket_price"
              name="ticket_price"
              value={formData.ticket_price}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="Enter ticket price (optional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ticket_url">Ticket URL</label>
            <input
              type="url"
              id="ticket_url"
              name="ticket_url"
              value={formData.ticket_url}
              onChange={handleChange}
              placeholder="Enter ticket purchase URL (optional)"
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Show'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminPanel
