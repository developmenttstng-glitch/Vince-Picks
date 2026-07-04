import { useState, useEffect } from 'react'

const VIDEOS = [
  { id: '7558021274602081554', label: 'Fish Keeping Tips',    emoji: '🐟' },
  { id: '7598033694791716114', label: 'Car Accessories Haul', emoji: '🚗' },
  { id: '7532351516213038344', label: 'Yellow Basket Review', emoji: '🧺' },
  { id: '7529768561028435207', label: 'Affiliate Tips 101',   emoji: '💰' },
]

function VideoCard({ video, index }) {
  const [hovered,   setHovered]   = useState(false)
  const [thumb,     setThumb]     = useState(null)
  const [thumbFail, setThumbFail] = useState(false)

  const url = `https://www.tiktok.com/@vincelayug20/video/${video.id}`

  useEffect(() => {
    // Fetch thumbnail from TikTok oEmbed API via a CORS proxy
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
    fetch(oembedUrl)
      .then(r => r.json())
      .then(data => {
        if (data.thumbnail_url) setThumb(data.thumbnail_url)
        else setThumbFail(true)
      })
      .catch(() => setThumbFail(true))
  }, [url])

  return (
    <a href={url} target="_blank" rel="noreferrer"
      className="reveal"
      style={{
        display: 'block',
        aspectRatio: '9/16',
        borderRadius: 16,
        overflow: 'hidden',
        textDecoration: 'none',
        position: 'relative',
        background: '#111',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transitionDelay: `${index * 0.05}s`,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Real thumbnail or fallback */}
      {thumb && !thumbFail ? (
        <img src={thumb} alt={video.label}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
          onError={() => setThumbFail(true)}
        />
      ) : (
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, background: '#1a1a1a',
        }}>
          {thumbFail ? video.emoji : (
            // Loading skeleton shimmer
            <div style={{
              width: '100%', height: '100%',
              background: 'linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.4s infinite',
            }}/>
          )}
        </div>
      )}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.08) 55%)',
      }}/>

      {/* Play button */}
      <div style={{
        position: 'absolute', top: '42%', left: '50%',
        transform: `translate(-50%, -50%) ${hovered ? 'scale(1.15)' : 'scale(1)'}`,
        width: 40, height: 40, borderRadius: '50%',
        border: `2px solid ${hovered ? '#f5c842' : 'rgba(255,255,255,0.6)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hovered ? 'rgba(245,200,66,0.15)' : 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(4px)',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <div style={{
          width: 0, height: 0,
          borderTop: '7px solid transparent',
          borderBottom: '7px solid transparent',
          borderLeft: `12px solid ${hovered ? '#f5c842' : '#fff'}`,
          marginLeft: 3,
          transition: 'border-left-color 0.2s',
        }}/>
      </div>

      {/* TikTok badge */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        borderRadius: 6, padding: '3px 7px',
        fontSize: 9, fontWeight: 800, color: '#fff',
        letterSpacing: '0.06em',
      }}>
        TikTok
      </div>

      {/* Live dot */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        width: 7, height: 7, borderRadius: '50%',
        background: '#f5c842',
        animation: 'pulse 2s ease-in-out infinite',
      }}/>

      {/* Label */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 12px 14px', zIndex: 1,
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: '#fff',
          lineHeight: 1.35, marginBottom: 5,
          textShadow: '0 1px 4px rgba(0,0,0,0.8)',
        }}>
          {video.label}
        </div>
        <div style={{
          fontSize: 9, fontWeight: 700,
          color: hovered ? '#f5c842' : 'rgba(255,255,255,0.5)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          transition: 'color 0.2s',
        }}>
          Watch on TikTok →
        </div>
      </div>
    </a>
  )
}

export default function Videos() {
  return (
    <div style={{ background: '#fff', padding: '24px 20px' }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: '#bbb', marginBottom: 6,
      }}>
        🎬 My Videos
      </div>
      <div style={{ fontSize: 11, color: '#ccc', marginBottom: 16 }}>
        Click any video to watch on TikTok
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {VIDEOS.map((v, i) => <VideoCard key={v.id} video={v} index={i}/>)}
      </div>

      <a href="https://www.tiktok.com/@vincelayug20" target="_blank" rel="noreferrer"
        style={{
          display: 'block', marginTop: 10,
          padding: '13px', background: '#f5f5f3',
          border: '1px solid #efefef', borderRadius: 14,
          fontSize: 13, fontWeight: 600, color: '#444',
          textAlign: 'center', textDecoration: 'none',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#1a1a1a'
          e.currentTarget.style.color = '#fff'
          e.currentTarget.style.borderColor = '#1a1a1a'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = '#f5f5f3'
          e.currentTarget.style.color = '#444'
          e.currentTarget.style.borderColor = '#efefef'
        }}>
        View all videos on TikTok →
      </a>
    </div>
  )
}
