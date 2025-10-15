'use client'

import { useEffect, useState } from 'react'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'

export default function HomePage({ projects, gallery, settings }) {
  const [filter, setFilter] = useState('all')
  
  // Sort projects to put featured ones first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return 0
  })
  
  const filteredProjects = sortedProjects.filter(p => 
    filter === 'all' || p.category === filter
  )

 useEffect(() => {
    const sections = ['portfolio', 'about', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean)
    const links = Array.from(document.querySelectorAll('.nav-links a'))

    const onScroll = () => {
      const y = window.scrollY + 100 // offset for fixed nav
      let current = 'portfolio'
      sections.forEach(sec => {
        if (sec.offsetTop <= y) current = sec.id
      })
      links.forEach(a => {
        const href = a.getAttribute('href')
        a.classList.toggle('active', href === `#${current}`)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Handle card click to redirect to external URL
  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  
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

      {/* ...hero... */}

      <section className="hero">
        <div className="hero-content">
          <div className="profile-image">
            <img src={settings.profileImage} alt={settings.title} />
          </div>
          <div className="hero-text">
            <h1>{settings.title}</h1>
            <p className="subtitle">Film & Media Composer</p>
            <p>Creating emotional soundscapes that bring stories to life through music. Specializing in orchestral and electronic fusion for films, games, and commercials.</p>
            <ul>
              <li>Film, TV & Game Composer</li>
              <li>Orchestral Scoring</li>
              <li>Sound Design</li>
            </ul>
            <div className="social-links">
              <a href={settings.soundcloud} target="_blank" rel="noopener noreferrer">SoundCloud</a>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={`mailto:${settings.email}`}>Email</a>
            </div>
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
        </div>

        <div className="project-grid">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className={`project-card ${project.featured ? 'featured' : ''}`}
              onClick={() => handleCardClick(project.link)}
              style={{ cursor: 'pointer' }}
            >
              <div className="project-image-wrapper">
                <img 
                  src={project.image || 'https://via.placeholder.com/400x260/1a1a1a/f59e0b?text=' + project.title} 
                  alt={project.title} 
                  className="project-image"
                />
                {project.featured && (
                  <div className="featured-badge">Featured</div>
                )}
              </div>
              <div className="project-info">
                <div className="project-meta">
                  <span className="project-category">{project.category}</span>
                  <span className="project-year">{project.year}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.awards && project.awards.length > 0 && (
                  <div className="project-awards">
                    {project.awards.map((award, i) => (
                      <span key={i} className="award-badge">🏆 {award}</span>
                    ))}
                  </div>
                )}
                <span className="view-project">View Project →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW: about + contact */}
      <AboutSection />
      <ContactSection />

      <footer>
        <p>&copy; 2024 {settings.title}. All rights reserved.</p>
      </footer>

      <a href="/admin" className="admin-btn">Admin Panel</a>
    </div>
  )
}
