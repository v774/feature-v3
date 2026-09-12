import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import type { CategoryProject as Project } from '../../content/portfolioContent'
import { siteContent } from '../../content/siteContent'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import styles from './ProjectModal.module.css'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
  returnFocusElement?: HTMLElement | null
}

function MetaIcon({ type }: { type: 'format' | 'software' | 'delivery' | 'duration' | 'client' | 'year' }) {
  if (type === 'format') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M8 22h8M12 19v3" /></svg>
  if (type === 'software') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5 5 5M4 20l3.5-1 10-10a2.12 2.12 0 0 0-3-3l-10 10L4 20ZM13 18h7M4 14h4" /></svg>
  if (type === 'delivery') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
  if (type === 'client') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  if (type === 'year') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
}

export function ProjectModal({ project, onClose, returnFocusElement }: ProjectModalProps) {
  const labels = siteContent.modalLabels
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  useBodyScrollLock(Boolean(project))

  const closeModal = useCallback(() => {
    videoRef.current?.pause()
    onClose()
    window.setTimeout(() => returnFocusElement?.focus(), 0)
  }, [onClose, returnFocusElement])

  useEffect(() => {
    if (!project) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = overlayRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
      )
      const focusable = Array.from(focusableElements ?? []).filter((element) => {
        const style = window.getComputedStyle(element)
        return style.display !== 'none' && style.visibility !== 'hidden'
      })

      if (!focusable.length) {
        event.preventDefault()
        closeButtonRef.current?.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    const modalVideo = videoRef.current

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      modalVideo?.pause()
    }
  }, [closeModal, project])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    video.currentTime = 0
    void video.play().catch(() => undefined)

    const syncPlaybackState = () => setIsPaused(video.paused)
    video.addEventListener('play', syncPlaybackState)
    video.addEventListener('pause', syncPlaybackState)
    syncPlaybackState()

    return () => {
      video.removeEventListener('play', syncPlaybackState)
      video.removeEventListener('pause', syncPlaybackState)
    }
  }, [closeModal, project])

  if (!project) return null
  const hasVideo = project.videoPath.trim().length > 0
  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation()
  const handleVideoError = () => {
    if (import.meta.env.DEV) {
      console.warn(`[ProjectModal] Unable to load video for "${project.title}": ${project.videoPath}`)
    }
  }
  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play().catch(() => undefined)
      setIsPaused(false)
    } else {
      video.pause()
      setIsPaused(true)
    }
  }

  const handlePlaybackOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    event.stopPropagation()
    toggleVideo()
  }

  return <div ref={overlayRef} className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={closeModal}>
    <div className={styles.stage} onClick={stopPropagation}>
      <button ref={closeButtonRef} className={styles.close} type="button" onClick={closeModal} aria-label={labels.closeProject}><span /><span /></button>
      <div className={styles.modal}>
        <div className={styles.videoContainer}>
          {hasVideo ? (
            <>
             <video ref={videoRef} className={styles.video} src={project.videoPath} controls autoPlay muted playsInline preload="auto" onError={handleVideoError} />
              <div className={styles.pauseOverlay} onClick={handlePlaybackOverlayClick} role="presentation">
                <button className={`${styles.pauseIndicator} ${isPaused ? styles.pauseIndicatorVisible : ''}`} type="button" tabIndex={-1} aria-hidden="true">
                  {isPaused ? 'PLAY' : 'II'}
                </button>
              </div>
            </>
          ) : (
            <img className={styles.video} src={project.previewImage} alt="" />
          )}
        </div>
        <div className={styles.details}>
          <p className={styles.eyebrow}><span aria-hidden="true">*</span> {labels.selectedWork}</p>
          <h2 id="project-modal-title">{project.title}</h2>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.meta}>
            <span className={styles.metaItem}><b><MetaIcon type="format" />{labels.format}</b><strong>{project.format}</strong></span>
            <span className={styles.metaItem}><b><MetaIcon type="software" />{labels.software}</b><strong>{project.software.split(',').map((tool) => <span className={styles.valueLine} key={tool}>{tool.trim()}</span>)}</strong></span>
            <span className={styles.metaItem}><b><MetaIcon type="delivery" />{labels.delivery}</b><strong>{project.delivery}</strong></span>
            <span className={styles.metaItem}><b><MetaIcon type="duration" />{labels.duration}</b><strong>{project.duration}</strong></span>
            {project.client && (
              <span className={styles.metaItem}><b><MetaIcon type="client" />Client</b><strong>{project.client}</strong></span>
            )}
            {project.year && (
              <span className={styles.metaItem}><b><MetaIcon type="year" />Year</b><strong>{project.year}</strong></span>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
}