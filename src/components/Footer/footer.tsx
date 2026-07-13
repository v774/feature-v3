import './footer.block.css'
import { siteContent } from '../../content/siteContent'

export function Footer() {
  return (
    <footer className="footer-component-wrapper">
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
    </footer>
  )
}
