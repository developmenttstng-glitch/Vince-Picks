import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const DEFAULT_CATS = ['Fish', 'Car', 'Home', 'Tips', 'General']

// ── Login ─────────────────────────────────────────────────────────────────────
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

  const inp = { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e8e8e8', fontSize: 13, marginBottom: 16, fontFamily: 'inherit', outline: 'none' }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 360, background: '#fff', borderRadius: 20, border: '1px solid #efefef', padding: '40px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>🛍️</div>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>Link Manager</div>
        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 28 }}>Vince Picks Admin</div>
        <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required style={inp}/>
          <label style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required style={{ ...inp, marginBottom: 20 }}/>
          {error && <div style={{ fontSize: 12, color: '#d82c0d', background: '#fff4f4', padding: '8px 12px', borderRadius: 8, marginBottom: 14 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 13, background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, fontFamily: 'inherit' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Add link form ─────────────────────────────────────────────────────────────
function AddLinkForm({ onAdded, savedCats }) {
  const [name,        setName]        = useState('')
  const [url,         setUrl]         = useState('')
  const [image,       setImage]       = useState('')
  const [category,    setCategory]    = useState('General')
  const [customCat,   setCustomCat]   = useState(false)
  const [description, setDescription] = useState('')
  const [commission,  setCommission]  = useState('')
  const [featured,    setFeatured]    = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState(null)

  const allCats = [...new Set([...DEFAULT_CATS, ...savedCats])]

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!url.startsWith('http')) { setError('Please enter a valid URL'); return }
    setLoading(true)
    const { error } = await supabase.from('affiliate_links').insert({
      name, url, image: image || null,
      category, description, commission: commission || null,
      featured, active: true, clicks: 0,
    })
    if (error) setError(error.message)
    else {
      setName(''); setUrl(''); setImage(''); setDescription('')
      setCommission(''); setCategory('General')
      setFeatured(false); setCustomCat(false)
      onAdded()
    }
    setLoading(false)
  }

  const inp = { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e8e8e8', fontSize: 13, marginBottom: 14, fontFamily: 'inherit', outline: 'none', background: '#fff', boxSizing: 'border-box' }
  const lbl = { fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #efefef', padding: 24, marginBottom: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 18, letterSpacing: '-0.02em' }}>+ Add Affiliate Link</div>
      <form onSubmit={handleSubmit}>

        <label style={lbl}>Product Name *</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Yellow Storage Basket" required style={inp}/>

        <label style={lbl}>Affiliate URL *</label>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://vt.tiktok.com/..." required style={inp}/>

        <label style={lbl}>Image URL (optional)</label>
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." style={inp}/>
        {image && (
          <div style={{ marginBottom: 14 }}>
            <img src={image} alt="preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #efefef' }}
              onError={e => e.target.style.display = 'none'}/>
            <div style={{ fontSize: 10, color: '#bbb', marginTop: 4 }}>Image preview</div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={lbl}>Category</label>
            {customCat ? (
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                <input value={category} onChange={e => setCategory(e.target.value)} placeholder="New category..." autoFocus style={{ ...inp, marginBottom: 0, flex: 1 }}/>
                <button type="button" onClick={() => { setCustomCat(false); setCategory('General') }}
                  style={{ padding: '10px 12px', border: '1px solid #e8e8e8', borderRadius: 10, background: '#f5f5f3', cursor: 'pointer', fontSize: 14, color: '#888' }}>×</button>
              </div>
            ) : (
              <select value={category} onChange={e => { if (e.target.value === '__custom__') { setCustomCat(true); setCategory('') } else setCategory(e.target.value) }} style={inp}>
                {allCats.map(c => <option key={c} value={c}>{c}</option>)}
                <option disabled>──────────</option>
                <option value="__custom__">+ Add custom...</option>
              </select>
            )}
          </div>
          <div>
            <label style={lbl}>Commission (optional)</label>
            <input value={commission} onChange={e => setCommission(e.target.value)} placeholder="e.g. 5% commission" style={inp}/>
          </div>
        </div>

        <label style={lbl}>Description (optional)</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short product description..." rows={2} style={{ ...inp, resize: 'vertical' }}/>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 16, fontSize: 13, fontWeight: 500 }}>
          <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} style={{ width: 16, height: 16 }}/>
          Mark as Featured (shows at top)
        </label>

        {error && <div style={{ fontSize: 12, color: '#d82c0d', background: '#fff4f4', padding: '8px 12px', borderRadius: 8, marginBottom: 14 }}>{error}</div>}

        <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, fontFamily: 'inherit' }}>
          {loading ? 'Saving...' : 'Save Link'}
        </button>
      </form>
    </div>
  )
}

// ── Link row ──────────────────────────────────────────────────────────────────
function LinkRow({ link, onDelete, onToggle, onFeature }) {
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm(`Delete "${link.name}"?`)) return
    setDeleting(true)
    await supabase.from('affiliate_links').delete().eq('id', link.id)
    onDelete(link.id)
  }

  async function handleToggle() {
    await supabase.from('affiliate_links').update({ active: !link.active }).eq('id', link.id)
    onToggle(link.id, !link.active)
  }

  async function handleFeature() {
    await supabase.from('affiliate_links').update({ featured: !link.featured }).eq('id', link.id)
    onFeature(link.id, !link.featured)
  }

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f3' }}>
      <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', background: '#f5f5f3', flexShrink: 0 }}>
        {link.image
          ? <img src={link.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'}/>
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🛍️</div>
        }
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
          {link.featured && <span style={{ color: '#f5c842', fontSize: 11 }}>⭐</span>}
          {link.name}
        </div>
        <div style={{ fontSize: 10, color: '#aaa', display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ background: '#f5f5f3', padding: '2px 7px', borderRadius: '100px', fontWeight: 600 }}>{link.category}</span>
          <span>👆 {link.clicks} clicks</span>
          {link.commission && <span style={{ color: '#155724', background: '#d4edda', padding: '2px 7px', borderRadius: '100px', fontWeight: 600 }}>{link.commission}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 5, flexShrink: 0, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        <button onClick={handleFeature} style={{
          padding: '5px 8px', borderRadius: 7,
          border: `1px solid ${link.featured ? '#f5c842' : '#e8e8e8'}`,
          background: link.featured ? '#fff8e1' : '#fff',
          color: link.featured ? '#b8860b' : '#888',
          fontSize: 10, fontWeight: 700, cursor: 'pointer',
        }}>
          {link.featured ? '⭐' : '☆'}
        </button>
        <button onClick={handleToggle} style={{
          padding: '5px 8px', borderRadius: 7,
          border: `1px solid ${link.active ? '#d4edda' : '#e8e8e8'}`,
          background: link.active ? '#d4edda' : '#f5f5f3',
          color: link.active ? '#155724' : '#888',
          fontSize: 10, fontWeight: 700, cursor: 'pointer',
        }}>
          {link.active ? 'Live' : 'Off'}
        </button>
        <a href={link.url} target="_blank" rel="noreferrer" style={{ padding: '5px 8px', borderRadius: 7, border: '1px solid #e8e8e8', background: '#fff', color: '#444', fontSize: 10, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          Open
        </a>
        <button onClick={handleDelete} disabled={deleting} style={{ padding: '5px 8px', borderRadius: 7, border: '1px solid #ffa8a8', background: '#fff4f4', color: '#d82c0d', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
          {deleting ? '...' : 'Del'}
        </button>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminLinksPage() {
  const [session,  setSession]  = useState(null)
  const [links,    setLinks]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [checking, setChecking] = useState(true)
  const [sortBy,   setSortBy]   = useState('newest')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setChecking(false) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => { if (session) loadLinks() }, [session, sortBy])

  async function loadLinks() {
    setLoading(true)
    let q = supabase.from('affiliate_links').select('*')
    if (sortBy === 'newest')  q = q.order('created_at', { ascending: false })
    if (sortBy === 'popular') q = q.order('clicks', { ascending: false })
    if (sortBy === 'featured') q = q.order('featured', { ascending: false }).order('created_at', { ascending: false })
    const { data } = await q
    setLinks(data || [])
    setLoading(false)
  }

  function handleDelete(id)              { setLinks(l => l.filter(x => x.id !== id)) }
  function handleToggle(id, active)      { setLinks(l => l.map(x => x.id === id ? { ...x, active }   : x)) }
  function handleFeature(id, featured)   { setLinks(l => l.map(x => x.id === id ? { ...x, featured } : x)) }

  const savedCats = [...new Set(links.map(l => l.category).filter(c => !DEFAULT_CATS.includes(c)))]

  const totalClicks  = links.reduce((s, l) => s + (l.clicks || 0), 0)
  const topLink      = [...links].sort((a, b) => b.clicks - a.clicks)[0]

  if (checking) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f3' }}><div style={{ fontSize: 11, color: '#bbb', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Loading...</div></div>
  if (!session) return <LoginForm/>

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f3', paddingBottom: 60 }}>

      {/* Header */}
      <div style={{ background: '#1a1a1a', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>🛍️</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Link Manager</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>{session.user.email}</div>
          </div>
        </div>
        <button onClick={() => supabase.auth.signOut()} style={{ padding: '7px 14px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
          Sign Out
        </button>
      </div>

      <div style={{ padding: '20px 16px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 20 }}>
          {[
            { label: 'Total Links',   value: links.length },
            { label: 'Active',        value: links.filter(l => l.active).length },
            { label: 'Total Clicks',  value: totalClicks },
            { label: 'Featured',      value: links.filter(l => l.featured).length },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: 12, padding: 14, border: '1px solid #efefef', textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 2 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: '#aaa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Top performer */}
        {topLink && topLink.clicks > 0 && (
          <div style={{ background: '#fff8e1', border: '1px solid #f5c842', borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#b8860b', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>🏆 Top Performer</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{topLink.name}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{topLink.clicks} clicks · {topLink.category}</div>
          </div>
        )}

        {/* Add form */}
        <AddLinkForm onAdded={loadLinks} savedCats={savedCats}/>

        {/* Links list */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #efefef', padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em' }}>
              All Links ({links.length})
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ padding: '5px 10px', borderRadius: 8, border: '1px solid #e8e8e8', fontSize: 11, fontWeight: 600, outline: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>
              <option value="newest">Newest</option>
              <option value="popular">Most Clicked</option>
              <option value="featured">Featured First</option>
            </select>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 32, color: '#ccc', fontSize: 11 }}>Loading...</div>
          ) : links.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 32, color: '#ccc', fontSize: 13 }}>No links yet. Add your first one above!</div>
          ) : links.map(l => (
            <LinkRow key={l.id} link={l} onDelete={handleDelete} onToggle={handleToggle} onFeature={handleFeature}/>
          ))}
        </div>
      </div>
    </div>
  )
}
