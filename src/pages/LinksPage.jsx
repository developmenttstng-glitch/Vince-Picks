import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const PAGE_SIZE = 12

function LinkCard({ link }) {
  const [hovered, setHovered] = useState(false)

  async function handleClick() {
    // Increment click count then navigate
    await supabase
      .from('affiliate_links')
      .update({ clicks: link.clicks + 1 })
      .eq('id', link.id)
    window.open(link.url, '_blank', 'noreferrer')
  }

  return (
    <div
      onClick={handleClick}
      style={{
        background: '#fff',
        border: `1px solid ${hovered ? '#f5c842' : '#efefef'}`,
        borderRadius: 16, overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(245,200,66,0.15)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Featured badge */}
      {link.featured && (
        <div style={{
          position: 'absolute', top: 10, left: 10, zIndex: 2,
          background: '#f5c842', color: '#1a1a1a',
          fontSize: 9, fontWeight: 800,
          padding: '3px 8px', borderRadius: '100px',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          ⭐ Featured
        </div>
      )}

      {/* Image */}
      <div style={{
        height: 140, background: '#f5f5f3',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', position: 'relative',
      }}>
        {link.image ? (
          <img src={link.image} alt={link.name}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}/>
        ) : (
          <div style={{
            fontSize: 40,
            transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1)',
            transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            🛍️
          </div>
        )}

        {/* Hover overlay */}
        <div style={{
  position: 'absolute', inset: 0,
  background: hovered ? 'rgba(0,0,0,0.15)' : 'transparent',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  opacity: hovered ? 1 : 0,
  transition: 'opacity 0.2s',
  backdropFilter: hovered ? 'blur(2px)' : 'none',
}}>
          <div style={{
            background: '#f5c842', color: '#1a1a1a',
            padding: '8px 16px', borderRadius: '100px',
            fontSize: 11, fontWeight: 800,
            transform: hovered ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.9)',
            transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          }}>
            Shop Now →
          </div>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: '#aaa',
            background: '#f5f5f3', padding: '2px 7px', borderRadius: '100px',
          }}>
            {link.category}
          </span>
          {link.commission && (
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', color: '#155724',
              background: '#d4edda', padding: '2px 7px', borderRadius: '100px',
            }}>
              {link.commission}
            </span>
          )}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 4, lineHeight: 1.4 }}>
          {link.name}
        </div>

        {link.description && (
          <div style={{
            fontSize: 11, color: '#aaa', lineHeight: 1.5, marginBottom: 8,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {link.description}
          </div>
        )}

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: 10, color: '#ccc', fontWeight: 500 }}>
            {link.clicks} click{link.clicks !== 1 ? 's' : ''}
          </div>
          <div style={{
            fontSize: 11, fontWeight: 700,
            color: hovered ? '#1a1a1a' : '#bbb',
            transition: 'color 0.2s',
          }}>
            View →
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LinksPage() {
  const [links,   setLinks]   = useState([])
  const [loading, setLoading] = useState(true)
  const [cat,     setCat]     = useState('All')
  const [search,  setSearch]  = useState('')
  const [sort,    setSort]    = useState('featured')
  const [cats,    setCats]    = useState(['All'])
  const [page,    setPage]    = useState(1)
  const [total,   setTotal]   = useState(0)

  useEffect(() => {
    supabase
      .from('affiliate_links')
      .select('category')
      .eq('active', true)
      .then(({ data }) => {
        if (!data) return
        const unique = [...new Set(data.map(l => l.category))].sort()
        setCats(['All', ...unique])
      })
  }, [])

  useEffect(() => { setPage(1) }, [cat, search, sort])
  useEffect(() => { load() }, [cat, search, sort, page])

  async function load() {
    setLoading(true)
    let q = supabase
      .from('affiliate_links')
      .select('*', { count: 'exact' })
      .eq('active', true)
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

    if (cat !== 'All') q = q.eq('category', cat)
    if (search.trim()) q = q.ilike('name', `%${search.trim()}%`)

    if (sort === 'featured') q = q.order('featured', { ascending: false }).order('created_at', { ascending: false })
    else if (sort === 'popular') q = q.order('clicks', { ascending: false })
    else if (sort === 'newest') q = q.order('created_at', { ascending: false })

    const { data, count, error } = await q
    if (!error) { setLinks(data || []); setTotal(count || 0) }
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
        <Link to="/" style={{
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
          🛍️ Affiliate Links
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 4 }}>
          Vince Picks Shop
        </div>
        <div style={{ fontSize: 13, color: '#aaa', marginBottom: 20 }}>
          All my recommended products — curated & tested
        </div>

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{
            width: '100%', maxWidth: 360,
            padding: '10px 16px', borderRadius: '100px',
            border: '1px solid #e8e8e8', background: '#f5f5f3',
            fontSize: 13, outline: 'none', fontFamily: 'inherit',
          }}
        />
      </div>

      {/* Filters row */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #efefef',
        padding: '10px 16px',
        display: 'flex', gap: 6, overflowX: 'auto',
        scrollbarWidth: 'none', alignItems: 'center',
      }}>
        {/* Category pills */}
        <div style={{ display: 'flex', gap: 6, flex: 1, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '6px 14px', borderRadius: '100px', flexShrink: 0,
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

        {/* Sort */}
        <select value={sort} onChange={e => setSort(e.target.value)} style={{
          padding: '6px 12px', borderRadius: '100px',
          border: '1px solid #e8e8e8', background: '#fff',
          fontSize: 11, fontWeight: 600, cursor: 'pointer',
          flexShrink: 0, outline: 'none', fontFamily: 'inherit',
          color: '#666',
        }}>
          <option value="featured">Featured</option>
          <option value="popular">Most Clicked</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Grid */}
      <div style={{ padding: '20px 16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: '#ccc' }}>
            <div style={{ fontSize: 32, marginBottom: 12, animation: 'spin 1s linear infinite', display: 'inline-block' }}>◈</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Loading...</div>
          </div>
        ) : links.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.2 }}>🛍️</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>No products found</div>
            <div style={{ fontSize: 12, color: '#aaa' }}>
              {search ? `No results for "${search}"` : 'No products in this category yet'}
            </div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 11, color: '#ccc', marginBottom: 14, fontWeight: 500 }}>
              {total} product{total !== 1 ? 's' : ''}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
              {links.map(l => <LinkCard key={l.id} link={l}/>)}
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
          </>
        )}
      </div>
    </div>
  )
}
