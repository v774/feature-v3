import { useEffect, useRef, useState, type MouseEvent } from 'react'
import type { Project } from '../../data/projects'
import styles from './ProjectModal.module.css'
import { useTranslation } from '../../translations/useTranslation'

type ProjectModalProps = { project: Project | null; onClose: () => void }

function MetaIcon({ type }: { type: 'format' | 'software' | 'delivery' }) {
  if (type === 'format') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M8 22h8M12 19v3" /></svg>
  if (type === 'software') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5 5 5M4 20l3.5-1 10-10a2.12 2.12 0 0 0-3-3l-10 10L4 20ZM13 18h7M4 14h4" /></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  useEffect(() => {
    if (!project) return
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = '' }
  }, [project, onClose])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const syncPlaybackState = () => setIsPaused(video.paused)
    video.addEventListener('play', syncPlaybackState)
    video.addEventListener('pause', syncPlaybackState)
    syncPlaybackState()
    return () => {
      video.removeEventListener('play', syncPlaybackState)
      video.removeEventListener('pause', syncPlaybackState)
    }
  }, [project])

  if (!project) return null
  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation()
  const handleVideoError = () => console.warn(`[ProjectModal] Unable to load video for "${project.title}": ${project.videoPath}`)
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

  return <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" onClick={onClose}>
    <div className={styles.modal} onClick={stopPropagation}>
      <button className={styles.close} type="button" onClick={onClose} aria-label={t.common.closeProject}><span /><span /></button>
      <div className={styles.videoContainer}>
        <video ref={videoRef} className={styles.video} src={project.videoPath} controls autoPlay playsInline onError={handleVideoError} />
        <div className={styles.pauseOverlay} onClick={handlePlaybackOverlayClick} role="presentation">
          <button className={`${styles.pauseIndicator} ${isPaused ? styles.pauseIndicatorVisible : ''}`} type="button" tabIndex={-1} aria-hidden="true">
            {isPaused ? '▶' : 'Ⅱ'}
          </button>
        </div>
      </div>
      <div className={styles.details}>
        <p className={styles.eyebrow}><span aria-hidden="true">◆</span> {t.common.selectedWork}</p>
        <h2 id="project-modal-title">{project.title}</h2>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.meta}>
          <span className={styles.metaItem}><b><MetaIcon type="format" />{t.modal.format}</b><strong>{project.format}</strong></span>
          <span className={styles.metaItem}><b><MetaIcon type="software" />{t.modal.software}</b><strong>{project.software.split(',').map((tool) => <span className={styles.valueLine} key={tool}>{tool.trim()}</span>)}</strong></span>
          <span className={styles.metaItem}><b><MetaIcon type="delivery" />{t.modal.delivery}</b><strong>{project.delivery}</strong></span>
        </div>
      </div>
    </div>
  </div>
}
