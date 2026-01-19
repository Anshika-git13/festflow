import React, { useState, useEffect } from 'react';
import EventCard from '../components/events/EventCard';
import EventFilter from '../components/events/EventFilter';
import eventService from '../services/eventService';
import '../styles/Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    search: '',
  });

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await eventService.getAllEvents(filters);
      setEvents(data.data);
    } catch (err) {
      setError('Failed to load events. Please try again.');
      console.error('Fetch events error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <div className="container">
          <h1 className="events-title">Discover Events</h1>
          <p className="events-subtitle">
            Find and register for amazing events happening around you
          </p>
        </div>
      </div>

      <div className="container">
        <EventFilter filters={filters} setFilters={setFilters} />

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : events.length === 0 ? (
          <div className="no-events">
            <div className="no-events-icon">🔍</div>
            <h2>No Events Found</h2>
            <p>Try adjusting your filters or check back later for new events.</p>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;