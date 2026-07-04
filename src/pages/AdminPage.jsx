import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const DEFAULT_CATS = ['Fish', 'Car', 'Tips', 'Hauls', 'General']

function extractVideoId(url) {
  const match = url.match(/video\/(\d+)/)
  return match ? match[1] : null
}

async function fetchThumbnail(tiktokUrl) {
  try {
    const res  = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(tiktokUrl)}`)
    const data = await res.json()
    return data.thumbnail_url || null
  } catch { return null }
}

// ── Login form ────────────────────────────────────────────────────────────────
function LoginForm() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState(null)
  const [loading,  setLoading]  = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true); setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#f5f5f3',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        width: '100%', maxWidth: 360,
        background: '#fff', borderRadius: 20,
        border: '1px solid #efefef', padding: '40px 32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 36, marginBottom: 16, animation: 'float 3s ease-in-out infinite', display: 'inline-block' }}>🧺</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>Admin Panel</div>
        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 28 }}>Vince Picks</div>

        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)}
            type="email" required placeholder="your@email.com"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e8e8e8', fontSize: 13, marginBottom: 16, fontFamily: 'inherit', outline: 'none' }}/>

          <label style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)}
            type="password" required placeholder="••••••••"
            style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e8e8e8', fontSize: 13, marginBottom: 20, fontFamily: 'inherit', outline: 'none' }}/>

          {error && (
            <div style={{ fontSize: 12, color: '#d82c0d', marginBottom: 14, background: '#fff4f4', padding: '8px 12px', borderRadius: 8 }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: 13, background: '#1a1a1a', color: '#fff',
            border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
            fontFamily: 'inherit',
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Add video form ────────────────────────────────────────────────────────────
function AddVideoForm({ onAdded, savedCats }) {
  const [url,         setUrl]         = useState('')
  const [title,       setTitle]       = useState('')
  const [category,    setCategory]    = useState('General')
  const [customCat,   setCustomCat]   = useState(false)
  const [description, setDescription] = useState('')
  const [loading,     setLoading]     = useState(false)
  const [fetching,    setFetching]    = useState(false)
  const [error,       setError]       = useState(null)
  const [thumb,       setThumb]       = useState(null)

  // Merge default + any previously saved custom categories
  const allCats = [...new Set([...DEFAULT_CATS, ...savedCats])]

  async function handleUrlBlur() {
    if (!url.trim()) return
    const id = extractVideoId(url)
    if (!id) return
    setFetching(true)
    const t = await fetchThumbnail(url)
    setThumb(t)
    setFetching(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    const videoId = extractVideoId(url)
    if (!videoId) { setError('Invalid TikTok video URL'); return }

    setLoading(true)
    const thumbnail = thumb || await fetchThumbnail(url)

    const { error } = await supabase.from('videos').insert({
      title, tiktok_url: url, video_id: videoId,
      thumbnail, category, description, published: true,
    })

    if (error) { setError(error.message) }
    else {
      setUrl(''); setTitle(''); setDescription('')
      setCategory('General'); setThumb(null); setCustomCat(false)
      onAdded()
    }
    setLoading(false)
  }

  const inp = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1px solid #e8e8e8', fontSize: 13, marginBottom: 14,
    fontFamily: 'inherit', outline: 'none', background: '#fff',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #efefef', padding: 24, marginBottom: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18, letterSpacing: '-0.02em' }}>
        + Add New Video
      </div>

      <form onSubmit={handleSubmit}>

        {/* TikTok URL */}
        <label style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
          TikTok Video URL *
        </label>
        <input value={url} onChange={e => setUrl(e.target.value)}
          onBlur={handleUrlBlur}
          placeholder="https://www.tiktok.com/@vincelayug20/video/..."
          required style={inp}/>

        {/* Thumbnail preview */}
        {fetching && <div style={{ fontSize: 11, color: '#aaa', marginBottom: 14 }}>Fetching thumbnail...</div>}
        {thumb && (
          <div style={{ marginBottom: 14 }}>
            <img src={thumb} alt="thumbnail" style={{ width: 80, borderRadius: 8, border: '1px solid #efefef' }}/>
            <div style={{ fontSize: 10, color: '#bbb', marginTop: 4 }}>Thumbnail preview</div>
          </div>
        )}

        {/* Title */}
        <label style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
          Title *
        </label>
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Best Yellow Basket Review 2025"
          required style={inp}/>

        {/* Category */}
        <label style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
          Category
        </label>

        {customCat ? (
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Type new category name..."
              autoFocus
              style={{ ...inp, marginBottom: 0, flex: 1 }}
            />
            <button type="button"
              onClick={() => { setCustomCat(false); setCategory('General') }}
              style={{
                padding: '10px 14px', border: '1px solid #e8e8e8',
                borderRadius: 10, background: '#f5f5f3',
                cursor: 'pointer', fontSize: 14, color: '#888',
                flexShrink: 0,
              }}>
              ×
            </button>
          </div>
        ) : (
          <select value={category}
            onChange={e => {
              if (e.target.value === '__custom__') {
                setCustomCat(true)
                setCategory('')
              } else {
                setCategory(e.target.value)
              }
            }}
            style={{ ...inp }}>
            {allCats.map(c => <option key={c} value={c}>{c}</option>)}
            <option disabled style={{ color: '#ccc' }}>──────────</option>
            <option value="__custom__">+ Add custom category...</option>
          </select>
        )}

        {/* Description */}
        <label style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
          Description (optional)
        </label>
        <textarea value={description} onChange={e => setDescription(e.target.value)}
          placeholder="Short description of the video..."
          rows={3} style={{ ...inp, resize: 'vertical' }}/>

        {error && (
          <div style={{ fontSize: 12, color: '#d82c0d', background: '#fff4f4', padding: '8px 12px', borderRadius: 8, marginBottom: 14 }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{
          width: '100%', padding: 12, background: '#1a1a1a', color: '#fff',
          border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
          fontFamily: 'inherit',
        }}>
          {loading ? 'Saving...' : 'Save Video'}
        </button>
      </form>
    </div>
  )
}

// ── Video row ─────────────────────────────────────────────────────────────────
function VideoRow({ video, onDelete, onToggle }) {
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm(`Delete "${video.title}"?`)) return
    setDeleting(true)
    await supabase.from('videos').delete().eq('id', video.id)
    onDelete(video.id)
  }

  async function handleToggle() {
    await supabase.from('videos').update({ published: !video.published }).eq('id', video.id)
    onToggle(video.id, !video.published)
  }

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f3' }}>
      <div style={{ width: 48, height: 56, borderRadius: 8, overflow: 'hidden', background: '#1a1a1a', flexShrink: 0 }}>
        {video.thumbnail
          ? <img src={video.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎬</div>
        }
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {video.title}
        </div>
        <div style={{ fontSize: 10, color: '#aaa', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ background: '#f5f5f3', padding: '2px 7px', borderRadius: '100px', fontWeight: 600 }}>
            {video.category}
          </span>
          <span>{new Date(video.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <button onClick={handleToggle} style={{
          padding: '5px 10px', borderRadius: 7,
          border: `1px solid ${video.published ? '#d4edda' : '#e8e8e8'}`,
          background: video.published ? '#d4edda' : '#f5f5f3',
          color: video.published ? '#155724' : '#888',
          fontSize: 10, fontWeight: 700, cursor: 'pointer',
        }}>
          {video.published ? '✓ Live' : 'Draft'}
        </button>
        <a href={video.tiktok_url} target="_blank" rel="noreferrer"
          style={{
            padding: '5px 10px', borderRadius: 7,
            border: '1px solid #e8e8e8', background: '#fff',
            color: '#444', fontSize: 10, fontWeight: 700,
            textDecoration: 'none', display: 'flex', alignItems: 'center',
          }}>
          View
        </a>
        <button onClick={handleDelete} disabled={deleting} style={{
          padding: '5px 10px', borderRadius: 7,
          border: '1px solid #ffa8a8', background: '#fff4f4',
          color: '#d82c0d', fontSize: 10, fontWeight: 700, cursor: 'pointer',
        }}>
          {deleting ? '...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

// ── Main Admin ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [session,  setSession]  = useState(null)
  const [videos,   setVideos]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) loadVideos()
  }, [session])

  async function loadVideos() {
    setLoading(true)
    const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
    setVideos(data || [])
    setLoading(false)
  }

  function handleDelete(id) { setVideos(v => v.filter(x => x.id !== id)) }
  function handleToggle(id, published) { setVideos(v => v.map(x => x.id === id ? { ...x, published } : x)) }

  async function handleLogout() { await supabase.auth.signOut() }

  // Collect any custom categories already used in saved videos
  const savedCats = [...new Set(videos.map(v => v.category).filter(c => !DEFAULT_CATS.includes(c)))]

  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f3' }}>
      <div style={{ fontSize: 11, color: '#bbb', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Loading...</div>
    </div>
  )

  if (!session) return <LoginForm/>

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f3', paddingBottom: 60 }}>

      {/* Header */}
      <div style={{ background: '#1a1a1a', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>🧺</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Vince Picks Admin</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{session.user.email}</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          padding: '7px 14px', background: 'rgba(255,255,255,0.1)',
          color: '#fff', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer',
        }}>
          Sign Out
        </button>
      </div>

      <div style={{ padding: '20px 16px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 20 }}>
          {[
            { label: 'Total', value: videos.length },
            { label: 'Live',  value: videos.filter(v => v.published).length },
            { label: 'Draft', value: videos.filter(v => !v.published).length },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #efefef', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#aaa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Categories in use */}
        {savedCats.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #efefef', padding: '16px 20px', marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Custom Categories
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {savedCats.map(c => (
                <span key={c} style={{
                  padding: '4px 12px', borderRadius: '100px',
                  background: '#f5f5f3', border: '1px solid #e8e8e8',
                  fontSize: 11, fontWeight: 600, color: '#555',
                }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Add form */}
        <AddVideoForm onAdded={loadVideos} savedCats={savedCats}/>

        {/* Video list */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #efefef', padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, letterSpacing: '-0.02em' }}>
            All Videos ({videos.length})
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 32, color: '#ccc', fontSize: 11 }}>Loading...</div>
          ) : videos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 32, color: '#ccc', fontSize: 13 }}>
              No videos yet. Add your first one above!
            </div>
          ) : videos.map(v => (
            <VideoRow key={v.id} video={v} onDelete={handleDelete} onToggle={handleToggle}/>
          ))}
        </div>
      </div>
    </div>
  )
}
