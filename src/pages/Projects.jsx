import { useState, useEffect } from 'react'
import { fetchProjects } from '../api/umbraco'
import Modal from '../components/ProjectModal'
import ScrollToTopButton from '../components/ScrollToTopButton'

// Default fallback images
import gitHubLogo from '../assets/git.jpg'

export default function Projects() {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [openModal, setOpenModal] = useState(null)
    // GitHub repositories state
    const [loadingRepos, setLoadingRepos] = useState(false)
    const [repositories, setRepositories] = useState([])
    const [repoErrorMessage, setRepoErrorMessage] = useState('')

    useEffect(() => {
        loadProjects()
    }, [])

    const loadProjects = async () => {
        setLoading(true)
        try {
            const data = await fetchProjects()
            setProjects(data.items || [])
            setErrorMessage('')
        } catch (error) {
            console.error('Error fetching projects:', error)
            setErrorMessage('Failed to load projects. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const fetchRepositories = async () => {
        setLoadingRepos(true)

        setTimeout(async () => {
            try {
                const response = await fetch('https://api.github.com/users/filip-io/repos')
                if (!response.ok) {
                    throw new Error('Failed to fetch repositories')
                }
                const data = await response.json()
                setRepositories(data)
                setRepoErrorMessage('')
            } catch (error) {
                console.error('Error fetching repositories:', error)
                setRepoErrorMessage('Failed to load repositories. Please try again later.')
            }
            setLoadingRepos(false)
        }, 2000)
    }

    const openProjectModal = (id) => {
        setOpenModal(id)
    }

    const closeProjectModal = () => {
        setOpenModal(null)
    }

    const getProjectImage = (project) => {
        // Check if project has an image array with at least one image
        if (project.properties.image && project.properties.image.length > 0) {
            const imageUrl = project.properties.image[0].url
            // If the URL is relative, prepend the base URL
            if (imageUrl.startsWith('/')) {
                const BASE = import.meta.env.VITE_UMBRACO_BASE
                return `${BASE}${imageUrl}`
            }
            return imageUrl
        }
        // Fallback to default image
        return gitHubLogo
    }

    const formatModalContent = (description) => {
        // Handle the plain text description from Umbraco
        if (description && typeof description === 'string') {
            // Split by double newlines to create paragraphs
            const paragraphs = description
                .split('\n\n')
                .map(p => p.trim())
                .filter(p => p.length > 0)
            return paragraphs.length > 0 ? paragraphs : ['No detailed description available']
        }
        return ['No detailed description available']
    }

    const getProjectUrl = (project) => {
        // Use the projectUrl array from Umbraco data
        if (project.properties.projectUrl && project.properties.projectUrl.length > 0) {
            return project.properties.projectUrl[0].url
        }
        return null
    }

    const getUrlText = (project) => {
        // Use the title from projectUrl array, or fallback
        if (project.properties.projectUrl && project.properties.projectUrl.length > 0) {
            return project.properties.projectUrl[0].title || 'View Project'
        }
        return 'View Project'
    }

    const getUrlTarget = (project) => {
        // Get the target from projectUrl array
        if (project.properties.projectUrl && project.properties.projectUrl.length > 0) {
            return project.properties.projectUrl[0].target || '_self'
        }
        return '_self'
    }

    const getUrlComponent = (project) => {
        // Use the componentUrl from Umbraco data if available
        return project.properties.componentUrl || null
    }

    // GitHub repository filtering and sorting
    const excludedRepoNames = ['Portfolio-Umbraco-React', 'Portfolio-Umbraco-Headless', 'Reliable-Reservations', 'FantasyChas-Backend', 'AudialAtlasService', 'Mini_project-API', 'BankNyBank', 'Portfolio-react', 'git-test', 'git']
    const filteredRepositories = repositories.filter(repo => !excludedRepoNames.includes(repo.name))
    const sortedRepositories = filteredRepositories.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    return (
        <main>
            <header>
                <div className="projects-title">
                    <h2 className="section-title">Projects</h2>
                </div>
            </header>

            {loading && (
                <article className="projects-container">
                    <div className="spinner"></div>
                </article>
            )}

            {errorMessage && (
                <article className="projects-container">
                    <p className="error-message">{errorMessage}</p>
                    <button className="btn" onClick={loadProjects}>Retry</button>
                </article>
            )}

            {!loading && !errorMessage && (
                <article className="projects-container">
                    {projects.map((project, index) => (
                        <div
                            className={`project-container-${index % 2 === 0 ? 'left' : 'right'}`}
                            key={project.id}
                        >
                            <div className="projects-img-wrapper">
                                <img
                                    src={getProjectImage(project)}
                                    alt={`${project.properties.title} logo`}
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        e.target.src = gitHubLogo
                                    }}
                                />
                            </div>
                            <div className="project-description">
                                <h2>{project.properties.title}</h2>
                                {project.properties.subTitle && (
                                    <p>{project.properties.subTitle}</p>
                                )}
                                <button className="btn" onClick={() => openProjectModal(project.id)}>
                                    More info
                                </button>
                                <Modal
                                    isOpen={openModal === project.id}
                                    onClose={closeProjectModal}
                                    title={project.properties.title}
                                    content={formatModalContent(project.properties.description)}
                                    url={getProjectUrl(project)}
                                    urlText={getUrlText(project)}
                                    urlTarget={getUrlTarget(project)}
                                    componentUrl={getUrlComponent(project)}
                                />
                            </div>
                        </div>
                    ))}

                    {projects.length === 0 && !loading && !errorMessage && (
                        <div className="no-projects">
                            <p>No projects found.</p>
                        </div>
                    )}
                </article>
            )}

            {/* GitHub Repositories Section */}
            <article className="projects-container">
                {!loadingRepos && repositories.length === 0 && !repoErrorMessage && (
                    <button className="btn" onClick={fetchRepositories}>
                        Load GitHub Repositories
                    </button>
                )}
                {loadingRepos && <div className="spinner"></div>}
                {repoErrorMessage && (
                    <>
                        <p className="error-message">{repoErrorMessage}</p>
                        <button className="btn" onClick={fetchRepositories}>Retry</button>
                    </>
                )}
            </article>

            {/* GitHub Repositories Display */}
            {sortedRepositories.length > 0 && (
                <article className="projects-container">
                    {sortedRepositories.map((repo, index) => (
                        <div
                            className={`project-container-${index % 2 === 0 ? 'left' : 'right'}`}
                            key={repo.id}
                        >
                            <div className="projects-img-wrapper">
                                <img src={gitHubLogo} alt="GitHub logo" />
                            </div>
                            <div className="project-description">
                                <h2>{repo.name}</h2>
                                <p>{repo.description || 'No description available'}</p>
                                <a
                                    className="btn"
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    ))}

                    <ScrollToTopButton className="btn" />
                </article>
            )}

            {/* Show ScrollToTopButton for projects fetched from Umbraco if no GitHub repos */}
            {sortedRepositories.length === 0 && (
                <ScrollToTopButton className="btn" />
            )}
        </main>
    )
}