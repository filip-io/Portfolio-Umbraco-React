export default function Contact() {
    return (
        <main className="contact-main-container">
            <article className="contact-container">
                <div className="contact-title">
                    <header>
                        <h1>Would you like to know more?</h1>
                    </header>
                </div>

                <div className="contact-sub-title">
                    <h2>Get in touch:</h2>
                </div>

                <div className="contact-icons-container">
                    <a href="https://github.com/filip-io" target="_blank" rel="noopener noreferrer" className="contact-icons-container-icon" aria-label="GitHub"><i className="fa-brands fa-github fa-2xl"></i></a>
                    <a href="http://www.linkedin.com/in/filipnilsson-link" target="_blank" rel="noopener noreferrer" className="contact-icons-container-icon" aria-label="LinkedIn"><i className="fa-brands fa-linkedin fa-2xl"></i></a>
                </div>

                <form action="https://api.web3forms.com/submit" method="POST" className="contact-input-container">
                    <input type="hidden" name="access_key" value="74deb914-d2c4-4ab1-8e53-c24001f9ffd1" />

                    <label htmlFor="name" className="contact-sr-only">Your Name:</label>
                    <input type="text" id="name" name="name" placeholder="Your Name" autoComplete="name" className="contact-inputs" required />

                    <label htmlFor="email" className="contact-sr-only">Your Email:</label>
                    <input type="email" id="email" name="email" placeholder="Your Email" autoComplete="email" className="contact-inputs" required />

                    <label htmlFor="message" className="contact-sr-only">Your Message:</label>
                    <textarea id="message" name="message" placeholder="Your Message" className="contact-inputs-textfield" required></textarea>

                    <div className="contact-btn-box">
                        <button type="submit" className="btn">Send</button>
                    </div>
                </form>
            </article>
        </main>
    );
}