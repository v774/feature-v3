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

function MetaIcon({ type }: { type: 'format' | 'software' | 'delivery' }) {
  if (type === 'format') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M8 22h8M12 19v3" /></svg>
  if (type === 'software') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5 5 5M4 20l3.5-1 10-10a2.12 2.12 0 0 0-3-3l-10 10L4 20ZM13 18h7M4 14h4" /></svg>
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
      <div className={styles.modal}>
        <button ref={closeButtonRef} className={styles.close} type="button" onClick={closeModal} aria-label={labels.closeProject}><span /><span /></button>
        <div className={styles.videoContainer}>
          <video ref={videoRef} className={styles.video} src={project.videoPath} controls autoPlay playsInline preload="auto" onError={handleVideoError} />
          <div className={styles.pauseOverlay} onClick={handlePlaybackOverlayClick} role="presentation">
            <button className={`${styles.pauseIndicator} ${isPaused ? styles.pauseIndicatorVisible : ''}`} type="button" tabIndex={-1} aria-hidden="true">
              {isPaused ? 'PLAY' : 'II'}
            </button>
          </div>
        </div>
        <div className={styles.details}>
          <p className={styles.eyebrow}><span aria-hidden="true">*</span> {labels.selectedWork}</p>
          <h2 id="project-modal-title">{project.title}</h2>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.meta}>
            <span className={styles.metaItem}><b><MetaIcon type="format" />{labels.format}</b><strong>{project.format}</strong></span>
            <span className={styles.metaItem}><b><MetaIcon type="software" />{labels.software}</b><strong>{project.software.split(',').map((tool) => <span className={styles.valueLine} key={tool}>{tool.trim()}</span>)}</strong></span>
            <span className={styles.metaItem}><b><MetaIcon type="delivery" />{labels.delivery}</b><strong>{project.delivery}</strong></span>
          </div>
        </div>
      </div>
    </div>
  </div>
}
