import { useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { categories } from '../../data/categories'
import { projects, type Project } from '../../data/projects'
import { localePrefix } from '../../translations'
import { useTranslation } from '../../translations/useTranslation'
import { Footer } from '../Footer/footer'
import { Header } from '../Header/header'
import { CategoryProjectCard } from '../CategoryProjectCard/CategoryProjectCard'
import { ProjectModal } from '../ProjectModal/ProjectModal'
import { setPendingHomepageSection } from '../../utils/sectionNavigation'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './CategoryPage.module.css'
import './category-grid.css'

const MotionLink = motion.create(Link)
const premiumEase = [0.25, 0.1, 0.25, 1] as const

const headerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export function CategoryPage() {
  const { categoryId = 'logo-animation' } = useParams()
  const navigate = useNavigate()
  const { t, locale } = useTranslation()
  const prefersReducedMotion = useReducedMotion()
  const category = categories.find((item) => item.enabled && item.slug === categoryId)
    ?? categories.find((item) => item.enabled)!
  const items = projects.filter(
    (project) => project.enabled && project.categorySlug === category.slug,
  )
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const categoryName =
    t.categories[category.slug as keyof typeof t.categories]
    ?? category.slug.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')
  const homePath = localePrefix(locale) || '/'

  const handleBackToProjects = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setPendingHomepageSection('projects')
    navigate(homePath)
  }

  const handleGlowMove = (event: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return
    event.currentTarget.style.setProperty('--category-glow-x', `${event.clientX}px`)
    event.currentTarget.style.setProperty('--category-glow-y', `${event.clientY}px`)
    event.currentTarget.style.setProperty('--category-glow-opacity', '0.08')
  }

  const handleGlowLeave = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--category-glow-opacity', '0')
  }

  return (
    <div className={styles.page} onMouseMove={handleGlowMove} onMouseLeave={handleGlowLeave}>
      <Header />
      <main className={styles.main}>
        <motion.div
          className={styles.headerGroup}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
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
            <span className={styles.backText}>{t.common.back}</span>
          </MotionLink>
          <motion.p
            className={styles.breadcrumb}
            variants={headerItemVariants}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
          >
            {t.common.work} <b>›</b> {categoryName}
          </motion.p>
          <motion.h1
            variants={headerItemVariants}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
          >
            {categoryName}
          </motion.h1>
          <motion.div
            className={styles.filters}
            role="tablist"
            aria-label={t.common.categories}
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
                    {t.categories[filter.slug as keyof typeof t.categories]
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
            aria-label={`${categoryName} ${t.common.projects}`}
            key={category.slug}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: premiumEase }}
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
        viewport={{ once: true, amount: 0.2 }}
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
