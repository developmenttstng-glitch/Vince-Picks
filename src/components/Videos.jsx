import { useEffect, useRef, useState } from 'react'

const VIDEO_IDS = [
  { id: '7558021274602081554', label: 'Fish Keeping Tips' },
  { id: '7598033694791716114', label: 'Car Accessories Haul' },
  { id: '7532351516213038344', label: 'Yellow Basket Review' },
  { id: '7529768561028435207', label: 'Affiliate Tips 101' },
]

function VideoEmbed({ video, index }) {
  const ref    = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Load TikTok embed script once
    if (!document.getElementById('tiktok-embed-script')) {
      const s = document.createElement('script')
      s.id  = 'tiktok-embed-script'
      s.src = 'https://www.tiktok.com/embed.js'
      s.async = true
      s.onload = () => setReady(true)
      document.body.appendChild(s)
    } else {
      setReady(true)
    }
  }, [])

  useEffect(() => {
    if (ready && window.tiktok && ref.current) {
      try { window.tiktok.init() } catch {}
    }
  }, [ready])

  const url = `https://www.tiktok.com/@vincelayug20/video/${video.id}`

  return (
    <div className="reveal" style={{
      borderRadius: 16, overflow: 'hidden',
      border: '1px solid #efefef',
      background: '#111',
      transitionDelay: `${index * 0.08}s`,
    }}>
      <blockquote
        ref={ref}
        className="tiktok-embed"
        cite={url}
        data-video-id={video.id}
        style={{ maxWidth: '100%', minWidth: 'unset' }}
      >
        <section>
          <a href={url} target="_blank" rel="noreferrer"
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: 300, background: '#111', color: '#fff',
              textDecoration: 'none', fontSize: 12,
              gap: 12,
            }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 0, height: 0,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderLeft: '14px solid rgba(255,255,255,0.8)',
                marginLeft: 3,
              }}/>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
              {video.label}
            </span>
            <span style={{
              color: '#f5c842', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Watch on TikTok →
            </span>
          </a>
        </section>
      </blockquote>
    </div>
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
        Best viewed in the TikTok app
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {VIDEO_IDS.map((v, i) => (
          <VideoEmbed key={v.id} video={v} index={i}/>
        ))}
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
