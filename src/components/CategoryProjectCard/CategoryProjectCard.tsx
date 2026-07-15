import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { motion } from 'motion/react'
import type { CategoryProject as Project } from '../../content/portfolioContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { siteContent } from '../../content/siteContent'
import { premiumEase } from '../../utils/motionConfig'
import styles from './CategoryProjectCard.module.css'

type ProjectCardProps = {
  project: Project
  index: number
  activePreviewId: string | null
  setActivePreviewId: (id: string | null) => void
  onWatch: (project: Project, opener: HTMLElement | null) => void
}

export function CategoryProjectCard({
  project,
  index,
  activePreviewId,
  setActivePreviewId,
  onWatch,
}: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const freezeTimerRef = useRef<number | null>(null)
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1025px)').matches)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [isFrozen, setIsFrozen] = useState(false)
  const isActivePreview = activePreviewId === project.id

  const clearPreviewTimer = () => {
    if (freezeTimerRef.current !== null) {
      window.clearTimeout(freezeTimerRef.current)
      freezeTimerRef.current = null
    }
  }

  const pauseVideo = (reset = false) => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    if (reset) video.currentTime = 0
  }


  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1025px)')
    const handleViewportChange = () => {
      setIsDesktop(mediaQuery.matches)
      setActivePreviewId(null)
      clearPreviewTimer()
      const video = videoRef.current
      if (video) {
        video.pause()
        video.currentTime = 0
      }
      setIsPreviewing(false)
      setIsFrozen(false)
    }

    mediaQuery.addEventListener('change', handleViewportChange)
    return () => mediaQuery.removeEventListener('change', handleViewportChange)
  }, [setActivePreviewId])

  useEffect(() => () => {
    clearPreviewTimer()
    pauseVideo(false)
  }, [])

  useEffect(() => {
    if (isActivePreview) return undefined
    const timeoutId = window.setTimeout(() => {
      clearPreviewTimer()
      videoRef.current?.pause()
      setIsPreviewing(false)
      setIsFrozen(false)
    }, 0)
    return () => window.clearTimeout(timeoutId)
  }, [isActivePreview])

  useEffect(() => {
    const element = cardRef.current
    if (!element || !isDesktop) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && activePreviewId === project.id) {
        setActivePreviewId(null)
      }
    }, { threshold: 0.05 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [activePreviewId, isDesktop, project.id, setActivePreviewId])

  const handleMouseEnter = () => {
    if (!isDesktop) return
    const video = videoRef.current
    if (!video) return

    clearPreviewTimer()
    setActivePreviewId(project.id)
    setIsFrozen(false)
    setIsPreviewing(true)
    video.currentTime = 0
    void video.play().catch(() => undefined)

    freezeTimerRef.current = window.setTimeout(() => {
      video.pause()
      setIsFrozen(true)
      setIsPreviewing(true)
      freezeTimerRef.current = null
    }, 3000)
  }

  const handleMouseLeave = () => {
    if (!isDesktop) return
    if (isFrozen) return
    clearPreviewTimer()
    pauseVideo(false)
    setIsPreviewing(false)
    if (activePreviewId === project.id) setActivePreviewId(null)
  }

  const handleVideoError = () => {
    if (import.meta.env.DEV) {
      console.warn(`[ProjectCard] Unable to load video for "${project.title}": ${project.videoPath}`)
    }
  }

  const openProject = () => {
    setActivePreviewId(null)
    onWatch(project, cardRef.current)
  }

  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openProject()
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${isPreviewing ? styles.previewing : ''} ${isFrozen ? styles.frozen : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.48, delay: prefersReducedMotion ? 0 : index * 0.06, ease: premiumEase }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={openProject}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${siteContent.modalLabels.watchProject}: ${project.title}`}
    >
      <div className={styles.cardSurface}>
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
          <span className={styles.watchFull} aria-hidden="true">Watch Full</span>
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
        </div>
      </div>
    </motion.div>
  )
}
