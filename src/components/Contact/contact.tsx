import './contact.block.css'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { contactContent } from '../../content/contactContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionAnimation } from '../../hooks/useSectionAnimation'
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
  } = useSectionAnimation<HTMLElement>({
    activationThreshold: 0.4,
    resetThreshold: 0.08,
    minCycleMs: 1400,
  })

  const copy = contactContent
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    project_type: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null)

  // Only the message field grows; the left panel is pinned by CSS.
  const resizeMessageTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
    textarea.style.overflowY = 'hidden'
  }

  useEffect(() => {
    const textarea = messageTextareaRef.current
    if (!textarea) return

    const resize = () => resizeMessageTextarea(textarea)
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

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

  const groupVariants = {
    hidden: { opacity: 0, y: 34, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1 },
  }

  const headingVariants = {
    hidden: { opacity: 0, y: 45, letterSpacing: '0.11em', clipPath: 'inset(100% 0 0 0)' },
    visible: { opacity: 1, y: 0, letterSpacing: '0.035em', clipPath: 'inset(0% 0 0 0)' },
  }

  const circuitLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  }

  const circuitNodeVariants = {
    hidden: { opacity: 0, scale: 0.75 },
    visible: { opacity: 1, scale: 1 },
  }

  const headingSweepVariants = {
    hidden: { opacity: 0, x: '-120%' },
    visible: { opacity: [0, 0.48, 0], x: ['-120%', '180%', '520%'] },
  }

  const contactDetails = [
    { icon: '@', label: copy.emailCardLabel, value: copy.emailAddress, href: `mailto:${copy.emailAddress}` },
    { icon: 'AV', label: copy.availabilityLabel, value: copy.availability },
    { icon: 'LO', label: copy.locationLabel, value: copy.location },
  ]

  const contactForm = (
    <motion.form
      id="contact-form"
      className="contact-section-wrapper__form"
      action={submitUrl}
      method="post"
      onSubmit={handleSubmit}
      initial={sectionInitial}
      animate={sectionControls}
      variants={groupVariants}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.76,
        delay: prefersReducedMotion ? 0 : 0.12,
        ease: premiumEase,
      }}
    >
      {/* Visible labels match the reference and improve accessibility. */}
      <label className="contact-section-wrapper__field">
        <span>{copy.name} <b aria-hidden="true">*</b></span>
        <input
          type="text"
          name="name"
          placeholder={copy.name}
          autoComplete="name"
          required
          value={formData.name}
          onChange={(event) => setFormData({ ...formData, name: event.target.value })}
        />
      </label>

      <label className="contact-section-wrapper__field">
        <span>{copy.email} <b aria-hidden="true">*</b></span>
        <input
          type="email"
          name="email"
          placeholder={copy.email}
          autoComplete="email"
          required
          value={formData.email}
          onChange={(event) => setFormData({ ...formData, email: event.target.value })}
        />
      </label>

      <input type="hidden" name="projectType" value={formData.project_type} />
      <input type="hidden" name="budget" value={formData.budget} />

      <label className="contact-section-wrapper__field contact-section-wrapper__field--message">
        <span>{copy.message} <b aria-hidden="true">*</b></span>
        <textarea
          ref={messageTextareaRef}
          className="message-textarea"
          name="message"
          placeholder={copy.message}
          autoComplete="off"
          rows={5}
          value={formData.message}
          onChange={(event) => setFormData({ ...formData, message: event.target.value })}
          onInput={(event) => resizeMessageTextarea(event.currentTarget)}
          required
        />
      </label>

      <motion.button
        className="contact-section-wrapper__submit"
        type="submit"
        disabled={isSubmitting}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      >
        {isSubmitting ? copy.sending : copy.send}
      </motion.button>

      <p className="contact-section-wrapper__disclaimer">{copy.disclaimer}</p>

      <AnimatePresence>
        {submitMessage && (
          <motion.p
            role="status"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: premiumEase }}
          >
            {submitMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  )

  return (
    <section
      className="contact-section-wrapper"
      id="contact"
      aria-labelledby="contact-title"
      ref={setSectionRef}
    >
      <motion.div
        className="contact-section-wrapper__watermark"
        aria-hidden="true"
        initial={sectionInitial}
        animate={sectionControls}
        variants={headingVariants}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: premiumEase }}
      >
        <span>CONTACT</span>
        <motion.span
          className="contact-section-wrapper__watermark-sweep"
          variants={headingSweepVariants}
          transition={{ duration: prefersReducedMotion ? 0 : 1.2, delay: prefersReducedMotion ? 0 : 0.82, ease: premiumEase }}
        />
      </motion.div>

      <motion.svg
        className="contact-section-wrapper__circuit contact-section-wrapper__circuit--left"
        viewBox="0 0 360 160"
        aria-hidden="true"
        initial={sectionInitial}
        animate={sectionControls}
      >
        <motion.path
          d="M0 106 H92 L148 50 H244 L300 86 H360"
          variants={circuitLineVariants}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.72, ease: premiumEase }}
        />
        {[92, 148, 244, 300].map((cx, index) => (
          <motion.circle
            cx={cx}
            cy={cx === 148 || cx === 244 ? 50 : cx === 92 ? 106 : 86}
            r="5"
            key={cx}
            variants={circuitNodeVariants}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, delay: prefersReducedMotion ? 0 : 1.15 + index * 0.05, ease: premiumEase }}
          />
        ))}
      </motion.svg>

      <motion.svg
        className="contact-section-wrapper__circuit contact-section-wrapper__circuit--right"
        viewBox="0 0 360 160"
        aria-hidden="true"
        initial={sectionInitial}
        animate={sectionControls}
      >
        <motion.path
          d="M360 106 H268 L212 50 H116 L60 86 H0"
          variants={circuitLineVariants}
          transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.72, ease: premiumEase }}
        />
        {[268, 212, 116, 60].map((cx, index) => (
          <motion.circle
            cx={cx}
            cy={cx === 212 || cx === 116 ? 50 : cx === 268 ? 106 : 86}
            r="5"
            key={cx}
            variants={circuitNodeVariants}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, delay: prefersReducedMotion ? 0 : 1.15 + index * 0.05, ease: premiumEase }}
          />
        ))}
      </motion.svg>

      <div className="contact-section-wrapper__container">
        <div className="contact-section-wrapper__workspace">
          <motion.div
            className="contact-section-wrapper__content"
            initial={sectionInitial}
            animate={sectionControls}
            variants={groupVariants}
            transition={{ duration: prefersReducedMotion ? 0 : 0.72, ease: premiumEase }}
          >
            <p className="contact-section-wrapper__section-eyebrow">{copy.eyebrow}</p>
            <h2 id="contact-title">{copy.heading}</h2>
            <p className="contact-section-wrapper__section-description">{copy.description}</p>

            <div className="contact-section-wrapper__cards" aria-label="Contact details">
              {contactDetails.map((item) => (
                <article className="contact-section-wrapper__detail-card" key={item.label}>
                  <span className="contact-section-wrapper__icon-box" aria-hidden="true">{item.icon}</span>
                  <div>
                    <p className="contact-section-wrapper__card-label">{item.label}</p>
                    {item.href ? <a href={item.href}>{item.value}</a> : <p>{item.value}</p>}
                  </div>
                  <span className="contact-section-wrapper__card-arrow" aria-hidden="true" />
                </article>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                className="contact-section-wrapper__form contact-success-wrapper"
                role="status"
                aria-live="polite"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: premiumEase }}
              >
                <div className="contact-success-icon" aria-hidden="true">OK</div>
                <h3 className="contact-success-title">{copy.successHeading}</h3>
                <p className="contact-success-message">{copy.successMessage}</p>
                <button className="contact-success-reset-btn" type="button" onClick={resetContactForm}>
                  {copy.resetButton}
                </button>
              </motion.div>
            ) : contactForm}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
