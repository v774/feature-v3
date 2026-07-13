import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { motion } from 'motion/react'
import type { CategoryProject as Project } from '../../content/portfolioContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useScrambleText } from '../../hooks/useScrambleText'
import { siteContent } from '../../content/siteContent'
import { premiumEase } from '../../utils/motionConfig'
import styles from './CategoryProjectCard.module.css'

type ProjectCardProps = {
  project: Project
  index: number
  onWatch: (project: Project) => void
}

export function CategoryProjectCard({ project, index, onWatch }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const freezeTimerRef = useRef<number | null>(null)
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1025px)').matches)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [isFrozen, setIsFrozen] = useState(false)
  const [titleStart, setTitleStart] = useState({ key: project.title, started: prefersReducedMotion })
  const startTitleAnimation = titleStart.key === project.title ? titleStart.started : prefersReducedMotion
  const { displayed: titleText, done: titleDone } = useScrambleText(project.title, 0, startTitleAnimation && !prefersReducedMotion, 0.25)
  const visibleTitle = prefersReducedMotion ? project.title : titleText
  const [titleCursor, setTitleCursor] = useState({ key: project.title, visible: true, fading: false })
  const showTitleCursor = titleCursor.key === project.title ? titleCursor.visible : true
  const fadeTitleCursor = titleCursor.key === project.title ? titleCursor.fading : false

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1025px)')
    const handleViewportChange = () => {
      setIsDesktop(mediaQuery.matches)
      setIsPreviewing(false)
      setIsFrozen(false)
      if (freezeTimerRef.current !== null) {
        window.clearTimeout(freezeTimerRef.current)
        freezeTimerRef.current = null
      }
      const video = videoRef.current
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }

    mediaQuery.addEventListener('change', handleViewportChange)
    return () => mediaQuery.removeEventListener('change', handleViewportChange)
  }, [])

  useEffect(() => () => {
    if (freezeTimerRef.current !== null) window.clearTimeout(freezeTimerRef.current)
    const video = videoRef.current
    if (video) video.pause()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const startTitleId = window.setTimeout(() => setTitleStart({ key: project.title, started: true }), 1040 + index * 120)
    return () => window.clearTimeout(startTitleId)
  }, [index, prefersReducedMotion, project.title])

  useEffect(() => {
    if (prefersReducedMotion || !titleDone) return undefined

    const fadeCursorId = window.setTimeout(() => setTitleCursor({ key: project.title, visible: true, fading: true }), 1000)
    const hideCursorId = window.setTimeout(() => setTitleCursor({ key: project.title, visible: false, fading: true }), 1750)
    return () => {
      window.clearTimeout(fadeCursorId)
      window.clearTimeout(hideCursorId)
    }
  }, [prefersReducedMotion, project.title, titleDone])

  const handleMouseEnter = () => {
    if (!isDesktop || isFrozen) return
    const video = videoRef.current
    if (!video) return
    setIsPreviewing(true)
    video.currentTime = 0
    void video.play().catch(() => undefined)
    if (freezeTimerRef.current !== null) window.clearTimeout(freezeTimerRef.current)
    freezeTimerRef.current = window.setTimeout(() => {
      video.pause()
      setIsFrozen(true)
      setIsPreviewing(true)
      freezeTimerRef.current = null
    }, 3000)
  }

  const handleMouseLeave = () => {
    if (isFrozen) return
    if (freezeTimerRef.current !== null) {
      window.clearTimeout(freezeTimerRef.current)
      freezeTimerRef.current = null
    }
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
      className={`${styles.card} ${isPreviewing ? styles.previewing : ''} ${isFrozen ? styles.frozen : ''}`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.08, ease: premiumEase }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={openProject}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${siteContent.modalLabels.watchProject}: ${project.title}`}
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
        <span className={styles.watchFull} aria-hidden="true">Watch Full</span>
        <div className={styles.infoLayer}>
          <div className={styles.infoTop}>
            <span className={styles.format}><span className={styles.formatDot} aria-hidden="true" />1920x1080</span>
            <span>30FPS</span>
          </div>
          <div className={styles.infoBottom}>
            <span className={styles.software}>{project.software.replaceAll(', ', ' - ').toUpperCase()}</span>
            <h2 aria-label={project.title}>
              <span aria-hidden="true">{visibleTitle}</span>
              {!prefersReducedMotion && showTitleCursor && (
                <span className={`${styles.titleCursor}${titleDone ? ` ${styles.blinking}` : ''}${fadeTitleCursor ? ` ${styles.fading}` : ''}`} aria-hidden="true">|</span>
              )}
            </h2>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
