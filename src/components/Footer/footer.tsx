import { motion } from 'motion/react'
import { siteContent } from '../../content/siteContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionAnimation } from '../../hooks/useSectionAnimation'
import { premiumEase } from '../../utils/motionConfig'
import { SocialIcons } from '../common/SocialIcons'
import './footer.block.css'

const SHAPES = ['star', 'dots', 'arch', 'circle', 'slash', 'discs', 'triangles', 'donut']

export function Footer() {
  const reduced = useReducedMotion()
  const { setRef, controls, initial } = useSectionAnimation<HTMLElement>({ activationThreshold: 0.35, resetThreshold: 0.06 })
  
  // Примусовий порядок соцмереж
  const order = ['Fiverr', 'Upwork', 'Telegram', 'Instagram', 'TikTok']
  const socials = siteContent.socialLinks
    .filter(l => l.label.toLowerCase() !== 'email')
    .sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label))

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
        <div className="footer-top-grid">
          
          <a className="footer-brand-lockup" href="/" aria-label={siteContent.homeAriaLabel}>
            <span>{siteContent.brandShortName}</span><span>{siteContent.brandSuffix}</span>
          </a>
          
          <address className="footer-link-group footer-contact-group">
            <p>Contact & Social</p>
            <div className="footer-contact-links">
              <a href={`mailto:${siteContent.email}`} className="footer-social-link">
                <span className="footer-social-icon text-icon" aria-hidden="true">@</span>
                <span>{siteContent.email}</span>
              </a>
              {socials.map(({ href, label }) => {
                const Icon = SocialIcons[label as keyof typeof SocialIcons]
                return (
                  <a href={href} key={label} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                    {Icon ? <Icon className="footer-social-icon" /> : <span className="footer-social-icon text-icon">{label[0]}</span>}
                    <span>{label}</span>
                  </a>
                )
              })}
            </div>
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