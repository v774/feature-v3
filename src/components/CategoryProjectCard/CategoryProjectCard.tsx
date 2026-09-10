import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import type { CategoryProject as Project } from '../../content/portfolioContent'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { siteContent } from '../../content/siteContent'
import { premiumEase } from '../../utils/motionConfig'
import styles from './CategoryProjectCard.module.css'

export function CategoryProjectCard({ project, index, activePreviewId, setActivePreviewId, onWatch }: any) {
  const reduced = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timer = useRef<number>(0)
  
  const [isDesktop, setIsDesktop] = useState(true)
  const [state, setState] = useState({ previewing: false, frozen: false })
  
  const isActive = activePreviewId === project.id
  const hasVideo = project.videoPath.trim().length > 0

  const resetVideo = () => {
    window.clearTimeout(timer.current)
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }
  }

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)')
    const onChange = () => { setIsDesktop(mq.matches); setActivePreviewId(null); resetVideo(); setState({ previewing: false, frozen: false }) }
    onChange()
    mq.addEventListener('change', onChange)
    return () => { mq.removeEventListener('change', onChange); resetVideo() }
  }, [setActivePreviewId])

  useEffect(() => {
    if (!isActive) { resetVideo(); setState({ previewing: false, frozen: false }) }
  }, [isActive])

  useEffect(() => {
    if (!cardRef.current || !isDesktop) return
    const obs = new IntersectionObserver(([e]) => !e.isIntersecting && activePreviewId === project.id && setActivePreviewId(null), { threshold: 0.05 })
    obs.observe(cardRef.current)
    return () => obs.disconnect()
  }, [activePreviewId, isDesktop, project.id, setActivePreviewId])

  const onEnter = () => {
    if (!isDesktop || !hasVideo || !videoRef.current) return
    resetVideo()
    setActivePreviewId(project.id)
    setState({ previewing: true, frozen: false })
    void videoRef.current.play().catch(() => {})
    
    timer.current = window.setTimeout(() => {
      videoRef.current?.pause()
      setState({ previewing: true, frozen: true })
    }, 3000)
  }

  const onLeave = () => {
    if (!isDesktop || state.frozen) return
    resetVideo()
    setState({ previewing: false, frozen: false })
    if (isActive) setActivePreviewId(null)
  }

  return (
    <motion.div ref={cardRef} className={`${styles.card} ${state.previewing ? styles.previewing : ''} ${state.frozen ? styles.frozen : ''}`.trim()} initial={reduced ? false : { opacity: 0, y: 24, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reduced ? 0 : 0.48, delay: reduced ? 0 : index * 0.06, ease: premiumEase }} onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={() => onWatch(project, cardRef.current)} onKeyDown={(e) => ['Enter', ' '].includes(e.key) && (e.preventDefault(), onWatch(project, cardRef.current))} role="button" tabIndex={0} aria-label={`${siteContent.modalLabels.watchProject}: ${project.title}`}>
      <div className={styles.cardSurface}>
        <div className={styles.media}>
          <img className={styles.poster} src={project.previewImage} alt="" loading="lazy" decoding="async" />
          {isDesktop && hasVideo && <video ref={videoRef} className={styles.video} src={project.videoPath} poster={project.previewImage} muted playsInline preload="metadata" />}
          <span className={styles.shade} aria-hidden="true" />
          {hasVideo && <span className={styles.watchFull} aria-hidden="true">Watch Full</span>}
          <div className={styles.infoLayer}>
            <div className={styles.infoTop}><span className={styles.format}><span className={styles.formatDot} aria-hidden="true" />1920x1080</span><span>30FPS</span></div>
            <div className={styles.infoBottom}><span className={styles.software}>{project.software.replaceAll(', ', ' - ').toUpperCase()}</span><h2>{project.title}</h2></div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}