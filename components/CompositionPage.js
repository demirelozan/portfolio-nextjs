'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

export default function CompositionPage({ project }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [currentSheet, setCurrentSheet] = useState(0)
  const [sheetLoaded, setSheetLoaded] = useState(false)

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) audioRef.current.pause()
    else audioRef.current.play()
    setPlaying(!playing)
  }

  const onTimeUpdate = () => {
    if (!audioRef.current) return
    const cur = audioRef.current.currentTime
    const dur = audioRef.current.duration
    setProgress(dur ? (cur / dur) * 100 : 0)
    setCurrentTime(formatTime(cur))
  }

  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(formatTime(audioRef.current.duration))
  }

  const seek = (e) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * audioRef.current.duration
  }

  const sheets = project.sheetFiles || []
  const isPdf = project.sheetType === 'pdf'

  return (
    <div className="cp-root">
      {/* Top nav bar */}
      <nav className="cp-nav">
        <Link href="/" className="cp-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Portfolio
        </Link>
        <Link href="/" className="cp-logo">Ozan Demirel</Link>
      </nav>

      <main className="cp-main">
        {/* Header */}
        <header className="cp-header">
          {project.image && (
            <div className="cp-cover-wrap">
              <img src={project.image} alt={project.title} className="cp-cover" />
            </div>
          )}
          <div className="cp-meta">
            <div className="cp-category-row">
              <span className="cp-category">{project.category}</span>
              <span className="cp-year">{project.year}</span>
            </div>
            <h1 className="cp-title">{project.title}</h1>
            <p className="cp-desc">{project.description}</p>
            {project.awards && project.awards.length > 0 && (
              <div className="cp-awards">
                {project.awards.map((a, i) => (
                  <span key={i} className="cp-award">🏆 {a}</span>
                ))}
              </div>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="cp-ext-link">
                View Project Page ↗
              </a>
            )}
          </div>
        </header>

        {/* Audio Player */}
        {project.wavFile && (
          <section className="cp-section">
            <h2 className="cp-section-label">▶ Audio</h2>
            <div className="cp-player">
              <audio
                ref={audioRef}
                src={project.wavFile}
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={() => setPlaying(false)}
              />
              <button className="cp-play-btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
                {playing
                  ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  : <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                }
              </button>
              <span className="cp-time">{currentTime}</span>
              <div className="cp-progress" onClick={seek}>
                <div className="cp-progress-fill" style={{ width: `${progress}%` }} />
                <div className="cp-progress-thumb" style={{ left: `${progress}%` }} />
              </div>
              <span className="cp-time">{duration}</span>
            </div>
          </section>
        )}

        {/* Sheet Music */}
        {sheets.length > 0 && (
          <section className="cp-section">
            <div className="cp-sheet-header">
              <h2 className="cp-section-label">♩ Sheet Music</h2>
              {!isPdf && sheets.length > 1 && (
                <div className="cp-sheet-nav">
                  <button
                    className="cp-nav-btn"
                    onClick={() => { setSheetLoaded(false); setCurrentSheet(i => Math.max(0, i - 1)) }}
                    disabled={currentSheet === 0}
                  >‹</button>
                  <span className="cp-sheet-counter">{currentSheet + 1} / {sheets.length}</span>
                  <button
                    className="cp-nav-btn"
                    onClick={() => { setSheetLoaded(false); setCurrentSheet(i => Math.min(sheets.length - 1, i + 1)) }}
                    disabled={currentSheet === sheets.length - 1}
                  >›</button>
                </div>
              )}
            </div>

            {isPdf ? (
              <iframe
                src={sheets[0]}
                className="cp-pdf"
                title="Sheet Music"
              />
            ) : (
              <div className="cp-img-wrap">
                {!sheetLoaded && (
                  <div className="cp-loading">
                    <div className="cp-spinner" />
                  </div>
                )}
                <img
                  key={currentSheet}
                  src={sheets[currentSheet]}
                  alt={`Page ${currentSheet + 1}`}
                  className="cp-sheet-img"
                  style={{ opacity: sheetLoaded ? 1 : 0 }}
                  onLoad={() => setSheetLoaded(true)}
                />
              </div>
            )}
          </section>
        )}
      </main>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cp-root {
          min-height: 100vh;
          background: #0A0A0A;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Nav */
        .cp-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: sticky;
          top: 0;
          background: rgba(10,10,10,0.9);
          backdrop-filter: blur(12px);
          z-index: 100;
        }
        .cp-back {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #9CA3AF;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .cp-back:hover { color: #F59E0B; }
        .cp-back svg { width: 1rem; height: 1rem; }
        .cp-logo {
          font-size: 0.875rem;
          font-weight: 700;
          color: #F59E0B;
          text-decoration: none;
          letter-spacing: 0.02em;
        }

        /* Main */
        .cp-main {
          max-width: 860px;
          margin: 0 auto;
          padding: 3rem 2rem 5rem;
        }

        /* Header */
        .cp-header {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 2.5rem;
          margin-bottom: 3rem;
          align-items: start;
        }
        @media (max-width: 640px) {
          .cp-header { grid-template-columns: 1fr; }
          .cp-main { padding: 2rem 1.25rem 4rem; }
          .cp-nav { padding: 1rem 1.25rem; }
        }
        .cp-cover-wrap {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          aspect-ratio: 4/3;
        }
        .cp-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .cp-category-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .cp-category {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #F59E0B;
          font-weight: 700;
          background: rgba(245,158,11,0.1);
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          border: 1px solid rgba(245,158,11,0.2);
        }
        .cp-year {
          font-size: 0.8rem;
          color: #6B7280;
        }
        .cp-title {
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .cp-desc {
          font-size: 1rem;
          color: #9CA3AF;
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }
        .cp-awards {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        .cp-award {
          font-size: 0.75rem;
          color: #F59E0B;
          background: rgba(245,158,11,0.08);
          border: 1px solid rgba(245,158,11,0.2);
          padding: 0.3rem 0.75rem;
          border-radius: 6px;
        }
        .cp-ext-link {
          display: inline-block;
          font-size: 0.875rem;
          color: #9CA3AF;
          text-decoration: none;
          border-bottom: 1px solid rgba(156,163,175,0.3);
          padding-bottom: 1px;
          transition: color 0.2s, border-color 0.2s;
        }
        .cp-ext-link:hover { color: #F59E0B; border-color: rgba(245,158,11,0.5); }

        /* Sections */
        .cp-section {
          background: #141414;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .cp-section-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #6B7280;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        /* Audio player */
        .cp-player {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .cp-play-btn {
          flex-shrink: 0;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 50%;
          background: #F59E0B;
          border: none;
          color: #0A0A0A;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .cp-play-btn:hover { background: #FBB731; transform: scale(1.06); }
        .cp-play-btn svg { width: 1.1rem; height: 1.1rem; }
        .cp-time {
          font-size: 0.75rem;
          color: #6B7280;
          font-variant-numeric: tabular-nums;
          min-width: 2.5rem;
        }
        .cp-progress {
          flex: 1;
          height: 5px;
          background: rgba(255,255,255,0.08);
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          transition: height 0.15s;
        }
        .cp-progress:hover { height: 7px; }
        .cp-progress-fill {
          height: 100%;
          background: #F59E0B;
          border-radius: 4px;
          transition: width 0.1s linear;
        }
        .cp-progress-thumb {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: #F59E0B;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .cp-progress:hover .cp-progress-thumb { opacity: 1; }

        /* Sheet music */
        .cp-sheet-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .cp-sheet-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .cp-nav-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          width: 2rem;
          height: 2rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .cp-nav-btn:hover:not(:disabled) {
          background: rgba(245,158,11,0.15);
          border-color: rgba(245,158,11,0.4);
          color: #F59E0B;
        }
        .cp-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .cp-sheet-counter {
          font-size: 0.75rem;
          color: #6B7280;
          min-width: 3rem;
          text-align: center;
        }
        .cp-pdf {
          width: 100%;
          height: 700px;
          border: none;
          border-radius: 8px;
          background: #1a1a1a;
          display: block;
        }
        .cp-img-wrap { position: relative; min-height: 200px; }
        .cp-loading {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cp-spinner {
          width: 2rem;
          height: 2rem;
          border: 2px solid rgba(255,255,255,0.1);
          border-top-color: #F59E0B;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .cp-sheet-img {
          width: 100%;
          border-radius: 8px;
          display: block;
          transition: opacity 0.3s;
        }
      `}</style>
    </div>
  )
}
