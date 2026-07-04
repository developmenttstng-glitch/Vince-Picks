import { useState } from 'react'

export default function Contact({ onCopy }) {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText('vincepicks@gmail.com').then(() => {
      setCopied(true)
      onCopy('Email copied!')
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{ background: '#fff', padding: '24px 20px' }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: '#bbb', marginBottom: 14,
      }}>
        📬 Get in Touch
      </div>

      <div className="reveal" style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '16px 16px',
        border: '1px solid #efefef', borderRadius: 16,
        background: '#fff',
      }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: '#1a1a1a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, flexShrink: 0,
        }}>
          ✉️
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 10, color: '#bbb', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3,
          }}>
            Business inquiries
          </div>
          <div style={{
            fontSize: 13, fontWeight: 700,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            vincepicks@gmail.com
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button onClick={copyEmail} style={{
            padding: '8px 14px',
            background: copied ? '#1a1a1a' : '#f5f5f3',
            color: copied ? '#f5c842' : '#444',
            border: '1px solid #efefef',
            borderRadius: 9, fontSize: 12, fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.25s',
          }}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <a href="mailto:vincepicks@gmail.com" style={{
            padding: '8px 14px',
            background: '#f5c842', color: '#1a1a1a',
            border: 'none', borderRadius: 9,
            fontSize: 12, fontWeight: 700,
            cursor: 'pointer', textDecoration: 'none',
            transition: 'background 0.2s',
            display: 'flex', alignItems: 'center',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#e6b800'}
          onMouseLeave={e => e.currentTarget.style.background = '#f5c842'}>
            Email
          </a>
        </div>
      </div>
    </div>
  )
}
