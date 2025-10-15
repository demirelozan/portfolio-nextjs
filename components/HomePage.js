'use client'

import { useEffect, useState } from 'react'
import AboutSection from './AboutSection'
import ContactSection from './ContactSection'

export default function HomePage({ projects = [], gallery = [], settings = {} }) {
  const [filter, setFilter] = useState('all')

  // Scroll spy for nav underline
  useEffect(() => {
    const ids = ['portfolio','about','contact']
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean)
    const links = Array.from(document.querySelectorAll('.nav-links a'))
    const onScroll = () => {
      const y = window.scrollY + 120
      let current = ids[0]
      sections.forEach(sec => { if (sec.offsetTop <= y) current = sec.id })
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`))
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
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

      {/* HERO */}
      <header className="hero" id="top">
        <div className="hero-wrap">
          <div className="hero-photo">
            {/* swap src for your exact asset if you prefer */}
            <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop" alt="Ozan Demirel" />
          </div>
          <div className="hero-text">
            <h1 className="hero-heading">Ozan Demirel</h1>
            <div className="hero-sub">Film &amp; Media Composer</div>
            <p className="hero-desc">
              Creating emotional soundscapes that bring stories to life through music.
              Specializing in orchestral and electronic fusion for films, games, and commercials.
            </p>
            <ul className="hero-list">
              <li>Film, TV &amp; Game Composer</li>
              <li>Orchestral Scoring</li>
              <li>Sound Design</li>
            </ul>
            <div className="hero-socials">
              {/* SoundCloud */}
              <a href="https://soundcloud.com/your-handle" aria-label="SoundCloud" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24"><path d="M17 9a4 4 0 0 0-3.4 1.9A3 3 0 0 0 8 13H6a3 3 0 0 0 0 6h11a4 4 0 0 0 0-8Z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/your-handle" aria-label="Instagram" target="_blank" rel="noreferrer">
                <svg viewBox="0 0 24 24"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7Zm6-1.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z"/></svg>
              </a>
              {/* Email */}
              <a href="mailto:ozandemirel.music@gmail.com" aria-label="Email">
                <svg viewBox="0 0 24 24"><path d="M3 5h18v14H3z"/><path d="m3 5 9 7 9-7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* STUDIO & LIVE SESSIONS */}
      <section className="section-block">
        <div className="studio">
          <h2 className="section-title">Studio &amp; Live Sessions</h2>
          <div className="studio-row">
            {(gallery?.length ? gallery : [
              { title: 'Recording Session', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop' },
              { title: 'Live Performance', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop' },
              { title: 'Studio Setup', image: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1200&auto=format&fit=crop' }
            ]).map((g, i) => (
              <article className="studio-card" key={i}>
                <img src={g.image} alt={g.title} />
                <div className="caption">{g.title}</div>
              </article>
            ))}
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
