import './footer.block.css'
import { motion } from 'motion/react'
import { contactContent } from '../../content/contactContent'
import { siteContent } from '../../content/siteContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionAnimation } from '../../hooks/useSectionAnimation'
import { premiumEase } from '../../utils/motionConfig'

const footerShapes = [
  'star',
  'dots',
  'arch',
  'circle',
  'slash',
  'discs',
  'triangles',
  'donut',
] as const

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
  const footerSocialLinks = siteContent.socialLinks.filter((link) => link.label.toLowerCase() !== 'email')

  return (
    <motion.footer
      className="footer-component-wrapper"
      ref={setSectionRef}
      initial={sectionInitial}
      animate={sectionControls}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: premiumEase }}
    >
      <div className="footer-card">
        <div className="footer-top-grid">
          <a className="footer-brand-lockup" href="/" aria-label={siteContent.homeAriaLabel}>
            <span>{siteContent.brandShortName}</span>
            <span>{siteContent.brandSuffix}</span>
          </a>

          <nav className="footer-link-group" aria-label={siteContent.footerSocialLabel}>
            <p>Social</p>
            {footerSocialLinks.map((link) => (
              <a href={link.href} key={link.label}>{link.label}</a>
            ))}
          </nav>

          <address className="footer-link-group footer-contact-group">
            <p>Contact</p>
            <a href={`mailto:${siteContent.email}`}>{siteContent.email}</a>
            <span>{contactContent.availability}</span>
            <span>{contactContent.location}</span>
          </address>
        </div>

        <div className="footer-shape-row" aria-hidden="true">
          {footerShapes.map((shape) => (
            <span className={`footer-shape footer-shape--${shape}`} key={shape} />
          ))}
        </div>

        <div className="footer-meta-row">
          <p>{siteContent.footerCopyright}</p>
        </div>
      </div>
    </motion.footer>
  )
}
