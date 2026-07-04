import { useState } from 'react'

const LINKS = [
  {
    icon: '🐟', bg: '#e8f4fd',
    name: 'Fish Keeping Essentials',
    sub: 'Tanks, filters, food & accessories',
    url: 'https://www.tiktok.com/@vincelayug20',
    color: '#2196f3',
  },
  {
    icon: '🚗', bg: '#fff8e1',
    name: 'Affordable Car Accessories',
    sub: 'Best finds for your car',
    url: 'https://www.tiktok.com/@vincelayug20',
    color: '#f5c842',
  },
  {
    icon: '💡', bg: '#f0fff4',
    name: 'Cheap & Useful Items',
    sub: 'Hidden gems under budget',
    url: 'https://www.tiktok.com/@vincelayug20',
    color: '#4caf50',
  },
  {
    icon: '💰', bg: '#fce4ec',
    name: 'Affiliate Tips & Tricks',
    sub: 'How I earn as a TikTok creator',
    url: 'https://www.tiktok.com/@vincelayug20',
    color: '#e91e63',
  },
]

function LinkCard({ link, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a href={link.url} target="_blank" rel="noreferrer"
      className="reveal"
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '13px 14px',
        border: `1px solid ${hovered ? link.color + '44' : '#efefef'}`,
        borderRadius: 14,
        textDecoration: 'none', color: 'inherit',
        marginBottom: 8,
        background: hovered ? link.bg : '#fff',
        transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        transitionDelay: `${index * 0.04}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: link.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, flexShrink: 0,
        transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {link.icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 2 }}>
          {link.name}
        </div>
        <div style={{ fontSize: 11, color: '#aaa' }}>
          {link.sub}
        </div>
      </div>

      <div style={{
        color: hovered ? link.color : '#d0d0d0',
        fontSize: 18,
        transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        transition: 'all 0.2s',
      }}>
        ›
      </div>
    </a>
  )
}

export default function Links() {
  return (
    <div style={{ background: '#fff', padding: '24px 20px' }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: '#bbb', marginBottom: 14,
      }}>
        🛍 Shop My Picks
      </div>
      {LINKS.map((link, i) => (
        <LinkCard key={i} link={link} index={i}/>
      ))}
    </div>
  )
}
