import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { siteContent } from '../../content/siteContent'
import { getHomepagePath, isHomepagePath, scrollToHomepageSection, setPendingHomepageSection } from '../../utils/sectionNavigation'
import './bottom-navigation.block.css'

const ICONS: Record<string, React.ReactNode> = {
  home: <><path d="M3 10.5 8 6l5 4.5V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3.5Z"/><path d="M6.5 15v-3h3v3"/></>,
  work: <><rect x="3" y="3" width="3" height="3" rx=".5"/><rect x="10" y="3" width="3" height="3" rx=".5"/><rect x="3" y="10" width="3" height="3" rx=".5"/><rect x="10" y="10" width="3" height="3" rx=".5"/></>,
  about: <><circle cx="8" cy="5" r="2"/><path d="M4 14c.2-2.3 1.5-3.5 4-3.5s3.8 1.2 4 3.5"/></>,
  process: <><circle cx="8" cy="8" r="4.5"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4"/></>,
  contact: <><rect x="2" y="3.5" width="12" height="9" rx="1"/><path d="m2.5 4.5 5.5 4 5.5-4"/></>,
}

export function BottomNavigation() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const navRef = useRef<HTMLElement>(null)
  const homePath = getHomepagePath(pathname)

  useEffect(() => {
    const clearActive = (e: Event) => {
      if (!navRef.current?.contains(e.target as Node) && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }
    window.addEventListener('wheel', clearActive, { passive: true })
    window.addEventListener('touchstart', clearActive, { passive: true })
    return () => {
      window.removeEventListener('wheel', clearActive)
      window.removeEventListener('touchstart', clearActive)
    }
  }, [])

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    isHomepagePath(pathname) ? scrollToHomepageSection(id) : (setPendingHomepageSection(id), navigate(homePath))
  }

  return (
    <nav ref={navRef} className="bottom-navigation" aria-label={siteContent.sectionNavigationAriaLabel}>
      {siteContent.bottomNavigation.map(({ id, label, icon }) => (
        <a className="bottom-navigation__item" key={id} href={homePath} onClick={(e) => handleClick(e, id)}>
          <span className="bottom-navigation__icon">
            <svg viewBox="0 0 16 16" aria-hidden="true">{ICONS[icon ?? id]}</svg>
          </span>
          <span>{label}</span>
        </a>
      ))}
    </nav>
  )
}