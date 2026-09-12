import { type FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { contactContent as copy } from '../../content/contactContent'
import { siteContent } from '../../content/siteContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionAnimation } from '../../hooks/useSectionAnimation'
import { premiumEase } from '../../utils/motionConfig'
import { SocialIcons } from '../common/SocialIcons'
import './contact.block.css'

declare const process: any

const formKey = (import.meta.env.VITE_FORM_KEY || (typeof process !== 'undefined' && process.env?.VITE_FORM_KEY) || '').trim()
const submitUrl = 'https://api.web3forms.com/submit'
const sanitize = (v: string) => String(v).replace(/\r\n?/g, '\n').replace(/\\/g, '\\\\').trim()

export function Contact() {
  const reduced = useReducedMotion()
  const { setRef, controls, initial } = useSectionAnimation<HTMLElement>({ activationThreshold: 0.4, resetThreshold: 0.08, minCycleMs: 1400 })
  
  const [{ name, email, project_type, budget, message }, setForm] = useState({ name: '', email: '', project_type: '', budget: '', message: '' })
  const [status, setStatus] = useState({ submitting: false, submitted: false, message: '', resetCount: 0 })
  const textRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const resize = () => {
      if (!textRef.current) return
      textRef.current.style.height = 'auto'
      textRef.current.style.height = `${textRef.current.scrollHeight}px`
      textRef.current.style.overflowY = 'hidden'
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [message])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formKey) return setStatus(s => ({ ...s, message: copy.unavailableMessage }))
    if (!sanitize(message)) return setStatus(s => ({ ...s, message: copy.emptyMessage }))

    setStatus(s => ({ ...s, submitting: true, submitted: false, message: '' }))
    
    try {
      const fd = new FormData()
      fd.append('access_key', formKey)
      fd.append('name', sanitize(name))
      fd.append('email', sanitize(email))
      fd.append('project_type', sanitize(project_type) || 'Not specified')
      fd.append('budget', sanitize(budget) || 'Not specified')
      fd.append('message', sanitize(message))

      const res = await fetch(submitUrl, { method: 'POST', body: fd })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || !data.success) throw new Error(data.message || 'Error')
      
      setForm({ name: '', email: '', project_type: '', budget: '', message: '' })
      setStatus(s => ({ ...s, submitting: false, submitted: true, message: '' }))
    } catch {
      setStatus(s => ({ ...s, submitting: false, submitted: false, message: copy.failureMessage }))
    }
  }

  const groupVars = { hidden: { opacity: 0, y: 34, scale: 0.99 }, visible: { opacity: 1, y: 0, scale: 1 } }
  

  return (
    <section className="contact-section-wrapper" id="contact" aria-labelledby="contact-title" ref={setRef}>
      <motion.div className="contact-section-wrapper__watermark" aria-hidden="true" initial={initial} animate={controls} variants={{ hidden: { opacity: 0, y: 34, scaleY: 0.92 }, visible: { opacity: 1, y: 0, scaleY: 1 } }} transition={{ duration: reduced ? 0 : 0.95, ease: premiumEase }}>
        <span>CONTACT</span>
        <motion.span className="contact-section-wrapper__watermark-sweep" variants={{ hidden: { opacity: 0, x: '-80%' }, visible: { opacity: [0, 0.34, 0], x: ['-80%', '160%', '360%'] } }} transition={{ duration: reduced ? 0 : 1.25, delay: reduced ? 0 : 0.78, ease: premiumEase }} />
      </motion.div>

      <div className="contact-section-wrapper__container">
        <div className="contact-section-wrapper__workspace">
          <motion.div className="contact-section-wrapper__content" initial={initial} animate={controls} variants={groupVars} transition={{ duration: reduced ? 0 : 0.72, ease: premiumEase }}>
            <p className="contact-section-wrapper__section-eyebrow">{copy.eyebrow}</p>
            <h2 id="contact-title">{copy.heading}</h2>
            <p className="contact-section-wrapper__section-description">{copy.description}</p>
            
            <div className="contact-section-wrapper__cards">
  {[
    { icon: '@', label: copy.emailCardLabel, val: copy.emailAddress, href: `mailto:${copy.emailAddress}` },
    ...siteContent.socialLinks
      .filter(link => link.label.toLowerCase() !== 'email')
      .map(link => ({
        icon: link.label,
        label: link.label,
        val: link.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
        href: link.href
      }))
  ].map(item => {
    const Icon = item.icon !== '@' ? SocialIcons[item.icon as keyof typeof SocialIcons] : null

    return (
      <article className="contact-section-wrapper__detail-card" key={item.label}>
        <span className="contact-section-wrapper__icon-box" aria-hidden="true">
          {Icon ? <Icon style={{ width: '22px', height: '22px' }} /> : item.icon}
        </span>
        <div className="contact-section-wrapper__card-text">
          <p className="contact-section-wrapper__card-label">{item.label}</p>
          <a 
            href={item.href} 
            target={item.icon !== '@' ? '_blank' : undefined} 
            rel={item.icon !== '@' ? 'noopener noreferrer' : undefined}
          >
            {item.val}
          </a>
        </div>
        <span className="contact-section-wrapper__card-arrow" aria-hidden="true" />
      </article>
    )
  })}
</div>
        
          </motion.div>

          <AnimatePresence mode="wait">
            {status.submitted ? (
              <motion.div 
                key="success"
                className="contact-section-wrapper__form contact-success-wrapper" 
                role="status" 
                initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }} 
                animate={{ opacity: 1, y: 0, scale: 1 }} 
                exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }} 
                transition={{ duration: reduced ? 0 : 0.35, ease: premiumEase }}
              >
                <div className="contact-success-icon" aria-hidden="true">OK</div>
                <h3 className="contact-success-title">{copy.successHeading}</h3>
                <p className="contact-success-message">{copy.successMessage}</p>
                <button 
                  className="contact-success-reset-btn" 
                  onClick={() => setStatus(s => ({ ...s, submitting: false, submitted: false, message: '', resetCount: s.resetCount + 1 }))}
                >
                  {copy.resetButton}
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                action={submitUrl} 
                method="POST" 
                id="contact-form" 
                className="contact-section-wrapper__form" 
                onSubmit={handleSubmit} 
                initial={status.resetCount > 0 ? "hidden" : initial} 
                animate={status.resetCount > 0 ? "visible" : controls} 
                exit="hidden"
                variants={groupVars} 
                transition={{ duration: reduced ? 0 : 0.76, delay: reduced ? 0 : 0.12, ease: premiumEase }}
              >
                <input type="hidden" name="access_key" value={formKey} />
                <label className="contact-section-wrapper__field">
                  <span>{copy.name} <b aria-hidden="true">*</b></span>
                  <input type="text" name="name" placeholder={copy.name} required value={name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </label>
                <label className="contact-section-wrapper__field">
                  <span>{copy.email} <b aria-hidden="true">*</b></span>
                  <input type="email" name="email" placeholder={copy.email} required value={email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </label>
                
                <label className="contact-section-wrapper__field contact-section-wrapper__field--message">
                  <span>{copy.message} <b aria-hidden="true">*</b></span>
                  <textarea ref={textRef} className="message-textarea" name="message" placeholder={copy.message} rows={5} required value={message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </label>

                <motion.button className="contact-section-wrapper__submit" type="submit" disabled={status.submitting} whileTap={reduced ? undefined : { scale: 0.985 }}>
                  {status.submitting ? copy.sending : copy.send}
                </motion.button>
                <p className="contact-section-wrapper__disclaimer">{copy.disclaimer}</p>

                <AnimatePresence>
                  {status.message && (
                    <motion.p role="status" initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? undefined : { opacity: 0, y: 8 }} transition={{ duration: reduced ? 0 : 0.28, ease: premiumEase }}>{status.message}</motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}