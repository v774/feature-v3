import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { categories, portfolioCategories, projects, type CategoryProject as Project } from '../../content/portfolioContent'
import { siteContent } from '../../content/siteContent'
import { localePrefix } from '../../translations'
import { useTranslation } from '../../translations/useTranslation'
import { Footer } from '../Footer/footer'
import { Header } from '../Header/header'
import { CategoryProjectCard } from '../CategoryProjectCard/CategoryProjectCard'
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
  const category = categories.find((item) => item.enabled && item.slug === categoryId)
    ?? categories.find((item) => item.enabled)!
  const items = projects.filter(
    (project) => project.enabled && project.categorySlug === category.slug,
  )
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const categoryName =
    portfolioCategories.find((item) => item.slug === category.slug)?.label
    ?? category.slug.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')
  const [categoryTitleStart, setCategoryTitleStart] = useState({ key: categoryName, started: prefersReducedMotion })
  const startCategoryTitle = categoryTitleStart.key === categoryName ? categoryTitleStart.started : prefersReducedMotion
  const { displayed: categoryTitleText, done: categoryTitleDone } = useScrambleText(categoryName, 0, startCategoryTitle && !prefersReducedMotion, 0.25)
  const visibleCategoryTitle = prefersReducedMotion ? categoryName : categoryTitleText
  const [categoryCursor, setCategoryCursor] = useState({ key: categoryName, visible: true, fading: false })
  const showCategoryCursor = categoryCursor.key === categoryName ? categoryCursor.visible : true
  const fadeCategoryCursor = categoryCursor.key === categoryName ? categoryCursor.fading : false
  const homePath = localePrefix(locale) || '/'

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const startTitleId = window.setTimeout(() => setCategoryTitleStart({ key: categoryName, started: true }), 820)
    return () => window.clearTimeout(startTitleId)
  }, [categoryName, prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || !categoryTitleDone) return undefined

    const fadeCursorId = window.setTimeout(() => setCategoryCursor({ key: categoryName, visible: true, fading: true }), 1000)
    const hideCursorId = window.setTimeout(() => setCategoryCursor({ key: categoryName, visible: false, fading: true }), 1750)
    return () => {
      window.clearTimeout(fadeCursorId)
      window.clearTimeout(hideCursorId)
    }
  }, [categoryName, categoryTitleDone, prefersReducedMotion])

  const handleBackToProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setPendingHomepageSection('projects')
    navigate(homePath)
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
            <span className={styles.backArrow} aria-hidden="true">←</span>
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
              <CategoryProjectCard project={project} index={index} onWatch={setSelectedProject} key={project.id} />
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
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}

export default CategoryPage
