import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Modal({ isOpen, onClose, title, content, url, urlText, urlTarget, componentUrl }) {
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
                <h2>{title}</h2>
                {content.map((desc, index) => (
                    <p key={index}>{desc}</p>
                ))}
                <br />
                {url && (
                    <a 
                        href={url} 
                        target={urlTarget || "_blank"} 
                        rel="noopener noreferrer"
                    >
                        {urlText}
                    </a>
                )}
                {componentUrl && (
                    <p><NavLink to={componentUrl}>Show gallery</NavLink></p>
                )}
            </div>
        </div>
    );
}

export default Modal;