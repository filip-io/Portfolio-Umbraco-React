import { useState, useEffect } from 'react';
import { fetchEducations } from '../api/umbraco';
import ScrollToTopButton from '../components/ScrollToTopButton';
import EducationModal from '../components/EducationModal';

export default function Education() {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [openModal, setOpenModal] = useState(null);

    useEffect(() => {
        loadEducations();
    }, []);

    const loadEducations = async () => {
        setLoading(true);
        try {
            const data = await fetchEducations();
            setEducations(data.items || []);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching educations:', error);
            setErrorMessage('Failed to load education data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const openEducationModal = (id) => {
        setOpenModal(id);
    };

    const closeEducationModal = () => {
        setOpenModal(null);
    };

    const getEducationImage = (education) => {
        if (education.properties.image && education.properties.image.length > 0) {
            const imageUrl = education.properties.image[0].url;
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
                <div className="education-title">
                    <h2 className="section-title">Education</h2>
                </div>
            </header>

            {loading && (
                <article className="education-container">
                    <div className="spinner"></div>
                </article>
            )}

            {errorMessage && (
                <article className="education-container">
                    <p className="error-message">{errorMessage}</p>
                    <button className="btn" onClick={loadEducations}>Retry</button>
                </article>
            )}

            {!loading && !errorMessage && (
                <article className="education-container">
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
                    
                    {educations.length === 0 && !loading && !errorMessage && (
                        <div className="no-educations">
                            <p>No education data found.</p>
                        </div>
                    )}
                    
                    <ScrollToTopButton className="btn" />
                </article>
            )}
        </main>
    );
}