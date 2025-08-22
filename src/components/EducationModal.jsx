import { useEffect } from 'react';

function EducationModal({ isOpen, onClose, title, institution, years, description }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleClickOutside = (event) => {
        if (event.target.className === 'modal') {
            onClose();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' || event.keyCode === 27) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!isOpen) return null;

    // Split description by newlines and filter out empty lines
    const descriptionLines = description ? description.split('\n').filter(line => line.trim()) : [];

    return (
        <div className="modal" onClick={handleClickOutside}>
            <div className="modal-content">
                <div className="modal-close-container">
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <h2>{title}</h2>
                <h3>{institution}</h3>
                <h4>{years}</h4>
                {descriptionLines.length > 0 && (
                    <div>
                        {descriptionLines.map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EducationModal;