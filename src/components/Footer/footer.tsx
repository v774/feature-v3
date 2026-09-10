import { motion } from 'motion/react'
import { contactContent } from '../../content/contactContent'
import { siteContent } from '../../content/siteContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionAnimation } from '../../hooks/useSectionAnimation'
import { premiumEase } from '../../utils/motionConfig'
import './footer.block.css'

const SHAPES = ['star', 'dots', 'arch', 'circle', 'slash', 'discs', 'triangles', 'donut']

export function Footer() {
  const reduced = useReducedMotion()
  const { setRef, controls, initial } = useSectionAnimation<HTMLElement>({ activationThreshold: 0.35, resetThreshold: 0.06 })
  const socials = siteContent.socialLinks.filter(l => l.label.toLowerCase() !== 'email')

  return (
    <motion.footer
      className="footer-component-wrapper"
      ref={setRef}
      initial={initial}
      animate={controls}
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: reduced ? 0 : 0.8, ease: premiumEase }}
    >
      <div className="footer-card">
        <div className="footer-top-grid" data-has-socials={socials.length > 0}>
          <a className="footer-brand-lockup" href="/" aria-label={siteContent.homeAriaLabel}>
            <span>{siteContent.brandShortName}</span><span>{siteContent.brandSuffix}</span>
          </a>
          
          {socials.length > 0 && (
            <nav className="footer-link-group">
              <p>Social</p>
              {socials.map(({ href, label }) => <a href={href} key={label}>{label}</a>)}
            </nav>
          )}
          
          <address className="footer-link-group footer-contact-group">
            <p>Contact</p>
            <a href={`mailto:${siteContent.email}`}>{siteContent.email}</a>
            <span>{contactContent.availability}</span>
            <span>{contactContent.location}</span>
          </address>
        </div>

        <div className="footer-shape-row" aria-hidden="true">
          {SHAPES.map(s => <span className={`footer-shape footer-shape--${s}`} key={s} />)}
        </div>

        <div className="footer-meta-row">
          <p>{siteContent.footerCopyright}</p>
        </div>
      </div>
    </motion.footer>
  )
}