import './contact.block.css'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { contactContent } from '../../content/contactContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionAnimation } from '../../hooks/useSectionAnimation'
import { useScrambleText } from '../../hooks/useScrambleText'
import { premiumEase } from '../../utils/motionConfig'

declare const process: { env?: { VITE_FORM_KEY?: string } } | undefined

const formKey = (
  import.meta.env.VITE_FORM_KEY
  || (typeof process !== 'undefined' && process.env?.VITE_FORM_KEY)
  || ''
).trim()
const submitUrl = 'https://app.web3forms.com/'

type ContactFormData = {
  name: string
  email: string
  project_type: string
  budget: string
  message: string
}

type Web3FormsResponse = {
  success?: boolean
  message?: string
  [key: string]: unknown
}

const sanitizeText = (value: string) =>
  String(value)
    .replace(/\r\n?/g, '\n')
    .replace(/\\/g, '\\\\')
    .trim()

export function Contact() {
  const prefersReducedMotion = useReducedMotion()
  const {
    setRef: setSectionRef,
    controls: sectionControls,
    initial: sectionInitial,
    isActive: isSectionActive,
  } = useSectionAnimation<HTMLElement>({
    activationThreshold: 0.32,
    resetThreshold: 0.04,
    minCycleMs: 1400,
  })
  const copy = contactContent
  const shouldAnimateHeading = !prefersReducedMotion && isSectionActive
  const { displayed: headingText, done: headingDone } = useScrambleText(copy.heading, 150, shouldAnimateHeading)
  const visibleHeading = prefersReducedMotion ? copy.heading : headingText
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    project_type: '',
    budget: '',
    message: '',
  })
  const [openMenu, setOpenMenu] = useState<'project' | 'budget' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [isMobileMotion, setIsMobileMotion] = useState(false)
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeMessageTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useEffect(() => {
    const textarea = messageTextareaRef.current
    if (!textarea) return
    const resize = () => resizeMessageTextarea(textarea)
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const updateMotionMode = () => setIsMobileMotion(mediaQuery.matches)
    updateMotionMode()
    mediaQuery.addEventListener('change', updateMotionMode)
    return () => mediaQuery.removeEventListener('change', updateMotionMode)
  }, [])

  const selectOption = (type: 'project' | 'budget', value: string) => {
    setFormData((current) => ({
      ...current,
      [type === 'project' ? 'project_type' : 'budget']: value,
    }))
    setOpenMenu(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitMessage('')

    if (!formKey) {
      if (import.meta.env.DEV) {
        console.error('VITE_FORM_KEY is missing; refusing to submit the contact form.')
      }
      setSubmitMessage(copy.unavailableMessage)
      return
    }

    setIsSubmitting(true)
    try {
      const safeFields = {
        name: sanitizeText(formData.name),
        email: sanitizeText(formData.email),
        projectType: sanitizeText(formData.project_type) || 'Not specified',
        budget: sanitizeText(formData.budget) || 'Not specified',
        message: sanitizeText(formData.message),
      }

      if (!safeFields.message) {
        setSubmitMessage(copy.emptyMessage)
        return
      }

      const submitFormData = new FormData()
      submitFormData.append('access_key', formKey)
      submitFormData.append('name', safeFields.name)
      submitFormData.append('email', safeFields.email)
      submitFormData.append('project_type', safeFields.projectType)
      submitFormData.append('budget', safeFields.budget)
      submitFormData.append('message', safeFields.message)

      const response = await fetch(submitUrl, { method: 'POST', body: submitFormData })
      const result = await response.json().catch((parseError): Web3FormsResponse => ({
        success: false,
        message: 'Web3Forms returned an unreadable response.',
        parseError,
      })) as Web3FormsResponse

      if (!response.ok || !result.success) {
        if (import.meta.env.DEV) {
          console.error('Web3Forms Error Details:', {
            status: response.status,
            statusText: response.statusText,
            ...result,
          })
        }
        throw new Error(result.message || `Form submission failed with status ${response.status}`)
      }

      setFormData({ name: '', email: '', project_type: '', budget: '', message: '' })
      setIsSubmitted(true)
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Contact form submission failed:', error)
      }
      setSubmitMessage(copy.failureMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetContactForm = () => {
    setFormData({ name: '', email: '', project_type: '', budget: '', message: '' })
    setSubmitMessage('')
    setIsSubmitted(false)
  }

  const fieldInitial = prefersReducedMotion ? false : { opacity: 0, y: 16 }
  const fieldVisible = { opacity: 1, y: 0 }
  const fieldTransition = (index: number) => ({
    duration: prefersReducedMotion ? 0 : 0.56,
    delay: prefersReducedMotion ? 0 : 0.1 + index * 0.055,
    ease: premiumEase,
  })

  const contactForm = (
    <motion.form
      id="contact-form"
      className="contact-section-wrapper__form"
      action={submitUrl}
      method="post"
      onSubmit={handleSubmit}
      initial={prefersReducedMotion ? false : { opacity: 0, y: isMobileMotion ? 26 : 34, scale: 0.985 }}
      animate={sectionControls}
      variants={{
        hidden: { opacity: 0, y: isMobileMotion ? 26 : 34, scale: 0.985 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
      }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.74, delay: prefersReducedMotion ? 0 : 0.12, ease: premiumEase }}
    >
      <motion.label initial={fieldInitial} animate={sectionControls} variants={{ hidden: fieldInitial || {}, visible: fieldVisible }} transition={fieldTransition(0)}>
        <span>{copy.name} <b>*</b></span>
        <input type="text" name="name" placeholder={copy.name} autoComplete="name" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
      </motion.label>
      <motion.label initial={fieldInitial} animate={sectionControls} variants={{ hidden: fieldInitial || {}, visible: fieldVisible }} transition={fieldTransition(1)}>
        <span>{copy.email} <b>*</b></span>
        <input type="email" name="email" placeholder={copy.email} autoComplete="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
      </motion.label>
      <motion.div className={`contact-section-wrapper__select-field${openMenu === 'project' ? ' is-open' : ''}`} initial={fieldInitial} animate={sectionControls} variants={{ hidden: fieldInitial || {}, visible: fieldVisible }} transition={fieldTransition(2)}>
        <span>{copy.projectType}</span>
        <input type="hidden" name="projectType" value={formData.project_type} />
        <button className="contact-section-wrapper__select-trigger" type="button" aria-expanded={openMenu === 'project'} onClick={() => setOpenMenu(openMenu === 'project' ? null : 'project')}>
          {formData.project_type || copy.projectType} <span aria-hidden="true">⌄</span>
        </button>
        {openMenu === 'project' && <div className="contact-section-wrapper__select-menu">{copy.projectTypes.map((option) => <button type="button" key={option} onClick={() => selectOption('project', option)}>{option}</button>)}</div>}
      </motion.div>
      <motion.div className={`contact-section-wrapper__select-field${openMenu === 'budget' ? ' is-open' : ''}`} initial={fieldInitial} animate={sectionControls} variants={{ hidden: fieldInitial || {}, visible: fieldVisible }} transition={fieldTransition(3)}>
        <span>{copy.budget}</span>
        <input type="hidden" name="budget" value={formData.budget} />
        <button className="contact-section-wrapper__select-trigger" type="button" aria-expanded={openMenu === 'budget'} onClick={() => setOpenMenu(openMenu === 'budget' ? null : 'budget')}>
          {formData.budget || copy.budget} <span aria-hidden="true">⌄</span>
        </button>
        {openMenu === 'budget' && <div className="contact-section-wrapper__select-menu">{copy.budgets.map((option) => <button type="button" key={option} onClick={() => selectOption('budget', option)}>{option}</button>)}</div>}
      </motion.div>
      <motion.label initial={fieldInitial} animate={sectionControls} variants={{ hidden: fieldInitial || {}, visible: fieldVisible }} transition={fieldTransition(4)}>
        <span>{copy.message} <b>*</b></span>
        <textarea ref={messageTextareaRef} className="message-textarea" name="message" placeholder={copy.message} autoComplete="off" rows={1} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} onInput={(event) => resizeMessageTextarea(event.currentTarget)} required />
      </motion.label>
      <motion.button
        className="contact-section-wrapper__submit"
        type="submit"
        disabled={isSubmitting}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
        animate={sectionControls}
        variants={{
          hidden: { opacity: 0, y: 12, scale: 0.96 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.42, ease: premiumEase }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      >
        {isSubmitting ? copy.sending : copy.send} <span aria-hidden="true">↗</span>
      </motion.button>
      <p className="contact-section-wrapper__disclaimer">{copy.disclaimer}</p>
      <AnimatePresence>
        {submitMessage && (
          <motion.p role="status" initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }} transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: premiumEase }}>
            {submitMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  )

  return (
    <section className="contact-section-wrapper" id="contact" aria-labelledby="contact-title" ref={setSectionRef}>
      <div className="contact-section-wrapper__container">
        <header className="contact-section-wrapper__section-header">
          <p className="contact-section-wrapper__section-eyebrow">{copy.eyebrow}</p>
          <motion.h2
            id="contact-title"
            initial={sectionInitial}
            animate={sectionControls}
            variants={{
              hidden: { opacity: 0, y: 36, scale: 0.985 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.78, ease: premiumEase }}
            aria-label={copy.heading}
          >
            <span className="contact-section-wrapper__heading-placeholder" aria-hidden="true">{copy.heading}</span>
            <span className="contact-section-wrapper__heading-live" aria-hidden="true">
              {visibleHeading}
              {!prefersReducedMotion && (
                <span className={`contact-section-wrapper__type-cursor${headingDone ? ' is-blinking' : ''}`} aria-hidden="true">|</span>
              )}
            </span>
          </motion.h2>
          <motion.p
            className="contact-section-wrapper__section-description"
            initial={sectionInitial}
            animate={sectionControls}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: prefersReducedMotion ? 0 : 0.1, ease: premiumEase }}
          >
            {copy.description}
          </motion.p>
        </header>
        <div className="contact-section-wrapper__workspace">
          <div className="contact-section-wrapper__content">
            <motion.aside
              className="contact-section-wrapper__info-card"
              initial={prefersReducedMotion ? false : { opacity: 0, y: isMobileMotion ? 24 : 32, scale: 0.985 }}
              animate={sectionControls}
              variants={{
                hidden: { opacity: 0, y: isMobileMotion ? 24 : 32, scale: 0.985 },
                visible: { opacity: 1, x: 0, y: 0, scale: 1 },
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.74, delay: prefersReducedMotion ? 0 : 0.08, ease: premiumEase }}
            >
              <motion.div
                className="contact-section-wrapper__email-block"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                animate={sectionControls}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.58, delay: prefersReducedMotion ? 0 : 0.18, ease: premiumEase }}
              >
                <motion.span
                  className="contact-section-wrapper__icon-box"
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { opacity: 0, rotate: -8, scale: 0.82 }}
                  animate={sectionControls}
                  variants={{
                    hidden: { opacity: 0, rotate: -8, scale: 0.82 },
                    visible: { opacity: 1, rotate: 0, scale: 1 },
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.52, delay: prefersReducedMotion ? 0 : 0.26, ease: premiumEase }}
                >
                  @
                </motion.span>
                <div className="contact-section-wrapper__email-copy">
                  <p className="contact-section-wrapper__card-label">{copy.email}</p>
                  <a href={`mailto:${copy.emailAddress}`}>{copy.emailAddress}</a>
                </div>
              </motion.div>
              <motion.div
                className="contact-section-wrapper__separator"
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
                animate={sectionControls}
                variants={{
                  hidden: { scaleX: 0, opacity: 0 },
                  visible: { scaleX: 1, opacity: 1 },
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.72, delay: prefersReducedMotion ? 0 : 0.34, ease: premiumEase }}
              />
              <motion.div
                className="contact-section-wrapper__connect"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                animate={sectionControls}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.58, delay: prefersReducedMotion ? 0 : 0.42, ease: premiumEase }}
              >
                <motion.p
                  className="contact-section-wrapper__card-label"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={sectionControls}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.42, delay: prefersReducedMotion ? 0 : 0.5, ease: premiumEase }}
                >
                  {copy.connect}
                </motion.p>
                <motion.nav className="contact-section-wrapper__social-badges" aria-label={copy.socialLinksLabel}>
                  {copy.socialLinks.map((link, index) => (
                    <motion.a
                      className="contact-section-wrapper__social-badge"
                      href={link.href}
                      key={link.label}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.96 }}
                      animate={sectionControls}
                      variants={{
                        hidden: { opacity: 0, y: 16, scale: 0.96 },
                        visible: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.48, delay: prefersReducedMotion ? 0 : 0.58 + index * 0.08, ease: premiumEase }}
                    >
                      <motion.span
                        className="contact-section-wrapper__badge-icon"
                        aria-hidden="true"
                        whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.06 }}
                        transition={{ duration: 0.24, ease: premiumEase }}
                      >
                        {link.shortLabel ?? link.label}
                      </motion.span>
                      <span>{link.label}</span>
                    </motion.a>
                  ))}
                </motion.nav>
              </motion.div>
            </motion.aside>
          </div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div className="contact-section-wrapper__form contact-success-wrapper" role="status" aria-live="polite" initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: premiumEase }}>
                <div className="contact-success-icon" aria-hidden="true">✓</div>
                <h3 className="contact-success-title">{copy.successHeading}</h3>
                <p className="contact-success-message">{copy.successMessage}</p>
                <button className="contact-success-reset-btn" type="button" onClick={resetContactForm}>{copy.resetButton}</button>
              </motion.div>
            ) : contactForm}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
