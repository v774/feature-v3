import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { motion } from 'motion/react'
import type { Project } from '../../data/projects'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTranslation } from '../../translations/useTranslation'
import styles from './CategoryProjectCard.module.css'

type ProjectCardProps = {
  project: Project
  index: number
  onWatch: (project: Project) => void
}

export function CategoryProjectCard({ project, index, onWatch }: ProjectCardProps) {
  const { t } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1025px)').matches)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [glassEffect, setGlassEffect] = useState(false)

  const clearPreviewTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = undefined
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1025px)')
    const handleViewportChange = () => {
      setIsDesktop(mediaQuery.matches)
      if (!glassEffect) setIsPreviewing(false)
      const video = videoRef.current
      if (video && !glassEffect) {
        video.pause()
        video.currentTime = 0
      }
    }

    mediaQuery.addEventListener('change', handleViewportChange)
    return () => mediaQuery.removeEventListener('change', handleViewportChange)
  }, [glassEffect])

  useEffect(() => () => {
    clearPreviewTimer()
    const video = videoRef.current
    if (video) video.pause()
  }, [])

  const handleMouseEnter = () => {
    if (!isDesktop || glassEffect) return
    const video = videoRef.current
    if (!video) return
    clearPreviewTimer()
    setIsPreviewing(true)
    video.currentTime = 0
    void video.play().catch(() => undefined)
    timerRef.current = setTimeout(() => {
      video.pause()
      setIsPreviewing(true)
      setGlassEffect(true)
    }, 3000)
  }

  const handleMouseLeave = () => {
    if (glassEffect) return
    clearPreviewTimer()
    const video = videoRef.current
    if (video && isDesktop) {
      video.pause()
      video.currentTime = 0
    }
    setIsPreviewing(false)
  }

  const handleVideoError = () => {
    console.warn(`[ProjectCard] Unable to load video for "${project.title}": ${project.videoPath}`)
  }

  const openProject = () => onWatch(project)
  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openProject()
    }
  }

  return (
    <motion.div
      className={`${styles.card} ${isPreviewing ? styles.previewing : ''} ${glassEffect ? styles.glassEffect : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={openProject}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${t.common.watchProject}: ${project.title}`}
    >
      <div className={styles.media}>
        <img className={styles.poster} src={project.previewImage} alt="" loading="lazy" decoding="async" />
        {isDesktop && (
          <video
            ref={videoRef}
            className={styles.video}
            src={project.videoPath}
            poster={project.previewImage}
            muted
            playsInline
            preload="metadata"
            onError={handleVideoError}
          />
        )}
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
        <span className={styles.watchButton} aria-hidden="true">
          Watch Full <span aria-hidden="true">↗</span>
        </span>
      </div>
    </motion.div>
  )
}
