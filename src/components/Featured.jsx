import { useState } from 'react'

export default function Featured() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  function handleClick() {
    setClicked(true)
    setTimeout(() => setClicked(false), 600)
  }

  return (
    <div style={{ background: '#fff', padding: '24px 20px 0' }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: '#bbb', marginBottom: 14,
      }}>
        ⭐ Featured
      </div>

      <a href="https://vt.tiktok.com/ZSCVQQaRP/?page=TikTokShop"
        target="_blank" rel="noreferrer"
        className="reveal"
        style={{
          display: 'block', textDecoration: 'none',
          border: `1.5px solid ${hovered ? '#f5c842' : '#e8e8e8'}`,
          borderRadius: 18, overflow: 'hidden',
          transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hovered ? '0 12px 32px rgba(245,200,66,0.15)' : 'none',
          marginBottom: 24,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}>

        {/* Dark top with animated basket */}
        <div style={{
          height: 150, background: '#1a1a1a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              position: 'absolute',
              width: 80 + i*60, height: 80 + i*60,
              borderRadius: '50%',
              border: `1px solid rgba(245,200,66,${0.15 - i*0.04})`,
              animation: `spin ${8 + i*4}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
            }}/>
          ))}

          <div style={{
            fontSize: 64,
            animation: 'float 3.5s ease-in-out infinite',
            position: 'relative', zIndex: 1,
            filter: clicked ? 'brightness(1.5)' : 'none',
            transition: 'filter 0.2s',
          }}>
            🧺
          </div>

          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: '#f5c842', color: '#1a1a1a',
            fontSize: 9, fontWeight: 800,
            padding: '4px 10px', borderRadius: '100px',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            ⭐ Top Pick
          </div>

          {hovered && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(245,200,66,0.06) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
            }}/>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '16px 18px 18px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4, color: '#1a1a1a' }}>
            Browse Full Showcase
          </div>
          <div style={{ fontSize: 12, color: '#888', lineHeight: 1.6, marginBottom: 14 }}>
            All my recommended products — affordable, durable and featured in all my videos. Check them out on TikTok Shop!
          </div>
          <div style={{
            display: 'block', width: '100%',
            padding: 13,
            background: hovered ? '#f5c842' : '#1a1a1a',
            color: hovered ? '#1a1a1a' : '#fff',
            borderRadius: 12,
            fontSize: 13, fontWeight: 700,
            textAlign: 'center',
            transition: 'background 0.2s, color 0.2s',
          }}>
            Browse Full Showcase →
          </div>
        </div>
      </a>
    </div>
  )
}
