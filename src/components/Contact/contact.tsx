import './contact.block.css'
import { type FormEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from '../../translations/useTranslation'

declare const process: { env?: { VITE_FORM_KEY?: string } } | undefined

const socialLinks = [
  { label: 'Behance', href: 'https://behance.net' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Email', href: 'mailto:hello@example.com' },
]

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
  const { t } = useTranslation()
  const copy = t.sections.contact
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
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
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
      console.error('VITE_FORM_KEY is missing; refusing to submit the contact form.')
      setSubmitMessage('The contact form is temporarily unavailable. Please email us directly.')
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
        setSubmitMessage('Please enter a message before submitting the form.')
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
        console.error('Web3Forms Error Details:', {
          status: response.status,
          statusText: response.statusText,
          ...result,
        })
        throw new Error(result.message || `Form submission failed with status ${response.status}`)
      }

      setFormData({ name: '', email: '', project_type: '', budget: '', message: '' })
      setIsSubmitted(true)
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setSubmitMessage('We could not send your message. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetContactForm = () => {
    setFormData({ name: '', email: '', project_type: '', budget: '', message: '' })
    setSubmitMessage('')
    setIsSubmitted(false)
  }

  const contactForm = (
    <form id="contact-form" className="contact-section-wrapper__form" action={submitUrl} method="post" onSubmit={handleSubmit}>
      <label>
        <span>{copy.name} <b>*</b></span>
        <input type="text" name="name" placeholder={copy.name} autoComplete="name" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
      </label>
      <label>
        <span>{copy.email} <b>*</b></span>
        <input type="email" name="email" placeholder={copy.email} autoComplete="email" required value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
      </label>
      <div className={`contact-section-wrapper__select-field${openMenu === 'project' ? ' is-open' : ''}`}>
        <span>{copy.projectType}</span>
        <input type="hidden" name="projectType" value={formData.project_type} />
        <button className="contact-section-wrapper__select-trigger" type="button" aria-expanded={openMenu === 'project'} onClick={() => setOpenMenu(openMenu === 'project' ? null : 'project')}>
          {formData.project_type || copy.projectType} <span aria-hidden="true">⌄</span>
        </button>
        {openMenu === 'project' && <div className="contact-section-wrapper__select-menu">{copy.projectTypes.map((option) => <button type="button" key={option} onClick={() => selectOption('project', option)}>{option}</button>)}</div>}
      </div>
      <div className={`contact-section-wrapper__select-field${openMenu === 'budget' ? ' is-open' : ''}`}>
        <span>{copy.budget}</span>
        <input type="hidden" name="budget" value={formData.budget} />
        <button className="contact-section-wrapper__select-trigger" type="button" aria-expanded={openMenu === 'budget'} onClick={() => setOpenMenu(openMenu === 'budget' ? null : 'budget')}>
          {formData.budget || copy.budget} <span aria-hidden="true">⌄</span>
        </button>
        {openMenu === 'budget' && <div className="contact-section-wrapper__select-menu">{copy.budgets.map((option) => <button type="button" key={option} onClick={() => selectOption('budget', option)}>{option}</button>)}</div>}
      </div>
      <label>
        <span>{copy.message} <b>*</b></span>
        <textarea ref={messageTextareaRef} className="message-textarea" name="message" placeholder={copy.message} autoComplete="off" rows={1} value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} onInput={(event) => resizeMessageTextarea(event.currentTarget)} required />
      </label>
      <button className="contact-section-wrapper__submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : copy.send} <span aria-hidden="true">↗</span></button>
      <p className="contact-section-wrapper__disclaimer">{copy.disclaimer}</p>
      {submitMessage && <p role="status">{submitMessage}</p>}
    </form>
  )

  return (
    <section className="contact-section-wrapper" id="contact" aria-labelledby="contact-title">
      <div className="contact-section-wrapper__container">
        <header className="contact-section-wrapper__section-header">
          <p className="contact-section-wrapper__section-eyebrow">{copy.eyebrow}</p>
          <h2 id="contact-title">{copy.heading}</h2>
          <p className="contact-section-wrapper__section-description">{copy.description}</p>
        </header>
        <div className="contact-section-wrapper__workspace">
          <div className="contact-section-wrapper__content">
            <aside className="contact-section-wrapper__info-card">
              <div className="contact-section-wrapper__email-block">
                <span className="contact-section-wrapper__icon-box" aria-hidden="true">@</span>
                <div className="contact-section-wrapper__email-copy">
                  <p className="contact-section-wrapper__card-label">{copy.email}</p>
                  <a href="mailto:hello@example.com">hello@example.com</a>
                </div>
              </div>
              <div className="contact-section-wrapper__separator" aria-hidden="true" />
              <div className="contact-section-wrapper__connect">
                <p className="contact-section-wrapper__card-label">{copy.connect}</p>
                <nav className="contact-section-wrapper__social-badges" aria-label={copy.socialLinks}>
                  {socialLinks.map((link) => (
                    <a className="contact-section-wrapper__social-badge" href={link.href} key={link.label}>
                      <span className="contact-section-wrapper__badge-icon" aria-hidden="true">{link.label === 'Behance' ? 'Be' : link.label === 'Instagram' ? 'Ig' : 'Mail'}</span>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          </div>

          {isSubmitted ? (
            <div className="contact-section-wrapper__form contact-success-wrapper" role="status" aria-live="polite">
              <div className="contact-success-icon" aria-hidden="true">✓</div>
              <h3 className="contact-success-title">{copy.successHeading}</h3>
              <p className="contact-success-message">{copy.successMessage}</p>
              <button className="contact-success-reset-btn" type="button" onClick={resetContactForm}>{copy.resetButton}</button>
            </div>
          ) : contactForm}

        </div>
      </div>
    </section>
  )
}
