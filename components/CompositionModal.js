'use client'

import { useRef, useState, useEffect } from 'react'

export default function CompositionModal({ project, onClose }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [currentSheet, setCurrentSheet] = useState(0)
  const [sheetLoaded, setSheetLoaded] = useState(false)

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00'
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
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
    if (!audioRef.current) return
    setDuration(formatTime(audioRef.current.duration))
  }

  const onEnded = () => setPlaying(false)

  const seek = (e) => {
    if (!audioRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = ratio * audioRef.current.duration
  }

  const sheets = project.sheetFiles || []
  const isPdf = project.sheetType === 'pdf'

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-category">{project.category} · {project.year}</div>
            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-desc">{project.description}</p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Audio Player */}
        {project.wavFile && (
          <div className="modal-audio">
            <div className="audio-label">▶ Audio</div>
            <audio
              ref={audioRef}
              src={project.wavFile}
              onTimeUpdate={onTimeUpdate}
              onLoadedMetadata={onLoadedMetadata}
              onEnded={onEnded}
            />
            <div className="audio-controls">
              <button className="play-btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
                {playing
                  ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                  : <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                }
              </button>
              <span className="audio-time">{currentTime}</span>
              <div className="progress-bar" onClick={seek}>
                <div className="progress-fill" style={{ width: `${progress}%` }} />
                <div className="progress-thumb" style={{ left: `${progress}%` }} />
              </div>
              <span className="audio-time">{duration}</span>
            </div>
          </div>
        )}

        {/* Sheet Music */}
        {sheets.length > 0 && (
          <div className="modal-sheets">
            <div className="sheets-header">
              <div className="audio-label">♩ Sheet Music</div>
              {!isPdf && sheets.length > 1 && (
                <div className="sheet-nav">
                  <button
                    className="sheet-nav-btn"
                    onClick={() => { setSheetLoaded(false); setCurrentSheet(i => Math.max(0, i - 1)) }}
                    disabled={currentSheet === 0}
                  >‹</button>
                  <span className="sheet-counter">{currentSheet + 1} / {sheets.length}</span>
                  <button
                    className="sheet-nav-btn"
                    onClick={() => { setSheetLoaded(false); setCurrentSheet(i => Math.min(sheets.length - 1, i + 1)) }}
                    disabled={currentSheet === sheets.length - 1}
                  >›</button>
                </div>
              )}
            </div>

            {isPdf ? (
              <iframe
                src={sheets[0]}
                className="sheet-pdf"
                title="Sheet Music PDF"
              />
            ) : (
              <div className="sheet-img-wrap">
                {!sheetLoaded && (
                  <div className="sheet-loading">
                    <div className="sheet-spinner" />
                  </div>
                )}
                <img
                  key={currentSheet}
                  src={sheets[currentSheet]}
                  alt={`Sheet ${currentSheet + 1}`}
                  className="sheet-img"
                  style={{ opacity: sheetLoaded ? 1 : 0 }}
                  onLoad={() => setSheetLoaded(true)}
                />
              </div>
            )}
          </div>
        )}

        {/* Awards */}
        {project.awards && project.awards.length > 0 && (
          <div className="modal-awards">
            {project.awards.map((a, i) => (
              <span key={i} className="award-badge">🏆 {a}</span>
            ))}
          </div>
        )}

      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: backdropIn 0.2s ease;
        }
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .modal-panel {
          background: #141414;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          width: 100%;
          max-width: 780px;
          max-height: 90vh;
          overflow-y: auto;
          animation: panelIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          scrollbar-width: thin;
          scrollbar-color: rgba(245,158,11,0.3) transparent;
        }
        @keyframes panelIn {
          from { opacity: 0; transform: scale(0.93) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Header */
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.75rem 1.75rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .modal-category {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #F59E0B;
          margin-bottom: 0.4rem;
          font-weight: 600;
        }
        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }
        .modal-desc {
          font-size: 0.875rem;
          color: #9CA3AF;
          line-height: 1.6;
        }
        .modal-close {
          flex-shrink: 0;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #9CA3AF;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          margin-top: 2px;
        }
        .modal-close:hover {
          background: rgba(245,158,11,0.15);
          border-color: rgba(245,158,11,0.4);
          color: #F59E0B;
        }

        /* Audio */
        .modal-audio {
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .audio-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #9CA3AF;
          margin-bottom: 0.9rem;
          font-weight: 600;
        }
        .audio-controls {
          display: flex;
          align-items: center;
          gap: 0.9rem;
        }
        .play-btn {
          flex-shrink: 0;
          width: 2.5rem;
          height: 2.5rem;
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
        .play-btn:hover { background: #FBB731; transform: scale(1.06); }
        .play-btn svg { width: 1rem; height: 1rem; }
        .audio-time {
          font-size: 0.75rem;
          color: #9CA3AF;
          font-variant-numeric: tabular-nums;
          min-width: 2.5rem;
        }
        .progress-bar {
          flex: 1;
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          cursor: pointer;
          position: relative;
        }
        .progress-bar:hover { height: 6px; }
        .progress-fill {
          height: 100%;
          background: #F59E0B;
          border-radius: 4px;
          transition: width 0.1s linear;
        }
        .progress-thumb {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background: #F59E0B;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .progress-bar:hover .progress-thumb { opacity: 1; }

        /* Sheets */
        .modal-sheets {
          padding: 1.25rem 1.75rem 1.5rem;
        }
        .sheets-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.9rem;
        }
        .sheet-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sheet-nav-btn {
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
        .sheet-nav-btn:hover:not(:disabled) {
          background: rgba(245,158,11,0.15);
          border-color: rgba(245,158,11,0.4);
          color: #F59E0B;
        }
        .sheet-nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .sheet-counter {
          font-size: 0.75rem;
          color: #9CA3AF;
          min-width: 3rem;
          text-align: center;
        }
        .sheet-pdf {
          width: 100%;
          height: 520px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          background: #1a1a1a;
        }
        .sheet-img-wrap {
          position: relative;
          min-height: 200px;
        }
        .sheet-loading {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sheet-spinner {
          width: 2rem;
          height: 2rem;
          border: 2px solid rgba(255,255,255,0.1);
          border-top-color: #F59E0B;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .sheet-img {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          display: block;
          transition: opacity 0.3s;
        }

        /* Awards */
        .modal-awards {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0 1.75rem 1.5rem;
        }
      `}</style>
    </div>
  )
}
