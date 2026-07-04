import { useEffect, useState } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import Hero           from './components/Hero'
import Marquee        from './components/Marquee'
import Featured       from './components/Featured'
import Showcase       from './components/Showcase'
import Videos         from './components/Videos'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import CursorGlow     from './components/CursorGlow'
import Toast          from './components/Toast'
import VlogPage       from './pages/VlogPage'
import AdminPage      from './pages/AdminPage'
import LinksPage      from './pages/LinksPage'
import AdminLinksPage from './pages/AdminLinksPage'

function HomePage({ showToast }) {
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
      <Hero/>
      <Marquee/>
      <Featured onCopy={showToast}/>
      <div style={{ height: 8, background: '#f5f5f3' }}/>
      <Showcase/>
      <div style={{ height: 8, background: '#f5f5f3' }}/>
      <Videos/>
      <div style={{ height: 8, background: '#f5f5f3' }}/>

      {/* Quick nav to Vlog + Shop */}
      <div style={{ background: '#fff', padding: '20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link to="/links" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px', background: '#f5c842', borderRadius: 16,
          textDecoration: 'none', transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: 2 }}>
              All Affiliate Products
            </div>
            <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.5)' }}>
              Browse everything I recommend
            </div>
          </div>
          <div style={{ fontSize: 24 }}>🛍️ →</div>
        </Link>

        <Link to="/vlog" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px', background: '#1a1a1a', borderRadius: 16,
          textDecoration: 'none', transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 2 }}>
              Browse All Videos
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
              Fish · Car · Tips · Hauls
            </div>
          </div>
          <div style={{ fontSize: 24, color: '#f5c842' }}>🎬 →</div>
        </Link>
      </div>

      <div style={{ height: 8, background: '#f5f5f3' }}/>
      <Contact onCopy={showToast}/>
      <Footer/>
    </>
  )
}

export default function App() {
  const [toast,  setToast]  = useState(null)
  const location = useLocation()

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const isHome = location.pathname === '/'

  return (
    <>
      {isHome && <CursorGlow/>}
      <div style={{
        maxWidth: isHome ? 480 : '100%',
        margin: '0 auto',
        paddingBottom: isHome ? 60 : 0,
        position: 'relative', zIndex: 1,
      }}>
        <Routes>
          <Route path="/"             element={<HomePage showToast={showToast}/>}/>
          <Route path="/vlog"         element={<VlogPage/>}/>
          <Route path="/links"        element={<LinksPage/>}/>
          <Route path="/admin"        element={<AdminPage/>}/>
          <Route path="/admin/links"  element={<AdminLinksPage/>}/>
        </Routes>
      </div>
      {toast && <Toast msg={toast}/>}
    </>
  )
}
