import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../config'

function AdminPanel({ allShows, onShowsChange }) {
  const navigate = useNavigate()
  const [view, setView] = useState('list') // 'list', 'create', 'edit'
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

      // Refetch shows after create/update
      await onShowsChange()

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
      
      // Refetch shows after delete
      await onShowsChange()
      
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
    <div className="shows-container">
      {view === 'list' && (
        <>
          <div className="header-section">
            <button onClick={handleCreateClick} className="create-button">
              + Create New Show
            </button>
          </div>

          {allShows.length === 0 ? (
            <div className="no-shows-container">
              <p className="no-shows">No shows available. Create your first show!</p>
            </div>
          ) : (
            <div className="shows-grid">
              {allShows.map((show) => (
                <div 
                  key={show.id} 
                  className="show-card"
                  onClick={() => handleShowClick(show)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="show-card-header">
                    <h2>{show.title}</h2>
                  </div>
                  <div className="show-card-body">
                    <div className="show-info">
                      <p className="date-time">
                        <span className="icon">📅</span>
                        {formatDateTime(show.date_time)}
                      </p>
                      <p className="location">
                        <span className="icon">📍</span>
                        {show.location}
                      </p>
                      {show.comedian && (
                        <p className="comedian">
                          <span className="icon">🎤</span>
                          {show.comedian}
                        </p>
                      )}
                    </div>
                    {show.description && (
                      <p className="description">{show.description}</p>
                    )}
                  </div>
                  <div className="show-card-footer">
                    <div className="details-link">
                      Edit Show →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
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
  )
}

export default AdminPanel
