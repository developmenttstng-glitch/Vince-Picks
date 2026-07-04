import { useEffect, useState } from 'react'
import Hero       from './components/Hero'
import Marquee    from './components/Marquee'
import Featured   from './components/Featured'
import Showcase   from './components/Showcase'
import Videos     from './components/Videos'
import Contact    from './components/Contact'
import Footer     from './components/Footer'
import CursorGlow from './components/CursorGlow'
import Toast      from './components/Toast'

export default function App() {
  const [toast, setToast] = useState(null)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <CursorGlow/>
      <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 60, position: 'relative', zIndex: 1 }}>
        <Hero/>
        <Marquee/>
        <Featured onCopy={showToast}/>
        <div style={{ height: 8, background: '#f5f5f3' }}/>
        <Showcase/>
        <div style={{ height: 8, background: '#f5f5f3' }}/>
        <Videos/>
        <div style={{ height: 8, background: '#f5f5f3' }}/>
        <Contact onCopy={showToast}/>
        <Footer/>
      </div>
      {toast && <Toast msg={toast}/>}
    </>
  )
}
