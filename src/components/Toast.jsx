export default function Toast({ msg }) {
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%',
      transform: 'translateX(-50%)',
      background: '#1a1a1a', color: '#fff',
      padding: '11px 22px',
      borderRadius: '100px',
      fontSize: 13, fontWeight: 600,
      zIndex: 9999,
      animation: 'slideIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ color: '#f5c842', marginRight: 8 }}>✓</span>
      {msg}
    </div>
  )
}
