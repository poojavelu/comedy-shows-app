import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showsAPI } from "../api/shows";

const ShowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShow();
  }, [id]);

  const fetchShow = async () => {
    try {
      setLoading(true);
      const response = await showsAPI.getShow(id);
      setShow(response.data.data);
      setError(null);
    } catch (err) {
      setError("Failed to load show details.");
      console.error("Error fetching show:", err);
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

  if (loading) {
    return <div className="loading">Loading show details...</div>;
  }

  if (error || !show) {
    return (
      <div className="container">
        <div className="error">{error || "Show not found."}</div>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to Shows
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <a href="/" className="back-link">
        ← Back to all shows
      </a>
      <div className="show-detail">
        <h1>{show.title}</h1>

        <div className="show-info">
          <strong>📅 Date:</strong> {formatDate(show.date)}
        </div>

        <div className="show-info">
          <strong>📍 Location:</strong> {show.location}
        </div>

        <div className="show-description">
          <strong>About this show:</strong>
          <p>
            {show.description ||
              "Join us for an unforgettable night of comedy!"}
          </p>
        </div>

        <div className="actions">
          {show.ticket_link && (
            <a
              href={show.ticket_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Get Your Tickets
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowDetail;
