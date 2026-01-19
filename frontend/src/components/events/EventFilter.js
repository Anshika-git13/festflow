import React from 'react';

const EventFilter = ({ filters, setFilters }) => {
  const categories = [
    'All',
    'Technical',
    'Cultural',
    'Sports',
    'Workshop',
    'Seminar',
    'Competition',
    'Other',
  ];

  const statuses = ['All', 'upcoming', 'ongoing', 'completed'];

  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      category: category === 'All' ? '' : category,
    });
  };

  const handleStatusChange = (status) => {
    setFilters({
      ...filters,
      status: status === 'All' ? '' : status,
    });
  };

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value,
    });
  };

  return (
    <div className="event-filters">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search events..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Category</label>
        <div className="filter-buttons">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`filter-btn ${
                (category === 'All' && !filters.category) ||
                filters.category === category
                  ? 'active'
                  : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label className="filter-label">Status</label>
        <div className="filter-buttons">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`filter-btn ${
                (status === 'All' && !filters.status) ||
                filters.status === status
                  ? 'active'
                  : ''
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventFilter;