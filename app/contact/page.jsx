import Link from "next/link";
import { site } from "@/lib/site";
import { ContactForm } from "@/app/contact/contact-form";

export const metadata = {
  title: "Contact"
};

export default function ContactPage() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">Contact</div>
        <h1 className="page-title">Get in touch with Nihon Diaries.</h1>
        <p className="page-intro">
          Questions about life in Japan, collaboration, or article suggestions can go here. The
          form opens Gmail compose, with a mail app fallback.
        </p>
      </header>
      <section className="contact-grid">
        <article className="contact-card">
          <h3>Send a message</h3>
          <ContactForm />
          <p className="form-note">
            No backend is required. The form pre-fills a message and opens Gmail or your email app.
          </p>
        </article>
        <article className="contact-card">
          <h3>Direct email</h3>
          <p className="card-copy">
            For direct contact, use:
          </p>
          <p>
            <strong>{site.email}</strong>
          </p>
          <p className="card-copy">
            Replace this placeholder address with a monitored inbox before a real public launch.
          </p>
          <Link href={`mailto:${site.email}`} className="btn-secondary">
            Open email app
          </Link>
        </article>
      </section>
    </main>
  );
}
