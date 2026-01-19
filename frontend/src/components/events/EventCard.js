import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import '../../styles/EventCard.css';

const EventCard = ({ event }) => {
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

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { text: 'Upcoming', class: 'badge-primary' },
      ongoing: { text: 'Live Now', class: 'badge-success' },
      completed: { text: 'Completed', class: 'badge-tertiary' },
      cancelled: { text: 'Cancelled', class: 'badge-error' },
    };
    return badges[status] || badges.upcoming;
  };

  const statusBadge = getStatusBadge(event.status);
  const categoryColor = getCategoryColor(event.category);

  return (
    <div className="event-card">
      <div className="event-card-header">
        <span
          className="event-category"
          style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
        >
          {event.category}
        </span>
        <span className={`badge ${statusBadge.class}`}>{statusBadge.text}</span>
      </div>

      <div className="event-card-body">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">
          {event.description.length > 100
            ? `${event.description.substring(0, 100)}...`
            : event.description}
        </p>

        <div className="event-meta">
          <div className="event-meta-item">
            <span className="meta-icon">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="event-meta-item">
            <span className="meta-icon">🕐</span>
            <span>{event.time}</span>
          </div>
          <div className="event-meta-item">
            <span className="meta-icon">📍</span>
            <span>{event.venue}</span>
          </div>
        </div>

        <div className="event-stats">
          <div className="stat">
            <span className="stat-value">{event.registrations?.length || 0}</span>
            <span className="stat-label">Registered</span>
          </div>
          <div className="stat">
            <span className="stat-value">{event.maxParticipants}</span>
            <span className="stat-label">Max Capacity</span>
          </div>
        </div>
      </div>

      <div className="event-card-footer">
        <Link to={`/events/${event._id}`} className="btn btn-primary btn-block">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;