const ITEMS = [
  '🧺 Yellow Basket', '🐟 Fish Keeper', '🚗 Car Accessories',
  '💡 Useful Finds', '💰 Affiliate Tips', '✦ Vince Picks',
  '🧺 Yellow Basket', '🐟 Fish Keeper', '🚗 Car Accessories',
  '💡 Useful Finds', '💰 Affiliate Tips', '✦ Vince Picks',
]

export default function Marquee() {
  return (
    <div style={{
      background: '#1a1a1a',
      padding: '11px 0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    }}>
      <div style={{
        display: 'inline-block',
        animation: 'marquee 18s linear infinite',
      }}>
        {ITEMS.map((item, i) => (
          <span key={i} style={{
            display: 'inline-block',
            fontSize: 11, fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: i % 6 === 5 ? '#f5c842' : 'rgba(255,255,255,0.5)',
            padding: '0 24px',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
