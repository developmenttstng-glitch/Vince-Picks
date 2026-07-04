import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    function move(e) {
      el.style.left = e.clientX + 'px'
      el.style.top  = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div ref={ref} style={{
      position: 'fixed',
      width: 400, height: 400,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 0,
      transition: 'left 0.1s ease, top 0.1s ease',
    }}/>
  )
}
