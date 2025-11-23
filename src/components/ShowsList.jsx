import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../config'

function ShowsList() {
  const [shows, setShows] = useState([])
  const [filter, setFilter] = useState('upcoming')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchShows()
  }, [filter])

  const fetchShows = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/api/shows/?filter=${filter}`)
      // Django REST Framework returns paginated data with 'results' array
      setShows(response.data.results || response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch shows')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  }

  if (loading) return <div className="loading">Loading shows...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="shows-container">
      <div className="filter-buttons">
        <button
          className={filter === 'upcoming' ? 'active' : ''}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming Shows
        </button>
        <button
          className={filter === 'past' ? 'active' : ''}
          onClick={() => setFilter('past')}
        >
          Past Shows
        </button>
      </div>

      <div className="shows-grid">
        {shows.length === 0 ? (
          <p className="no-shows">No {filter} shows found</p>
        ) : (
          shows.map((show) => (
            <div key={show.id} className="show-card">
              <h2>{show.title}</h2>
              <div className="show-info">
                <p className="date-time">📅 {formatDateTime(show.date_time)}</p>
                <p className="location">📍 {show.location}</p>
              </div>
              <p className="description">{show.description}</p>
              <Link to={`/show/${show.id}`} className="details-link">
                View Details →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ShowsList
