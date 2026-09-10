import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { categories, portfolioCategories, projects, type CategoryProject as Project } from '../../content/portfolioContent'
import { siteContent } from '../../content/siteContent'
import { Footer } from '../Footer/footer'
import { Header } from '../Header/header'
import { CategoryProjectCard } from '../CategoryProjectCard/CategoryProjectCard'
import { ProjectModal } from '../ProjectModal/ProjectModal'
import { setPendingHomepageSection } from '../../utils/sectionNavigation'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useSectionAnimation } from '../../hooks/useSectionAnimation'
import { useScrambleText } from '../../hooks/useScrambleText'
import { premiumEase } from '../../utils/motionConfig'
import styles from './CategoryPage.module.css'
import './category-grid.css'

const MotionLink = motion.create(Link)
const headerVars = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

export function CategoryPage() {
  const { categoryId = 'logo-animation' } = useParams()
  const navigate = useNavigate()
  const reduced = useReducedMotion()
  const { setRef, controls, initial } = useSectionAnimation<HTMLDivElement>()
  
  const category = categories.find(i => i.enabled && i.slug === categoryId) || categories.find(i => i.enabled)!
  const items = projects.filter(p => p.enabled && p.categorySlug === category.slug)
  
  const [selected, setSelected] = useState<{ project: Project; opener: HTMLElement | null } | null>(null)
  const [previewId, setPreviewId] = useState<string | null>(null)
  
  const catName = portfolioCategories.find(i => i.slug === category.slug)?.label ?? category.slug.split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')
  
  const [titleState, setTitleState] = useState({ key: category.slug, start: reduced, cursor: true, fade: false })
  const { displayed, done } = useScrambleText(catName, 0, (titleState.key === category.slug ? titleState.start : reduced) && !reduced, 0.25)

  useEffect(() => {
    let ids: number[] = []
    ids.push(window.setTimeout(() => {
      setPreviewId(null)
      setTitleState({ key: category.slug, start: reduced, cursor: true, fade: false })
    }, 0))
    
    if (!reduced) {
      ids.push(window.setTimeout(() => setTitleState(s => ({ ...s, start: true })), 820))
    }
    return () => ids.forEach(clearTimeout)
  }, [category.slug, reduced])

  useEffect(() => {
    if (reduced || !done) return
    const id1 = window.setTimeout(() => setTitleState(s => ({ ...s, fade: true })), 1000)
    const id2 = window.setTimeout(() => setTitleState(s => ({ ...s, cursor: false })), 1750)
    return () => { clearTimeout(id1); clearTimeout(id2) }
  }, [done, reduced])

  useEffect(() => {
    const onHide = () => document.hidden && setPreviewId(null)
    document.addEventListener('visibilitychange', onHide)
    return () => { document.removeEventListener('visibilitychange', onHide); setPreviewId(null) }
  }, [])

  if (!categories.find(i => i.enabled && i.slug === categoryId)) return <Navigate to={`/work/${category.slug}`} replace />

  return (
    <div className={styles.page}>
      <div className={styles.ambientBackground} aria-hidden="true">
        <span className={styles.primaryGlow} /><span className={styles.secondaryGlow} /><span className={styles.gridOverlay} />
      </div>
      <Header />
      <main className={styles.main}>
        <motion.div className={styles.headerGroup} ref={setRef} initial={initial} animate={controls} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } }}>
          <MotionLink className={styles.back} to="/" onClick={(e) => { e.preventDefault(); setPendingHomepageSection('projects'); navigate('/') }} variants={headerVars} transition={{ duration: reduced ? 0 : 0.7, ease: premiumEase }} whileTap={reduced ? undefined : { scale: 0.96 }}>
            <span className={styles.backArrow} aria-hidden="true">&larr;</span><span className={styles.backText}>{siteContent.categoryPage.back}</span>
          </MotionLink>
          <motion.p className={styles.breadcrumb} variants={headerVars} transition={{ duration: reduced ? 0 : 0.7, ease: premiumEase }}>
            <span>{siteContent.categoryPage.work}</span><b aria-hidden="true">&gt;</b><span>{catName}</span>
          </motion.p>
          <AnimatePresence mode="wait">
            <motion.div className={styles.titleBlock} key={category.slug} initial={reduced ? false : { opacity: 0, y: 28, filter: 'blur(8px)', letterSpacing: '-0.015em' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '-0.05em' }} exit={reduced ? undefined : { opacity: 0, y: -12, filter: 'blur(8px)' }} transition={{ duration: reduced ? 0 : 0.65, ease: premiumEase }}>
              <h1 aria-label={catName}>
                <span aria-hidden="true">{reduced ? catName : displayed}</span>
                {!reduced && (titleState.key === category.slug ? titleState.cursor : true) && (
                  <span className={`${styles.titleCursor} ${done ? styles.blinking : ''} ${titleState.fade ? styles.fading : ''}`} aria-hidden="true">|</span>
                )}
              </h1>
              <p className={styles.categoryDescription}>{portfolioCategories.find(i => i.slug === category.slug)?.description}</p>
              <div className={styles.titleMeta}>
                <motion.span className={styles.titleAccent} initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduced ? 0 : 0.7, ease: premiumEase }} />
                <span>{String(items.length).padStart(2, '0')} PROJECTS</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <motion.div className={styles.filters} role="tablist" variants={headerVars} transition={{ duration: reduced ? 0 : 0.7, ease: premiumEase }}>
            {categories.filter(i => i.enabled).map(filter => {
              const active = category.slug === filter.slug
              return (
                <Link className={`${styles.filterLink} ${active ? styles.active : ''}`} to={`/work/${filter.slug}`} role="tab" aria-selected={active} key={filter.slug}>
                  {active && <motion.span className={styles.activePill} layoutId="category-active-pill" transition={{ duration: reduced ? 0 : 0.32, ease: premiumEase }} />}
                  <span className={styles.filterLabel}>{portfolioCategories.find(i => i.slug === filter.slug)?.label ?? filter.slug.split('-').map(w => w[0]?.toUpperCase() + w.slice(1)).join(' ')}</span>
                </Link>
              )
            })}
          </motion.div>
        </motion.div>
        <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.45, ease: premiumEase }}>
          <AnimatePresence mode="wait">
            <motion.section className="category-project-grid" key={category.slug} initial={reduced ? false : { opacity: 0, y: 18, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: -12, scale: 0.99 }} transition={{ duration: reduced ? 0 : 0.45, ease: premiumEase }}>
              {items.map((project, index) => (
                <CategoryProjectCard key={project.id} project={project} index={index} activePreviewId={previewId} setActivePreviewId={setPreviewId} onWatch={(p, o) => { setPreviewId(null); setSelected({ project: p, opener: o }) }} />
              ))}
            </motion.section>
          </AnimatePresence>
        </motion.div>
      </main>
      <Footer />
      <ProjectModal key={selected?.project.id ?? 'closed'} project={selected?.project ?? null} returnFocusElement={selected?.opener} onClose={() => setSelected(null)} />
    </div>
  )
}
export default CategoryPage