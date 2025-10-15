'use client'

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <h2 className="section-title">Let's Create Together</h2>
      <div className="contact-form">
        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
          {/* Netlify form helpers */}
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>Don’t fill this out: <input name="bot-field" /></label>
          </p>

          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input id="name" name="name" type="text" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="project">Project Type</label>
            <select id="project" name="project" defaultValue="">
              <option value="">Select a project type</option>
              <option value="film">Feature Film</option>
              <option value="game">Video Game</option>
              <option value="commercial">Commercial/Advertisement</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Project Details</label>
            <textarea id="message" name="message" placeholder="Tell me about your project..." required />
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  )
}
