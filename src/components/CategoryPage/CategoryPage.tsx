import { useState, type MouseEvent } from 'react'
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
import styles from './CategoryPage.module.css'
import './category-grid.css'

export function CategoryPage() {
  const { categoryId = 'logo-animation' } = useParams()
  const navigate = useNavigate()
  const { t, locale } = useTranslation()
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

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Link className={styles.back} to={homePath} onClick={handleBackToProjects}>
          <span aria-hidden="true">←</span>
          <span>{t.common.back}</span>
        </Link>
        <p className={styles.breadcrumb}>
          {t.common.work} <b>›</b> {categoryName}
        </p>
        <h1>{categoryName}</h1>
        <div className={styles.filters} role="tablist" aria-label={t.common.categories}>
          {categories.filter((item) => item.enabled).map((filter) => (
            <Link
              className={category.slug === filter.slug ? styles.active : ''}
              to={`${localePrefix(locale)}/work/${filter.slug}`}
              role="tab"
              aria-selected={category.slug === filter.slug}
              key={filter.slug}
            >
              {t.categories[filter.slug as keyof typeof t.categories]
                ?? filter.slug.split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')}
            </Link>
          ))}
        </div>
        <section
          className="category-project-grid"
          aria-label={`${categoryName} ${t.common.projects}`}
        >
          {items.map((project) => (
            <CategoryProjectCard project={project} onWatch={setSelectedProject} key={project.id} />
          ))}
        </section>
      </main>
      <Footer />
      <ProjectModal
        key={selectedProject?.id ?? 'closed'}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}

export default CategoryPage
