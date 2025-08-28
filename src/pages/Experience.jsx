import { useState, useEffect } from 'react';
import { fetchExperiences } from '../api/umbraco';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ExperienceModal from '../components/ExperienceModal';

export default function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [openModal, setOpenModal] = useState(null);

    useEffect(() => {
        loadExperiences();
    }, []);

    const loadExperiences = async () => {
        setLoading(true);
        try {
            const data = await fetchExperiences();
            setExperiences(data.items || []);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching experiences:', error);
            setErrorMessage('Failed to load experience data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const openExperienceModal = (id) => {
        setOpenModal(id);
    };

    const closeExperienceModal = () => {
        setOpenModal(null);
    };

    const getExperienceImage = (experience) => {
        if (experience.properties.image && experience.properties.image.length > 0) {
            const imageUrl = experience.properties.image[0].url;
            if (imageUrl.startsWith('/')) {
                const BASE = import.meta.env.VITE_UMBRACO_BASE;
                return `${BASE}${imageUrl}`;
            }
            return imageUrl;
        }
        return '';
    };

    return (
        <main>
            <header>
                <div className="experience-title">
                    <h2 className="section-title">Experience</h2>
                </div>
            </header>

            {loading && (
                <article className="experience-container">
                    <div className="spinner"></div>
                </article>
            )}

            {errorMessage && (
                <article className="experience-container">
                    <p className="error-message">{errorMessage}</p>
                    <button className="btn" onClick={loadExperiences}>Retry</button>
                </article>
            )}

            {!loading && !errorMessage && (
                <article className="experience-container">
                    {experiences.map((xp) => (
                        <div key={xp.id} className="experience-container-content">
                            <div className="experience-description">
                                <h2>{xp.properties.title}</h2>
                                <p>{xp.properties.company}</p>
                                <h3>{xp.properties.location}</h3>
                                <button className="btn" onClick={() => openExperienceModal(xp.id)}>More info</button>
                                <ExperienceModal
                                    isOpen={openModal === xp.id}
                                    onClose={closeExperienceModal}
                                    title={xp.properties.title}
                                    company={xp.properties.company}
                                    years={xp.properties.years}
                                    responsibilities={xp.properties.responsibilities || []}
                                />
                            </div>
                            <div className="experience-img-wrapper">
                                <img
                                    src={getExperienceImage(xp)}
                                    alt={`${xp.properties.company} logo`}
                                />
                            </div>
                        </div>
                    ))}
                    
                    {experiences.length === 0 && !loading && !errorMessage && (
                        <div className="no-experiences">
                            <p>No experience data found.</p>
                        </div>
                    )}
                    
                    <ScrollToTopButton className="btn" />
                </article>
            )}
        </main>
    );
}