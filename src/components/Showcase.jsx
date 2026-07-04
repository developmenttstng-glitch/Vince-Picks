import { useState } from 'react'

const PRODUCTS = [
  { emoji: '🧺', name: 'Yellow Basket',          category: 'Home',         tag: '⭐ Top Pick' },
  { emoji: '🐟', name: 'Fish Tank Essentials',   category: 'Fish Keeping', tag: null },
  { emoji: '🚗', name: 'Car Organizer',           category: 'Car',          tag: '🔥 Hot' },
  { emoji: '🧹', name: 'Cleaning Accessories',    category: 'Home',         tag: null },
  { emoji: '🔦', name: 'LED Car Light Strip',     category: 'Car',          tag: '💡 Useful' },
  { emoji: '🐠', name: 'Aquarium Decoration Set', category: 'Fish Keeping', tag: null },
]

const CATS = ['All', 'Home', 'Car', 'Fish Keeping']

function ProductCard({ p, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a href="https://vt.tiktok.com/ZSCVQQaRP/?page=TikTokShop"
      target="_blank" rel="noreferrer"
      className="reveal"
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        border: `1px solid ${hovered ? '#f5c842' : '#efefef'}`,
        borderRadius: 14, overflow: 'hidden',
        background: '#fff',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(245,200,66,0.15)' : 'none',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        transitionDelay: `${index * 0.04}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div style={{
        height: 110,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        fontSize: 44,
        transition: 'background 0.2s',
        background: hovered ? '#fff8e1' : '#f5f5f3',
      }}>
        <span style={{
          transform: hovered ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0)',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          display: 'inline-block',
        }}>
          {p.emoji}
        </span>
        {p.tag && (
          <div style={{
            position: 'absolute', top: 8, left: 8,
            background: '#1a1a1a', color: p.tag.includes('⭐') ? '#f5c842' : '#fff',
            fontSize: 9, fontWeight: 800,
            padding: '3px 8px', borderRadius: '100px',
            letterSpacing: '0.06em',
          }}>
            {p.tag}
          </div>
        )}
      </div>

      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontSize: 10, color: '#aaa', fontWeight: 600, marginBottom: 3, letterSpacing: '0.04em' }}>
          {p.category}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>
          {p.name}
        </div>
        <div style={{
          fontSize: 11, fontWeight: 700,
          color: hovered ? '#1a1a1a' : '#888',
          display: 'flex', alignItems: 'center', gap: 4,
          transition: 'color 0.2s',
        }}>
          Shop Now {hovered ? '→' : '›'}
        </div>
      </div>
    </a>
  )
}

export default function Showcase() {
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat)

  return (
    <div style={{ background: '#fff', padding: '24px 20px' }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: '#bbb', marginBottom: 14,
      }}>
        🛒 My TikTok Showcase
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: '6px 14px', borderRadius: '100px',
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        {filtered.map((p, i) => <ProductCard key={p.name} p={p} index={i}/>)}
      </div>

      <a href="https://vt.tiktok.com/ZSCVQQaRP/?page=TikTokShop"
        target="_blank" rel="noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '13px',
          background: '#f5c842', color: '#1a1a1a',
          border: 'none', borderRadius: 14,
          fontSize: 13, fontWeight: 700,
          textDecoration: 'none',
          transition: 'background 0.2s, transform 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#e6b800'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = '#f5c842'
          e.currentTarget.style.transform = 'translateY(0)'
        }}>
        <span>🛍</span>
        Browse Full Showcase on TikTok Shop →
      </a>
    </div>
  )
}
