import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { categories, portfolioCategories, projects, type CategoryProject as Project } from '../../content/portfolioContent'
import { siteContent } from '../../content/siteContent'
import { localePrefix } from '../../translations'
import { useTranslation } from '../../translations/useTranslation'
import { Footer } from '../Footer/footer'
import { Header } from '../Header/header'
import { CategoryProjectCard } from '../CategoryProjectCard/CategoryProjectCard'
import { GalleryLamp } from '../GalleryLamp/GalleryLamp'
import { ProjectModal } from '../ProjectModal/ProjectModal'
import { setPendingHomepageSection } from '../../utils/sectionNavigation'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useScrambleText } from '../../hooks/useScrambleText'
import { premiumEase, repeatableViewport } from '../../utils/motionConfig'
import styles from './CategoryPage.module.css'
import './category-grid.css'

const MotionLink = motion.create(Link)

const headerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function CategoryPage() {
  const { categoryId = 'logo-animation' } = useParams()
  const navigate = useNavigate()
  const { locale } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const matchedCategory = categories.find((item) => item.enabled && item.slug === categoryId)
  const fallbackCategory = categories.find((item) => item.enabled)!
  const category = matchedCategory ?? fallbackCategory
  const items = projects.filter(
    (project) => project.enabled && project.categorySlug === category.slug,
  )
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null)
  const [returnFocusElement, setReturnFocusElement] = useState<HTMLElement | null>(null)
  const categoryName =
    portfolioCategories.find((item) => item.slug === category.slug)?.label
    ?? category.slug.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')
  const [categoryTitleStart, setCategoryTitleStart] = useState({ key: category.slug, started: prefersReducedMotion })
  const startCategoryTitle = categoryTitleStart.key === category.slug ? categoryTitleStart.started : prefersReducedMotion
  const { displayed: categoryTitleText, done: categoryTitleDone } = useScrambleText(categoryName, 0, startCategoryTitle && !prefersReducedMotion, 0.25)
  const visibleCategoryTitle = prefersReducedMotion ? categoryName : categoryTitleText
  const [categoryCursor, setCategoryCursor] = useState({ key: category.slug, visible: true, fading: false })
  const showCategoryCursor = categoryCursor.key === category.slug ? categoryCursor.visible : true
  const fadeCategoryCursor = categoryCursor.key === category.slug ? categoryCursor.fading : false
  const homePath = localePrefix(locale) || '/'

  useEffect(() => {
    const resetId = window.setTimeout(() => {
      setActivePreviewId(null)
      setCategoryTitleStart({ key: category.slug, started: prefersReducedMotion })
      setCategoryCursor({ key: category.slug, visible: true, fading: false })
    }, 0)

    if (prefersReducedMotion) {
      return () => window.clearTimeout(resetId)
    }

    const startTitleId = window.setTimeout(() => setCategoryTitleStart({ key: category.slug, started: true }), 820)
    return () => {
      window.clearTimeout(resetId)
      window.clearTimeout(startTitleId)
    }
  }, [category.slug, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || !categoryTitleDone) return undefined

    const fadeCursorId = window.setTimeout(() => setCategoryCursor({ key: category.slug, visible: true, fading: true }), 1000)
    const hideCursorId = window.setTimeout(() => setCategoryCursor({ key: category.slug, visible: false, fading: true }), 1750)
    return () => {
      window.clearTimeout(fadeCursorId)
      window.clearTimeout(hideCursorId)
    }
  }, [category.slug, categoryTitleDone, prefersReducedMotion])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) setActivePreviewId(null)
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  useEffect(() => () => setActivePreviewId(null), [])

  const handleBackToProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setPendingHomepageSection('projects')
    navigate(homePath)
  }

  const openProject = (project: Project, opener: HTMLElement | null) => {
    setActivePreviewId(null)
    setReturnFocusElement(opener)
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
  }

  if (!matchedCategory) {
    return <Navigate to={`${localePrefix(locale)}/work/${fallbackCategory.slug}`} replace />
  }

  return (
    <div className={styles.page}>
      <div className={styles.ambientBackground} aria-hidden="true">
        <span className={styles.primaryGlow} />
        <span className={styles.secondaryGlow} />
        <span className={styles.gridOverlay} />
      </div>
      <Header />
      <main className={styles.main}>
        <motion.div
          className={styles.headerGroup}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={repeatableViewport}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <MotionLink
            className={styles.back}
            to={homePath}
            onClick={handleBackToProjects}
            variants={headerItemVariants}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          >
            <span className={styles.backArrow} aria-hidden="true">&larr;</span>
            <span className={styles.backText}>{siteContent.categoryPage.back}</span>
          </MotionLink>
          <motion.p
            className={styles.breadcrumb}
            variants={headerItemVariants}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
          >
            {siteContent.categoryPage.work} <b>›</b> {categoryName}
          </motion.p>
          <AnimatePresence mode="wait">
            <motion.div
              className={styles.titleBlock}
              key={category.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 28, filter: 'blur(8px)', letterSpacing: '-0.015em' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '-0.05em' }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: premiumEase }}
            >
              <h1 aria-label={categoryName}>
                <span aria-hidden="true">{visibleCategoryTitle}</span>
                {!prefersReducedMotion && showCategoryCursor && (
                  <span className={`${styles.titleCursor}${categoryTitleDone ? ` ${styles.blinking}` : ''}${fadeCategoryCursor ? ` ${styles.fading}` : ''}`} aria-hidden="true">|</span>
                )}
              </h1>
              <div className={styles.titleMeta}>
                <motion.span
                  className={styles.titleAccent}
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
                />
                <span>{String(items.length).padStart(2, '0')} PROJECTS</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <motion.div
            className={styles.filters}
            role="tablist"
            aria-label={siteContent.categoryPage.categoriesAriaLabel}
            variants={headerItemVariants}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
          >
            {categories.filter((item) => item.enabled).map((filter) => {
              const active = category.slug === filter.slug
              return (
                <Link
                  className={`${styles.filterLink}${active ? ` ${styles.active}` : ''}`}
                  to={`${localePrefix(locale)}/work/${filter.slug}`}
                  role="tab"
                  aria-selected={active}
                  key={filter.slug}
                >
                  {active && (
                    <motion.span
                      className={styles.activePill}
                      layoutId="category-active-pill"
                      transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: premiumEase }}
                    />
                  )}
                  <span className={styles.filterLabel}>
                    {portfolioCategories.find((item) => item.slug === filter.slug)?.label
                      ?? filter.slug.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </Link>
              )
            })}
          </motion.div>
        </motion.div>
        <GalleryLamp variant="grid" className={styles.gridLamp} />
        <AnimatePresence mode="wait">
          <motion.section
            className="category-project-grid"
            aria-label={`${categoryName} ${siteContent.categoryPage.projects}`}
            key={category.slug}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: premiumEase }}
          >
            {items.map((project, index) => (
              <CategoryProjectCard
                project={project}
                index={index}
                activePreviewId={activePreviewId}
                setActivePreviewId={setActivePreviewId}
                onWatch={openProject}
                key={project.id}
              />
            ))}
          </motion.section>
        </AnimatePresence>
      </main>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={repeatableViewport}
        transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
      >
        <Footer />
      </motion.div>
      <ProjectModal
        key={selectedProject?.id ?? 'closed'}
        project={selectedProject}
        returnFocusElement={returnFocusElement}
        onClose={closeProject}
      />
    </div>
  )
}

export default CategoryPage