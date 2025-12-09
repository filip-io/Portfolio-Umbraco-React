import { useState, useEffect } from 'react';
import { fetchExperiences } from '../api/umbraco';
import { getMediaUrl } from "../utils/media";
import ScrollToTopButton from '../components/ScrollToTopButton';
import ExperienceModal from '../components/ExperienceModal';

export default function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [openModal, setOpenModal] = useState(null);
    const [cacheInfo, setCacheInfo] = useState(null); // Optional: for cache debugging

    useEffect(() => {
        loadExperiences();
    }, []);

    const loadExperiences = async () => {
        setLoading(true);
        try {
            const data = await fetchExperiences();

            // The Cloudflare worker returns the data with cache metadata
            setExperiences(data.items || []);

            // Optional: Display cache information for debugging
            if (data._cache) {
                setCacheInfo(data._cache);
                console.log('Cache info:', data._cache);
            }

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

    return (
        <main>
            <header>
                <div className="experience-title">
                    <h2 className="section-title">Experience</h2>
                    {/* {cacheInfo && (
                        <div className="cache-info" style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                            Cache: {cacheInfo.status} (Age: {cacheInfo.age}s)
                        </div>
                    )} */}
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
                                    src={getMediaUrl(xp.properties.image?.[0])}
                                    alt={`${xp.properties.company} logo`}
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/600x400?text=Image+Not+Found';
                                    }}
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