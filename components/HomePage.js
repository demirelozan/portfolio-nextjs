'use client'

import { useState } from 'react'

export default function HomePage({ projects, gallery, settings }) {
  const [filter, setFilter] = useState('all')
  
  return (
    <div>
      <nav>
        <div className="nav-container">
          <a href="/" className="logo">OZAN DEMIREL</a>
          <ul className="nav-links">
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="profile-image">
            <img src={settings.profileImage} alt={settings.title} />
          </div>
          <div className="hero-text">
            <h1>{settings.title}</h1>
            <p className="subtitle">Film & Media Composer</p>
            <p>{settings.bio}</p>
          </div>
        </div>
      </section>

      <section className="portfolio" id="portfolio">
        <h2 className="section-title">Portfolio</h2>
        
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All Works
          </button>
          <button 
            className={filter === 'film' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('film')}
          >
            Film
          </button>
          <button 
            className={filter === 'game' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('game')}
          >
            Game
          </button>
          <button 
            className={filter === 'commercial' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('commercial')}
          >
            Commercial
          </button>
          <button 
            className={filter === 'short' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('short')}
          >
            Short Film
          </button>
        </div>

        <div className="project-grid">
          {projects
            .filter(p => filter === 'all' || p.category === filter)
            .map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image-wrapper">
                  <img 
                    src={project.image || 'https://via.placeholder.com/400x260/1a1a1a/f59e0b?text=' + project.title} 
                    alt={project.title} 
                    className="project-image"
                  />
                </div>
                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  {project.awards && project.awards.length > 0 && (
                    <div className="project-awards">
                      {project.awards.map((award, i) => (
                        <span key={i} className="award-badge">🏆 {award}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2024 {settings.title}. All rights reserved.</p>
      </footer>

      <a href="/admin" className="admin-btn">Admin Panel</a>
    </div>
  )
}