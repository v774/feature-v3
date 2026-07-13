import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Project } from '../../data/projects'
import styles from './CategoryProjectCard.module.css'
import { useTranslation } from '../../translations/useTranslation'

type ProjectCardProps = {
  project: Project
  onWatch: (project: Project) => void
}

export function CategoryProjectCard({ project, onWatch }: ProjectCardProps) {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1025px)').matches)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [isPausedByTimer, setIsPausedByTimer] = useState(false)

  const clearPreviewTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = undefined
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1025px)')
    const handleViewportChange = () => {
      setIsDesktop(mediaQuery.matches)
      setIsPreviewing(false)
      clearPreviewTimer()
      setIsPausedByTimer(false)
      const video = videoRef.current
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }

    mediaQuery.addEventListener('change', handleViewportChange)
    return () => mediaQuery.removeEventListener('change', handleViewportChange)
  }, [])

  const handleMouseEnter = () => {
    if (!isDesktop) return
    const video = videoRef.current
    if (!video) return
    clearPreviewTimer()
    setIsPreviewing(true)
    setIsPausedByTimer(false)
    video.currentTime = 0
    void video.play().catch(() => undefined)
    timerRef.current = setTimeout(() => {
      video.pause()
      setIsPausedByTimer(true)
    }, 3000)
  }

  const handleMouseLeave = () => {
    clearPreviewTimer()
    const video = videoRef.current
    if (video && isDesktop) {
      video.pause()
      video.currentTime = 0
    }
    setIsPreviewing(false)
    setIsPausedByTimer(false)
  }

  const handleVideoError = () => {
    console.warn(`[ProjectCard] Unable to load video for "${project.title}": ${project.videoPath}`)
  }

  useEffect(() => () => clearPreviewTimer(), [])

  const openProject = () => onWatch(project)
  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openProject()
    }
  }

  return <div className={`${styles.card} ${isPreviewing ? styles.previewing : ''} ${isPausedByTimer ? styles.glassEffect : ''}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={openProject} onKeyDown={handleCardKeyDown} role="button" tabIndex={0} aria-label={`${t.common.watchProject}: ${project.title}`}>
    <div className={styles.media}>
      {!isDesktop && <img className={styles.poster} src={project.previewImage} alt="" />}
      {isDesktop && <video ref={videoRef} className={styles.video} src={project.videoPath} muted playsInline onError={handleVideoError} />}
      <span className={styles.shade} aria-hidden="true" />
      <span className={styles.glassPane} aria-hidden="true" />
      <div className={styles.infoLayer}>
        <div className={styles.infoTop}>
          <span className={styles.format}><span className={styles.formatDot} aria-hidden="true" />1920x1080</span>
          <span>30FPS</span>
        </div>
        <div className={styles.infoBottom}>
          <span className={styles.software}>{project.software.replaceAll(', ', ' - ').toUpperCase()}</span>
          <h2>{project.title}</h2>
        </div>
      </div>
      {isDesktop && <button className={`${styles.watchButton} ${isPausedByTimer ? styles.watchButtonVisible : ''}`} type="button" tabIndex={-1} aria-hidden="true">
        Watch Full <span aria-hidden="true">↗</span>
      </button>}
    </div>
  </div>
}
