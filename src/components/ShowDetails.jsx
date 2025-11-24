import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../config'

function ShowDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailMessage, setEmailMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    fetchShow()
  }, [id])

  const fetchShow = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/api/shows/${id}/`)
      setShow(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch show details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  const handleSendInvite = async () => {
    setEmailLoading(true)
    setEmailMessage({ type: '', text: '' })

    try {
      await axios.post(`${API_BASE_URL}/.netlify/functions/send-email`, {
        to_email: 'admin@comedyuo.com',
        show_data: {
          title: show.title,
          date_time: show.date_time,
          location: show.location,
          description: show.description,
          ticket_url: show.ticket_url || '#'
        },
        guest_data: {
          first_name: 'Guest'
        }
      })

      setEmailMessage({ 
        type: 'success', 
        text: 'Invitation sent successfully to guests!' 
      })
      
      setTimeout(() => {
        setEmailMessage({ type: '', text: '' })
      }, 5000)
    } catch (error) {
      setEmailMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to send invitation' 
      })
    } finally {
      setEmailLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading show details...</div>
  if (error) return <div className="error">{error}</div>
  if (!show) return <div className="error">Show not found</div>

  return (
    <div className="show-details">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Shows
      </button>
      
      <div className="details-card">
        <div className="featured-image">
          <img 
            src="/comedy-audience.png" 
            alt="Comedy Show" 
            className="show-image"
          />
        </div>
        
        <h1>{show.title}</h1>
        
        <div className="details-info">
          <div className="info-item">
            <span className="label">📅 Date & Time:</span>
            <span className="value">{formatDateTime(show.date_time)}</span>
          </div>
          
          <div className="info-item">
            <span className="label">📍 Location:</span>
            <span className="value">{show.location}</span>
          </div>
          
          {show.comedian && (
            <div className="info-item">
              <span className="label">🎤 Comedian:</span>
              <span className="value">{show.comedian}</span>
            </div>
          )}
          
          {show.ticket_price && (
            <div className="info-item">
              <span className="label">💵 Price:</span>
              <span className="value">${show.ticket_price}</span>
            </div>
          )}
        </div>
        
        <div className="description-section">
          <h3>About This Show</h3>
          <p>{show.description}</p>
        </div>
        
        {emailMessage.text && (
          <div className={`message ${emailMessage.type}`}>
            {emailMessage.text}
          </div>
        )}
        
        <button 
          onClick={handleSendInvite}
          className="invite-button"
          disabled={emailLoading}
        >
          {emailLoading ? '✉️ Sending Invitation...' : '✉️ Send Invitation'}
        </button>
      </div>
    </div>
  )
}

export default ShowDetails
