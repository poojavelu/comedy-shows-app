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

  if (loading) return <div className="loading">Loading show details...</div>
  if (error) return <div className="error">{error}</div>
  if (!show) return <div className="error">Show not found</div>

  return (
    <div className="show-details">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Shows
      </button>
      
      <div className="details-card">
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
        
        {show.ticket_url && (
          <a 
            href={show.ticket_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ticket-button"
          >
            Get Tickets
          </a>
        )}
      </div>
    </div>
  )
}

export default ShowDetails
