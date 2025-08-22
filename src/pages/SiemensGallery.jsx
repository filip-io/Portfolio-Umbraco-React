import { NavLink } from "react-router-dom"
import siemensLogo from "../assets/siemens.jpg"
import siemensSharepointImg1 from "../assets/siemens-sharepoint.png"
import siemensSharepointImg2 from "../assets/siemens-sharepoint-support.png"
import siemensSharepointImg3 from "../assets/siemens-sharepoint-ofs.png"
import siemensSharepointImg4 from "../assets/siemens-sharepoint-travel.png"

export default function SiemensGallery() {
    return (
            <main className="home-main-container">
                <div className="home-main-title-container">
                    <div className="home-main-container-left-box">
                        <h1>SCM Nordics</h1>
                        <h2>Sharepoint</h2>
                    </div>
                    <div className="home-main-container-right-box">
                        <img src={siemensLogo} alt="Siemens logo" className="siemens-gallery-icon" />
                    </div>
                </div>
                <article className="siemens-gallery-container">
                    <div className="siemens-gallery-wrapper">
                        <div><img src={siemensSharepointImg1} alt="Image of Siemens sharepoint site"
                            className="siemens-gallery-img" /></div>

                        <div><img src={siemensSharepointImg2} alt="Image of Siemens sharepoint site"
                            className="siemens-gallery-img" /></div>

                        <div><img src={siemensSharepointImg3} alt="Image of Siemens sharepoint site"
                            className="siemens-gallery-img" /></div>

                        <div><img src={siemensSharepointImg4} alt="Image of Siemens sharepoint site"
                            className="siemens-gallery-img" /></div>
                    </div>
                    <br />
                    <NavLink to="/projects" className="btn">Back to projects</NavLink>
                    <br />
                </article>
            </main>
    );
}
