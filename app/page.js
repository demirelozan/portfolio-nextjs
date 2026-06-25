import { notFound } from 'next/navigation'
import { getProjectBySlug, projects } from '../../lib/projects'
import CompositionPage from '../../components/CompositionPage'

// Tell Next.js which slugs to pre-render at build time
export function generateStaticParams() {
  return projects
    .filter(p => p.slug)
    .map(p => ({ slug: p.slug }))
}

// Generate <title> and <meta> tags for each page
export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Not Found' }
  return {
    title: `${project.title} — Ozan Demirel`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : [],
    }
  }
}

export default function SlugPage({ params }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()
  return <CompositionPage project={project} />
}
