import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { siteContent } from '../../content/siteContent'
import { getHomepagePath, isHomepagePath, scrollToHomepageSection, setPendingHomepageSection } from '../../utils/sectionNavigation'
import './bottom-navigation.block.css'

type NavigationItem = { id: string; label: string; icon: string }

function NavigationIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    home: <><path d="M3 10.5 8 6l5 4.5V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3.5Z"/><path d="M6.5 15v-3h3v3"/></>,
    work: <><rect x="3" y="3" width="3" height="3" rx=".5"/><rect x="10" y="3" width="3" height="3" rx=".5"/><rect x="3" y="10" width="3" height="3" rx=".5"/><rect x="10" y="10" width="3" height="3" rx=".5"/></>,
    about: <><circle cx="8" cy="5" r="2"/><path d="M4 14c.2-2.3 1.5-3.5 4-3.5s3.8 1.2 4 3.5"/></>,
    process: <><circle cx="8" cy="8" r="4.5"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4"/></>,
    testimonials: <><path d="M3 4.5h10v6H7l-3 2v-2H3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z"/><path d="M5 7h6"/></>,
    faq: <><circle cx="8" cy="8" r="6"/><path d="M6.5 6a1.5 1.5 0 1 1 2.2 1.3c-.5.3-.7.6-.7 1.2M8 11.5h.01"/></>,
    contact: <><rect x="2" y="3.5" width="12" height="9" rx="1"/><path d="m2.5 4.5 5.5 4 5.5-4"/></>,
  }

  return <svg viewBox="0 0 16 16" aria-hidden="true">{paths[name]}</svg>
}

export function BottomNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const navigationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const clearActiveItem = (event: Event) => {
      if (navigationRef.current?.contains(event.target as Node)) return
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    }

    window.addEventListener('wheel', clearActiveItem, { passive: true })
    window.addEventListener('touchstart', clearActiveItem, { passive: true })
    return () => {
      window.removeEventListener('wheel', clearActiveItem)
      window.removeEventListener('touchstart', clearActiveItem)
    }
  }, [])

  const handleNavigationClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    if (isHomepagePath(location.pathname)) {
      scrollToHomepageSection(id)
      return
    }
    setPendingHomepageSection(id)
    navigate(getHomepagePath(location.pathname))
  }

  const navigationItems: NavigationItem[] = siteContent.bottomNavigation.map((item) => ({
    id: item.id,
    label: item.label,
    icon: item.icon ?? item.id,
  }))

  return (
    <nav ref={navigationRef} className="bottom-navigation" aria-label={siteContent.sectionNavigationAriaLabel}>
      {navigationItems.map((item) => (
        <a className="bottom-navigation__item" onClick={(event) => handleNavigationClick(event, item.id)} href={getHomepagePath(location.pathname)} key={item.id}>
          <span className="bottom-navigation__icon"><NavigationIcon name={item.icon} /></span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
