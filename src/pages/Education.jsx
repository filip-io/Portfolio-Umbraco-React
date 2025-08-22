import { useState, useEffect } from 'react';
import { fetchEducations } from '../api/umbraco';
import ScrollToTopButton from '../components/ScrollToTopButton';
import EducationModal from '../components/EducationModal';

export default function Education() {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(null);

    useEffect(() => {
        const loadEducations = async () => {
            try {
                setLoading(true);
                const data = await fetchEducations();
                setEducations(data.items || []);
            } catch (err) {
                setError('Failed to load education data');
                console.error('Error fetching educations:', err);
            } finally {
                setLoading(false);
            }
        };

        loadEducations();
    }, []);

    const openEducationModal = (id) => {
        setOpenModal(id);
    };

    const closeEducationModal = () => {
        setOpenModal(null);
    };

    const getEducationImage = (education) => {
        // Check if education has an image array with at least one image
        if (education.properties.image && education.properties.image.length > 0) {
            const imageUrl = education.properties.image[0].url;
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
                <div className="loading">Loading education data...</div>
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
            <article className="education-container">
                <header>
                    <div className="education-title">
                        <h2 className="section-title">Education</h2>
                    </div>
                </header>
                {educations.map((edu) => (
                    <div key={edu.id} className="education-container-content">
                        <div className="education-description">
                            <h2>{edu.properties.title}</h2>
                            <p>{edu.properties.school}</p>
                            <h3>{edu.properties.location}</h3>
                            <button className="btn" onClick={() => openEducationModal(edu.id)}>More info</button>
                            <EducationModal
                                isOpen={openModal === edu.id}
                                onClose={closeEducationModal}
                                title={edu.properties.title}
                                institution={edu.properties.school}
                                years={edu.properties.years}
                                description={edu.properties.description}
                            />
                        </div>
                        <div className="education-img-wrapper">
                            <img
                                src={getEducationImage(edu)}
                                alt={`${edu.properties.title} logo`}
                            />
                        </div>
                    </div>
                ))}
                <ScrollToTopButton className="btn" />
            </article>
        </main>
    );
}