import { useEffect, useState } from "react";
import { fetchAbout } from "../api/umbraco";
import { getMediaUrl } from "../utils/media";

export default function AboutMe() {
  const [about, setAbout] = useState(null);
  const [techGroups, setTechGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    setLoading(true);
    try {
      const data = await fetchAbout();
      
      const aboutSection = data.items[0];
      setAbout(aboutSection);

      // Extract and group technologies from the about section
      if (aboutSection?.properties?.technologies?.items) {
        const grouped = {};
        
        aboutSection.properties.technologies.items.forEach(item => {
          const tech = item.content.properties;
          const category = tech.backendOrFrontend || "Other";
          
          if (!grouped[category]) grouped[category] = [];
          grouped[category].push({
            label: tech.technologyName,
            icon: tech.deviconName,
            altText: tech.altText
          });
        });
        
        setTechGroups(grouped);
      }
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching about data:', error);
      setErrorMessage('Failed to load about information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDescription = (description) => {
    if (!description) return [];
    
    // Split by double newlines to create paragraphs
    return description
      .split('\n\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);
  };

  if (loading) {
    return (
      <main>
        <article className="about-me-container">
          <div className="spinner"></div>
        </article>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main>
        <article className="tech-intro">
          <p className="error-message">{errorMessage}</p>
          <button className="btn" onClick={loadAbout}>Retry</button>
        </article>
      </main>
    );
  }

  if (!about) {
    return (
      <main>
        <article className="about-me-container">
          <p>No about information found.</p>
        </article>
      </main>
    );
  }

  const aboutImage = about.properties.image?.[0]
    ? getMediaUrl(about.properties.image[0])
    : null;

  const descriptionParagraphs = formatDescription(about.properties.aboutDescription);

  return (
    <main>
      <article className="about-me-container">
        <div className="about-me-container-box">
          <div className="about-me-container-left-box">
            {aboutImage && (
              <img
                src={aboutImage}
                alt={about.properties.image?.[0]?.name || "Picture of Filip"}
                className="filip-about-pic"
              />
            )}
          </div>

          <div className="about-me-container-right-box">
            <h2>{about.properties.aboutTitle}</h2>
            {descriptionParagraphs.length > 0 ? (
              descriptionParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>No description available.</p>
            )}
          </div>
        </div>

        <article>
          <h1 className="tech-intro">Technologies I have worked with</h1>
          {Object.keys(techGroups).map(category => (
            <div key={category} className="tech-category-container">
              <h2>{category}</h2>
              <div className="tech-container">
                {techGroups[category].map((item, idx) => (
                  <div key={idx} className="tech-item-container">
                    <div className="tech-icon-container">
                      <i className={item.icon} aria-label={item.altText}></i>
                      <span className="tech-label">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </article>
      </article>
    </main>
  );
}