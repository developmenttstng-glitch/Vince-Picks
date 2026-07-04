import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const PAGE_SIZE = 8

function VideoCard({ video }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a href={video.tiktok_url} target="_blank" rel="noreferrer"
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        border: `1px solid ${hovered ? '#f5c842' : '#efefef'}`,
        borderRadius: 16, overflow: 'hidden',
        background: '#fff',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(245,200,66,0.15)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div style={{ aspectRatio: '9/16', background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}/>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>
            🎬
          </div>
        )}

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.05) 50%)' }}/>

        <div style={{
          position: 'absolute', top: '42%', left: '50%',
          transform: `translate(-50%,-50%) ${hovered ? 'scale(1.15)' : 'scale(1)'}`,
          width: 40, height: 40, borderRadius: '50%',
          border: `2px solid ${hovered ? '#f5c842' : 'rgba(255,255,255,0.6)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hovered ? 'rgba(245,200,66,0.15)' : 'rgba(0,0,0,0.3)',
          backdropFilter: 'blur(4px)',
          transition: 'all 0.25s',
        }}>
          <div style={{
            width: 0, height: 0,
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderLeft: `12px solid ${hovered ? '#f5c842' : '#fff'}`,
            marginLeft: 3,
          }}/>
        </div>

        <div style={{
          position: 'absolute', top: 10, left: 10,
          background: '#1a1a1a', color: '#f5c842',
          fontSize: 9, fontWeight: 800,
          padding: '3px 8px', borderRadius: '100px',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {video.category}
        </div>

        <div style={{
          position: 'absolute', bottom: 10, left: 0, right: 0,
          textAlign: 'center', fontSize: 9, fontWeight: 700,
          color: hovered ? '#f5c842' : 'rgba(255,255,255,0.5)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          transition: 'color 0.2s',
        }}>
          Watch on TikTok →
        </div>
      </div>

      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 4, lineHeight: 1.4 }}>
          {video.title}
        </div>
        {video.description && (
          <div style={{
            fontSize: 11, color: '#aaa', lineHeight: 1.5, marginBottom: 6,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {video.description}
          </div>
        )}
        <div style={{ fontSize: 10, color: '#ccc', fontWeight: 500 }}>
          {new Date(video.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
    </a>
  )
}

export default function VlogPage() {
  const [videos,  setVideos]  = useState([])
  const [loading, setLoading] = useState(true)
  const [cat,     setCat]     = useState('All')
  const [search,  setSearch]  = useState('')
  const [page,    setPage]    = useState(1)
  const [total,   setTotal]   = useState(0)
  const [cats,    setCats]    = useState(['All'])

  useEffect(() => {
    supabase
      .from('videos')
      .select('category')
      .eq('published', true)
      .then(({ data }) => {
        if (!data) return
        const unique = [...new Set(data.map(v => v.category))].sort()
        setCats(['All', ...unique])
      })
  }, [])

  useEffect(() => { setPage(1) }, [cat, search])

  useEffect(() => { load() }, [cat, search, page])

  async function load() {
    setLoading(true)
    let q = supabase
      .from('videos')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

    if (cat !== 'All') q = q.eq('category', cat)
    if (search.trim()) q = q.ilike('title', `%${search.trim()}%`)

    const { data, count, error } = await q
    if (!error) { setVideos(data || []); setTotal(count || 0) }
    setLoading(false)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f3', paddingBottom: 60 }}>

      {/* Header */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #efefef',
        padding: '24px 24px 20px', textAlign: 'center',
      }}>
        {/* Back link */}
        <Link to="/"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, fontWeight: 600, color: '#aaa',
            textDecoration: 'none', marginBottom: 20,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
          onMouseLeave={e => e.currentTarget.style.color = '#aaa'}>
          ← Back to Vince Picks
        </Link>

        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#bbb', marginBottom: 8 }}>
          🎬 Vlog
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>
          Vince Picks Videos
        </div>
        <div style={{ fontSize: 13, color: '#aaa', marginBottom: 20 }}>
          Fish keeping, car accessories, useful finds & affiliate tips
        </div>

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search videos..."
          style={{
            width: '100%', maxWidth: 360,
            padding: '10px 16px', borderRadius: '100px',
            border: '1px solid #e8e8e8', background: '#f5f5f3',
            fontSize: 13, outline: 'none', fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Filter pills */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #efefef',
        padding: '12px 20px',
        display: 'flex', gap: 6, overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: '6px 16px', borderRadius: '100px', flexShrink: 0,
            border: `1px solid ${cat === c ? '#1a1a1a' : '#e8e8e8'}`,
            background: cat === c ? '#1a1a1a' : '#fff',
            color: cat === c ? '#fff' : '#666',
            fontSize: 11, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s',
          }}>
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding: '20px 16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#ccc' }}>
            <div style={{ fontSize: 32, marginBottom: 12, animation: 'spin 1s linear infinite', display: 'inline-block' }}>◈</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Loading...</div>
          </div>
        ) : videos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.2 }}>🎬</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>No videos found</div>
            <div style={{ fontSize: 12, color: '#aaa' }}>
              {search ? `No results for "${search}"` : 'No videos in this category yet'}
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
              {videos.map(v => <VideoCard key={v.id} video={v}/>)}
            </div>

            {totalPages > 1 && (
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)} style={{
                    width: 36, height: 36, borderRadius: '50%',
                    border: `1px solid ${page === p ? '#1a1a1a' : '#e8e8e8'}`,
                    background: page === p ? '#1a1a1a' : '#fff',
                    color: page === p ? '#fff' : '#666',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                    {p}
                  </button>
                ))}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: '#ccc' }}>
              {total} video{total !== 1 ? 's' : ''}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
