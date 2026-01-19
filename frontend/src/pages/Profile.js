import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import { formatDate } from '../utils/formatDate';
import '../styles/Profile.css';

const Profile = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const data = await authService.getCurrentUser();
      setUser(data.data);
    } catch (err) {
      console.error('Fetch profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <div className="alert alert-error">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="container">
          <div className="profile-header-content">
            <div className="profile-avatar-large">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="profile-header-info">
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-email">{user.email}</p>
              {user.college && <p className="profile-college">{user.college}</p>}
              {user.phone && <p className="profile-phone">📞 {user.phone}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="container profile-container">
        <div className="profile-section">
          <h2 className="section-title">Registered Events ({user.registeredEvents?.length || 0})</h2>

          {!user.registeredEvents || user.registeredEvents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No Registered Events</h3>
              <p>You haven't registered for any events yet.</p>
              <Link to="/events" className="btn btn-primary">
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="registered-events-grid">
              {user.registeredEvents.map((event) => (
                <div key={event._id} className="registered-event-card">
                  <div className="event-card-header">
                    <span className="event-category-small">{event.category}</span>
                  </div>
                  <h3 className="event-card-title">{event.title}</h3>
                  <div className="event-card-meta">
                    <span>📅 {formatDate(event.date)}</span>
                    <span>📍 {event.venue}</span>
                  </div>
                  <Link to={`/events/${event._id}`} className="btn btn-primary btn-sm">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;