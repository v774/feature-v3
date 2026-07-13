import './footer.block.css'
import { useTranslation } from '../../translations/useTranslation'

type SocialLink = {
  label: string
  href: string
}

const socialLinks: SocialLink[] = [
  { label: 'Behance', href: 'https://behance.net' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Email', href: 'mailto:hello@example.com' },
]

export function Footer() {
  const { t } = useTranslation()
  const copy = t.sections.footer
  return (
    <footer className="footer-component-wrapper">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand-block">
            <a className="footer-brand-logo" href="/" aria-label="VL Motion home">
              <b>VL</b>
              <span>motion</span>
            </a>
            <p className="footer-brand-subtext">{copy.tagline}</p>
          </div>

          <div className="footer-right-group">
            <a className="footer-email-badge" href="mailto:hello@example.com">hello@example.com</a>
            <nav className="footer-social-links" aria-label={copy.socialLinks}>
              {socialLinks.map((link) => (
                <a href={link.href} key={link.label}>{link.label}</a>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p>{copy.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
