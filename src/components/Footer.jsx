export default function Footer() {
  return (
    <div style={{
      background: '#fff',
      borderTop: '1px solid #efefef',
      padding: '28px 24px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 22, marginBottom: 10,
        animation: 'float 3s ease-in-out infinite',
        display: 'inline-block',
      }}>
        🧺
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 4 }}>
        Vince Picks
      </div>
      <div style={{ fontSize: 11, color: '#bbb', lineHeight: 1.7 }}>
        @vincelayug20 · TikTok Affiliate Creator<br/>
        Fish Keeper · Car Accessories · Useful Finds
      </div>
      <div style={{
        marginTop: 16, fontSize: 10, color: '#ddd',
        letterSpacing: '0.08em',
      }}>
        Made with ✦ for TikTok
      </div>
    </div>
  )
}
