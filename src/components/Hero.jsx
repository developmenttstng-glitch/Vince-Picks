import { useState, useEffect } from 'react'

const TITLES = [
  'TikTok Affiliate Creator',
  'Fish Keeper 🐟',
  'Car Accessories Fan 🚗',
  'Finds Cheap Useful Stuff 💡',
]

function TypeWriter({ texts }) {
  const [display, setDisplay]   = useState('')
  const [textIdx, setTextIdx]   = useState(0)
  const [charIdx, setCharIdx]   = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [paused, setPaused]     = useState(false)

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1600)
      return () => clearTimeout(t)
    }
    const speed = deleting ? 40 : 70
    const t = setTimeout(() => {
      const current = texts[textIdx]
      if (!deleting) {
        const next = current.slice(0, charIdx + 1)
        setDisplay(next)
        if (next === current) {
          setPaused(true)
          setDeleting(true)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        const next = current.slice(0, charIdx - 1)
        setDisplay(next)
        if (next === '') {
          setDeleting(false)
          setCharIdx(0)
          setTextIdx(i => (i + 1) % texts.length)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [display, deleting, paused, textIdx, charIdx, texts])

  return (
    <span>
      {display}
      <span style={{
        display: 'inline-block', width: 2, height: '1em',
        background: '#f5c842', marginLeft: 2, verticalAlign: 'middle',
        animation: 'blink 1s step-end infinite',
      }}/>
    </span>
  )
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const tags = [
    { icon: '🐟', label: 'Fish Keeper' },
    { icon: '🚗', label: 'Car Accessories' },
    { icon: '💡', label: 'Useful Finds' },
    { icon: '💰', label: 'Affiliate Tips' },
  ]

  return (
    <div style={{
      padding: '48px 24px 36px',
      textAlign: 'center',
      background: '#fff',
      borderBottom: '1px solid #efefef',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
    }}>

      {/* Background decoration */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 200, height: 200, borderRadius: '50%',
        background: 'rgba(245,200,66,0.06)',
        pointerEvents: 'none',
      }}/>
      <div style={{
        position: 'absolute', bottom: -40, left: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: 'rgba(245,200,66,0.04)',
        pointerEvents: 'none',
      }}/>

      {/* Avatar */}
      <div style={{
        position: 'relative', width: 88, margin: '0 auto 18px',
        animation: loaded ? 'scaleIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both' : 'none',
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%',
          background: '#1a1a1a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36,
          border: '3px solid #fff',
          outline: '2px solid #f0f0f0',
          animation: 'float 4s ease-in-out infinite',
        }}>
          🧺
        </div>
        <div style={{
          position: 'absolute', bottom: -2, right: -2,
          width: 26, height: 26, borderRadius: '50%',
          background: '#f5c842',
          border: '2.5px solid #fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12,
          animation: 'pulse 2.5s ease-in-out infinite',
        }}>
          ✦
        </div>
      </div>

      {/* Name */}
      <div style={{
        fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em',
        marginBottom: 3,
        animation: loaded ? 'fadeUp 0.6s 0.15s ease both' : 'none',
      }}>
        Vince Picks
      </div>

      {/* Handle */}
      <div style={{
        fontSize: 12, color: '#aaa', marginBottom: 10,
        letterSpacing: '0.04em',
        animation: loaded ? 'fadeUp 0.6s 0.25s ease both' : 'none',
      }}>
        @vincelayug20
      </div>

      {/* Typewriter */}
      <div style={{
        fontSize: 13, fontWeight: 600, color: '#555',
        marginBottom: 18, minHeight: 22,
        animation: loaded ? 'fadeUp 0.6s 0.35s ease both' : 'none',
      }}>
        <TypeWriter texts={TITLES}/>
      </div>

      {/* Tags */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6,
        justifyContent: 'center', marginBottom: 22,
        animation: loaded ? 'fadeUp 0.6s 0.45s ease both' : 'none',
      }}>
        {tags.map((t, i) => (
          <span key={i} style={{
            padding: '5px 13px', borderRadius: '100px',
            background: '#f5f5f3', color: '#555',
            fontSize: 11, fontWeight: 500,
            border: '1px solid #e8e8e8',
            transition: 'all 0.2s',
            cursor: 'default',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#f5c842'
            e.currentTarget.style.color = '#1a1a1a'
            e.currentTarget.style.borderColor = '#f5c842'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#f5f5f3'
            e.currentTarget.style.color = '#555'
            e.currentTarget.style.borderColor = '#e8e8e8'
          }}>
            {t.icon} {t.label}
          </span>
        ))}
      </div>

      {/* Follow button */}
      <a href="https://www.tiktok.com/@vincelayug20" target="_blank" rel="noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 26px',
          background: '#1a1a1a', color: '#fff',
          borderRadius: '100px', fontSize: 13, fontWeight: 700,
          textDecoration: 'none',
          transition: 'transform 0.2s, background 0.2s',
          animation: loaded ? 'fadeUp 0.6s 0.55s ease both' : 'none',
          position: 'relative', zIndex: 1,
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}>
        <span style={{
          width: 18, height: 18, borderRadius: 4,
          background: '#fff', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: 9, color: '#1a1a1a', fontWeight: 900,
        }}>▶</span>
        Follow on TikTok
      </a>
    </div>
  )
}
