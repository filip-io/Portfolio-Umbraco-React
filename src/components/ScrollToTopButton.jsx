
const ScrollToTopButton = ({ className }) => {
    const handleClick = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    };

    return (
        <button className={className} onClick={handleClick}>
            To top ↑
        </button>
    );
};

export default ScrollToTopButton;

