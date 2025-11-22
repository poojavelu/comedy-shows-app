import React, { useState, useEffect } from "react";
import { showsAPI } from "../api/shows";
import { useNavigate } from "react-router-dom";

const ShowsList = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchShows();
  }, [filter]);

  const fetchShows = async () => {
    try {
      setLoading(true);
      const filterParam = filter === "all" ? null : filter;
      const response = await showsAPI.getAllShows(filterParam);
      setShows(response.data.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load shows. Please try again later.");
      console.error("Error fetching shows:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShowClick = (showId) => {
    navigate(`/show/${showId}`);
  };

  if (loading) {
    return <div className="loading">Loading shows...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All Shows
        </button>
        <button
          className={`filter-btn ${filter === "upcoming" ? "active" : ""}`}
          onClick={() => setFilter("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`filter-btn ${filter === "past" ? "active" : ""}`}
          onClick={() => setFilter("past")}
        >
          Past Shows
        </button>
      </div>

      {shows.length === 0 ? (
        <div className="no-shows">No shows found.</div>
      ) : (
        <div className="shows-grid">
          {shows.map((show) => (
            <div
              key={show.id}
              className="show-card"
              onClick={() => handleShowClick(show.id)}
            >
              <h2>{show.title}</h2>
              <div className="show-info">
                <strong>📅 Date:</strong> {formatDate(show.date)}
              </div>
              <div className="show-info">
                <strong>📍 Location:</strong> {show.location}
              </div>
              <p className="show-description">
                {show.description || "Join us for an amazing comedy night!"}
              </p>
              {show.ticket_link && (
                <a
                  href={show.ticket_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  Get Tickets
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowsList;
