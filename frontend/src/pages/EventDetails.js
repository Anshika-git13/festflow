import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import eventService from '../services/eventService';
import { formatDate } from '../utils/formatDate';
import '../styles/EventDetails.css';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await eventService.getEvent(id);
      setEvent(data.data);
    } catch (err) {
      setError('Failed to load event details.');
      console.error('Fetch event error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isRegistered = () => {
    if (!user || !event) return false;
    return event.registrations.some((reg) => reg.user._id === user.id);
  };

  const isOrganizer = () => {
    if (!user || !event) return false;
    return event.organizer._id === user.id;
  };

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setActionLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await eventService.registerForEvent(id);
      setMessage({ type: 'success', text: 'Successfully registered for the event!' });
      fetchEvent();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Registration failed.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnregister = async () => {
    setActionLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await eventService.unregisterFromEvent(id);
      setMessage({ type: 'success', text: 'Successfully unregistered from the event.' });
      fetchEvent();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Unregistration failed.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        navigate('/events');
      } catch (err) {
        setMessage({
          type: 'error',
          text: err.response?.data?.message || 'Failed to delete event.',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="alert alert-error">{error || 'Event not found'}</div>
        <Link to="/events" className="btn btn-primary">
          Back to Events
        </Link>
      </div>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      Technical: '#3b82f6',
      Cultural: '#ec4899',
      Sports: '#10b981',
      Workshop: '#f59e0b',
      Seminar: '#8b5cf6',
      Competition: '#ef4444',
      Other: '#6b7280',
    };
    return colors[category] || colors.Other;
  };

  const categoryColor = getCategoryColor(event.category);
  const spotsLeft = event.maxParticipants - event.registrations.length;

  return (
    <div className="event-details-page">
      <div className="event-details-header">
        <div className="container">
          <Link to="/events" className="back-link">
            ← Back to Events
          </Link>

          <div className="event-header-content">
            <div className="event-header-left">
              <span
                className="event-category-badge"
                style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
              >
                {event.category}
              </span>
              <h1 className="event-details-title">{event.title}</h1>
              <p className="event-organizer">
                Organized by <strong>{event.organizer.name}</strong>
              </p>
            </div>

            {isOrganizer() && (
              <div className="event-actions">
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete Event
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container event-details-container">
        <div className="event-details-content">
          <div className="event-main">
            <div className="event-section">
              <h2 className="section-heading">About This Event</h2>
              <p className="event-full-description">{event.description}</p>
            </div>

            <div className="event-section">
              <h2 className="section-heading">Event Details</h2>
              <div className="event-info-grid">
                <div className="info-item">
                  <span className="info-icon">📅</span>
                  <div className="info-content">
                    <span className="info-label">Date</span>
                    <span className="info-value">{formatDate(event.date)}</span>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">🕐</span>
                  <div className="info-content">
                    <span className="info-label">Time</span>
                    <span className="info-value">{event.time}</span>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div className="info-content">
                    <span className="info-label">Venue</span>
                    <span className="info-value">{event.venue}</span>
                  </div>
                </div>

                <div className="info-item">
                  <span className="info-icon">👥</span>
                  <div className="info-content">
                    <span className="info-label">Capacity</span>
                    <span className="info-value">
                      {event.registrations.length} / {event.maxParticipants}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {event.registrations.length > 0 && (
              <div className="event-section">
                <h2 className="section-heading">
                  Participants ({event.registrations.length})
                </h2>
                <div className="participants-list">
                  {event.registrations.slice(0, 10).map((reg, index) => (
                    <div key={index} className="participant-item">
                      <div className="participant-avatar">
                        {reg.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="participant-info">
                        <span className="participant-name">{reg.user.name}</span>
                        <span className="participant-email">{reg.user.email}</span>
                      </div>
                    </div>
                  ))}
                  {event.registrations.length > 10 && (
                    <p className="more-participants">
                      +{event.registrations.length - 10} more participants
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="event-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-stats">
                <div className="sidebar-stat">
                  <span className="stat-value">{event.registrations.length}</span>
                  <span className="stat-label">Registered</span>
                </div>
                <div className="sidebar-stat">
                  <span className="stat-value">{spotsLeft}</span>
                  <span className="stat-label">Spots Left</span>
                </div>
              </div>

              {message.text && (
                <div className={`alert alert-${message.type}`}>{message.text}</div>
              )}

              {!isOrganizer() && (
                <div className="sidebar-actions">
                  {isRegistered() ? (
                    <button
                      onClick={handleUnregister}
                      className="btn btn-danger btn-block"
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Processing...' : 'Unregister'}
                    </button>
                  ) : spotsLeft > 0 ? (
                    <button
                      onClick={handleRegister}
                      className="btn btn-primary btn-block"
                      disabled={actionLoading}
                    >
                      {actionLoading
                        ? 'Processing...'
                        : isAuthenticated
                        ? 'Register Now'
                        : 'Login to Register'}
                    </button>
                  ) : (
                    <button className="btn btn-block" disabled>
                      Event Full
                    </button>
                  )}
                </div>
              )}

              {isOrganizer() && (
                <div className="organizer-badge">
                  <span className="badge badge-primary">You're the Organizer</span>
                </div>
              )}
            </div>

            <div className="sidebar-card">
              <h3 className="sidebar-title">Organizer Details</h3>
              <div className="organizer-info">
                <div className="organizer-avatar">
                  {event.organizer.name.charAt(0).toUpperCase()}
                </div>
                <div className="organizer-details">
                  <span className="organizer-name">{event.organizer.name}</span>
                  <span className="organizer-email">{event.organizer.email}</span>
                  {event.organizer.college && (
                    <span className="organizer-college">{event.organizer.college}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;