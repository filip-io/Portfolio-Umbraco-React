import { useEffect } from 'react';
import dennisPic from '../assets/dennis.gif'

function MagicWordModal({ isOpen, onClose }) {
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

    return (
        <div className="modal" onClick={handleClickOutside}>
            <div className="modal-content">
                <div className="modal-close-container">
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <img src={dennisPic} alt="Dennis saying 'Ah ah ah, you didn't say the magic word'" />
            </div>
        </div>
    );
}

export default MagicWordModal;
