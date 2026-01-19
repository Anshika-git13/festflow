import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
        </div>

        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Manage College Events
              <span className="gradient-text"> Effortlessly</span>
            </h1>
            <p className="hero-description">
              FestFlow is your all-in-one platform for creating, discovering, and
              participating in college fests and events. Join thousands of students
              making their campus life more vibrant.
            </p>
            <div className="hero-buttons">
              {isAuthenticated ? (
                <>
                  <Link to="/events" className="btn btn-primary btn-large">
                    Browse Events
                  </Link>
                  <Link to="/create-event" className="btn btn-secondary btn-large">
                    Create Event
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-large">
                    Get Started
                  </Link>
                  <Link to="/events" className="btn btn-secondary btn-large">
                    Explore Events
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card visual-card-1">
              <div className="card-icon">🎭</div>
              <h3>Cultural Fests</h3>
            </div>
            <div className="visual-card visual-card-2">
              <div className="card-icon">💻</div>
              <h3>Tech Events</h3>
            </div>
            <div className="visual-card visual-card-3">
              <div className="card-icon">🏆</div>
              <h3>Competitions</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose FestFlow?</h2>
          <p className="section-subtitle">
            Everything you need to organize and attend amazing events
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">Easy Event Creation</h3>
              <p className="feature-description">
                Create and manage events in minutes with our intuitive interface.
                Add details, set dates, and start accepting registrations instantly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Discover Events</h3>
              <p className="feature-description">
                Browse through a wide variety of events happening in your college.
                Filter by category, date, or search for specific interests.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3 className="feature-title">One-Click Registration</h3>
              <p className="feature-description">
                Register for events with a single click. Track all your registered
                events in one place and never miss an update.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Smart Management</h3>
              <p className="feature-description">
                Manage participant lists, track registrations, and keep your events
                organized with powerful management tools.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure & Reliable</h3>
              <p className="feature-description">
                Your data is safe with us. We use industry-standard security
                practices to protect your information.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Fully Responsive</h3>
              <p className="feature-description">
                Access FestFlow from any device. Our platform works seamlessly
                on desktop, tablet, and mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Join thousands of students already using FestFlow to make their campus
            life more exciting and organized.
          </p>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-primary btn-large">
              Create Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;