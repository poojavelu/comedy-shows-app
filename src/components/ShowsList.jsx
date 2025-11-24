import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ShowsList({ allShows, loading }) {
  const [filter, setFilter] = useState('upcoming')
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)

  const getFilteredShows = () => {
    const now = new Date()
    
    if (filter === 'upcoming') {
      return allShows.filter(show => new Date(show.date_time) >= now)
    } else if (filter === 'past') {
      return allShows.filter(show => new Date(show.date_time) < now)
    }
    return allShows
  }

  const filteredShows = getFilteredShows()
  const showCarousel = filteredShows.length > 6

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= filteredShows.length ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? filteredShows.length - 1 : prev - 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    setCurrentIndex(0)
  }, [filter])

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

  return (
    <div className="shows-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <img 
            src="/comedy-audience.png" 
            alt="Comedy Show" 
            className="hero-image"
          />
          <div className="hero-overlay">
            <h1 className="hero-title">LAUGH OUT LOUD</h1>
            <p className="hero-subtitle">Your Backstage Pass to Comedy Gold</p>
          </div>
        </div>
      </div>
      
      <div className="header-section">
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
      </div>

      {filteredShows.length === 0 ? (
        <div className="no-shows-container">
          <p className="no-shows">No {filter} shows found</p>
        </div>
      ) : showCarousel ? (
        <div className="carousel-container">
          <button className="carousel-button prev" onClick={prevSlide} aria-label="Previous show">
            ‹
          </button>
          
          <div className="carousel-wrapper" ref={carouselRef}>
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredShows.map((show) => (
                <div key={show.id} className="carousel-slide">
                  <div className="show-card">
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
                      <p className="description">{show.description}</p>
                    </div>
                    <div className="show-card-footer">
                      <Link to={`/show/${show.id}`} className="details-link">
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-button next" onClick={nextSlide} aria-label="Next show">
            ›
          </button>

          <div className="carousel-dots">
            {filteredShows.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="shows-grid">
          {filteredShows.map((show) => (
            <div key={show.id} className="show-card">
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
                <p className="description">{show.description}</p>
              </div>
              <div className="show-card-footer">
                <Link to={`/show/${show.id}`} className="details-link">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ShowsList
