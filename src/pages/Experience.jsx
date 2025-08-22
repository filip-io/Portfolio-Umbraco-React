import { useState, useEffect } from 'react';
import { fetchExperiences } from '../api/umbraco';
import ScrollToTopButton from '../components/ScrollToTopButton';
import ExperienceModal from '../components/ExperienceModal';

export default function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(null);

    useEffect(() => {
        const loadExperiences = async () => {
            try {
                setLoading(true);
                const data = await fetchExperiences();
                setExperiences(data.items || []);
            } catch (err) {
                setError('Failed to load experience data');
                console.error('Error fetching experiences:', err);
            } finally {
                setLoading(false);
            }
        };

        loadExperiences();
    }, []);

    const openExperienceModal = (id) => {
        setOpenModal(id);
    };

    const closeExperienceModal = () => {
        setOpenModal(null);
    };

    const getExperienceImage = (experience) => {
        // Check if experience has an image array with at least one image
        if (experience.properties.image && experience.properties.image.length > 0) {
            const imageUrl = experience.properties.image[0].url;
            // If the URL is relative, prepend the base URL
            if (imageUrl.startsWith('/')) {
                const BASE = import.meta.env.VITE_UMBRACO_BASE;
                return `${BASE}${imageUrl}`;
            }
            return imageUrl;
        }
        // Return a placeholder or empty string if no image is available
        return ''; // or a placeholder image URL
    };

    if (loading) {
        return (
            <main>
                <div className="loading">Loading experience data...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main>
                <div className="error">{error}</div>
            </main>
        );
    }

    return (
        <main>
            <header>
                <div className="experience-title">
                    <h2 className="section-title">Experience</h2>
                </div>
            </header>
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
                <ScrollToTopButton className="btn" />
            </article>
        </main>
    );
}