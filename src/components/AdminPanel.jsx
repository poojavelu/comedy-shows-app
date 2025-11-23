import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../config'

function AdminPanel() {
  const navigate = useNavigate()
  const [view, setView] = useState('list') // 'list', 'create', 'edit'
  const [shows, setShows] = useState([])
  const [selectedShow, setSelectedShow] = useState(null)
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

  useEffect(() => {
    if (view === 'list') {
      fetchShows()
    }
  }, [view])

  const fetchShows = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/shows/`)
      setShows(response.data.results || [])
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch shows' })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      date_time: '',
      location: '',
      description: '',
      comedian: '',
      ticket_price: '',
      ticket_url: ''
    })
    setSelectedShow(null)
    setMessage({ type: '', text: '' })
  }

  const handleCreateClick = () => {
    resetForm()
    setView('create')
  }

  const handleShowClick = (show) => {
    setSelectedShow(show)
    setFormData({
      title: show.title || '',
      date_time: show.date_time?.slice(0, 16) || '',
      location: show.location || '',
      description: show.description || '',
      comedian: show.comedian || '',
      ticket_price: show.ticket_price || '',
      ticket_url: show.ticket_url || ''
    })
    setView('edit')
  }

  const handleBackToList = () => {
    resetForm()
    setView('list')
    fetchShows()
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

      if (view === 'create') {
        await axios.post(`${API_BASE_URL}/api/shows/`, dataToSend)
        setMessage({ type: 'success', text: 'Show created successfully!' })
      } else if (view === 'edit') {
        await axios.put(`${API_BASE_URL}/api/shows/${selectedShow.id}/`, dataToSend)
        setMessage({ type: 'success', text: 'Show updated successfully!' })
      }

      setTimeout(() => {
        handleBackToList()
      }, 1500)
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || `Failed to ${view === 'create' ? 'create' : 'update'} show` 
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this show?')) {
      return
    }

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      await axios.delete(`${API_BASE_URL}/api/shows/${selectedShow.id}/`)
      setMessage({ type: 'success', text: 'Show deleted successfully!' })
      
      setTimeout(() => {
        handleBackToList()
      }, 1500)
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to delete show' 
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return ''
    const date = new Date(dateTimeStr)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  return (
    <div className="admin-panel">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Shows
      </button>

      <div className="admin-card">
        <h1>Admin Panel</h1>

        {view === 'list' && (
          <div className="admin-list-view">
            <div className="admin-header">
              <h2>Manage Shows</h2>
              <button onClick={handleCreateClick} className="create-button">
                + Create New Show
              </button>
            </div>

            {shows.length === 0 ? (
              <p className="no-shows">No shows available. Create your first show!</p>
            ) : (
              <div className="shows-grid">
                {shows.map((show) => (
                  <div 
                    key={show.id} 
                    className="admin-show-card"
                    onClick={() => handleShowClick(show)}
                  >
                    <h3>{show.title}</h3>
                    <p className="show-date">{formatDateTime(show.date_time)}</p>
                    <p className="show-location">📍 {show.location}</p>
                    {show.comedian && <p className="show-comedian">🎤 {show.comedian}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(view === 'create' || view === 'edit') && (
          <div className="admin-form-view">
            <div className="form-header">
              <button onClick={handleBackToList} className="back-link">
                ← Back to List
              </button>
              <h2>{view === 'create' ? 'Create New Show' : 'Edit Show'}</h2>
            </div>

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

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? (view === 'create' ? 'Creating...' : 'Updating...') : (view === 'create' ? 'Create Show' : 'Update Show')}
                </button>
                
                {view === 'edit' && (
                  <button 
                    type="button"
                    onClick={handleDelete}
                    className="delete-button"
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Delete Show'}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
