import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import type { CategoryProject as Project } from '../../content/portfolioContent'
import { siteContent } from '../../content/siteContent'
import { GalleryLamp } from '../GalleryLamp/GalleryLamp'
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const scrollYRef = useRef(0)
  const previousBodyStylesRef = useRef({ position: '', top: '', width: '', overflow: '', paddingRight: '' })
  const [isPaused, setIsPaused] = useState(false)

  const closeModal = useCallback(() => {
    videoRef.current?.pause()
    onClose()
    window.setTimeout(() => returnFocusElement?.focus(), 0)
  }, [onClose, returnFocusElement])

  useEffect(() => {
    if (!project) return undefined

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    scrollYRef.current = window.scrollY
    previousBodyStylesRef.current = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    }

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollYRef.current}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    const modalVideo = videoRef.current

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      modalVideo?.pause()
      const previousStyles = previousBodyStylesRef.current
      document.body.style.position = previousStyles.position
      document.body.style.top = previousStyles.top
      document.body.style.width = previousStyles.width
      document.body.style.overflow = previousStyles.overflow
      document.body.style.paddingRight = previousStyles.paddingRight
      window.scrollTo(0, scrollYRef.current)
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

  return <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={closeModal}>
    <div className={styles.stage} onClick={stopPropagation}>
      <GalleryLamp variant="modal" className={styles.modalLamp} />
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
