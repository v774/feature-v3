import './footer.block.css'
import { motion } from 'motion/react'
import { siteContent } from '../../content/siteContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionAnimation } from '../../hooks/useSectionAnimation'
import { premiumEase } from '../../utils/motionConfig'

export function Footer() {
  const prefersReducedMotion = useReducedMotion()
  const {
    setRef: setSectionRef,
    controls: sectionControls,
    initial: sectionInitial,
  } = useSectionAnimation<HTMLElement>({
    activationThreshold: 0.35,
    resetThreshold: 0.06,
  })

  return (
    <motion.footer
      className="footer-component-wrapper"
      ref={setSectionRef}
      initial={sectionInitial}
      animate={sectionControls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
    >
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-block">
            <a className="footer-brand-logo" href="/" aria-label={siteContent.homeAriaLabel}>
              <b>{siteContent.brandShortName}</b>
              <span>{siteContent.brandSuffix}</span>
            </a>
            <p className="footer-brand-subtext">{siteContent.footerTagline}</p>
          </div>

          <div className="footer-right-group">
            <a className="footer-email-badge" href={`mailto:${siteContent.email}`}>{siteContent.email}</a>
            <nav className="footer-social-links" aria-label={siteContent.footerSocialLabel}>
              {siteContent.socialLinks.map((link) => (
                <a href={link.href} key={link.label}>{link.label}</a>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p>{siteContent.footerCopyright}</p>
        </div>
      </div>
    </motion.footer>
  )
}
