import { site } from "@/lib/site";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Contact</div>
        <h1 className="page-title">Contact the site owner.</h1>
        <p className="page-intro">
          Visitors should be able to see that Nihon Diaries has a visible contact path, even while
          the site is still a small static affiliate blog.
        </p>
      </header>
      <section className="contact-grid">
        <article className="contact-card">
          <h3>Send a message</h3>
          <form className="contact-form">
            <label className="label">
              Name
              <input className="input" type="text" placeholder="Your name" />
            </label>
            <label className="label">
              Email
              <input className="input" type="email" placeholder="you@example.com" />
            </label>
            <label className="label">
              Message
              <textarea className="textarea" placeholder="How can we help?" />
            </label>
            <button type="submit" className="btn-secondary">
              Contact form not live yet
            </button>
          </form>
          <p className="form-note">
            This form is presentational only right now. Add a form backend or external form service
            before treating it as a real inbox.
          </p>
        </article>
        <article className="contact-card">
          <h3>Direct email</h3>
          <p className="card-copy">
            For partnership, support, or policy questions, use:
          </p>
          <p>
            <strong>{site.email}</strong>
          </p>
          <p className="card-copy">
            Replace this placeholder address with a real monitored inbox before public launch.
          </p>
        </article>
      </section>
    </main>
  );
}
