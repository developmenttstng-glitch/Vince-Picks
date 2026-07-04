import { useState } from 'react'

const VIDEOS = [
  {
    id:    '7558021274602081554',
    label: 'Fish Keeping Tips',
    emoji: '🐟',
    bg:    '#0f2027',
  },
  {
    id:    '7598033694791716114',
    label: 'Car Accessories Haul',
    emoji: '🚗',
    bg:    '#1a1a2e',
  },
  {
    id:    '7532351516213038344',
    label: 'Yellow Basket Review',
    emoji: '🧺',
    bg:    '#1c1208',
  },
  {
    id:    '7529768561028435207',
    label: 'Affiliate Tips 101',
    emoji: '💰',
    bg:    '#0d1a0d',
  },
]

function VideoCard({ video, index }) {
  const [hovered, setHovered] = useState(false)
  const url = `https://www.tiktok.com/@vincelayug20/video/${video.id}`

  return (
    <a href={url} target="_blank" rel="noreferrer"
      className="reveal"
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        aspectRatio: '9/16',
        borderRadius: 16, overflow: 'hidden',
        textDecoration: 'none',
        background: video.bg,
        position: 'relative',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        transitionDelay: `${index * 0.05}s`,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%)',
      }}/>

      {/* Emoji */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: `translate(-50%, -50%) ${hovered ? 'scale(1.2)' : 'scale(1)'}`,
        fontSize: 36,
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
      }}>
        {video.emoji}
      </div>

      {/* Play circle */}
      <div style={{
        position: 'absolute', top: '52%', left: '50%',
        transform: `translate(-50%, -50%) ${hovered ? 'scale(1.15)' : 'scale(1)'}`,
        width: 40, height: 40, borderRadius: '50%',
        border: `2px solid ${hovered ? '#f5c842' : 'rgba(255,255,255,0.5)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hovered ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.05)',
        transition: 'all 0.25s',
      }}>
        <div style={{
          width: 0, height: 0,
          borderTop: '7px solid transparent',
          borderBottom: '7px solid transparent',
          borderLeft: `12px solid ${hovered ? '#f5c842' : 'rgba(255,255,255,0.9)'}`,
          marginLeft: 3,
          transition: 'border-left-color 0.2s',
        }}/>
      </div>

      {/* Live dot */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        width: 7, height: 7, borderRadius: '50%',
        background: '#f5c842',
        animation: 'pulse 2s ease-in-out infinite',
      }}/>

      {/* TikTok badge */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        background: 'rgba(0,0,0,0.6)',
        borderRadius: 6, padding: '3px 7px',
        fontSize: 9, fontWeight: 800, color: '#fff',
        letterSpacing: '0.06em',
        backdropFilter: 'blur(4px)',
      }}>
        TikTok
      </div>

      {/* Label */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: '0 12px 14px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: '#fff',
          lineHeight: 1.35, marginBottom: 6,
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
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
