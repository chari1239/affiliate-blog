import Link from "next/link";
import BholuLost from "@/components/bholu-lost";
import { bholuLost } from "@/lib/bholu-spots-data";

export default function NotFound() {
  return (
    <main className="page-frame">
      <header className="page-header">
        <div className="eyebrow">404</div>
        <h1 className="page-title">{bholuLost.heading}</h1>
        <p className="page-intro">
          The page may have moved, or the link may have a small typo. Bholu has been looking for
          it everywhere:
        </p>
        <BholuLost />
        <div className="hero-actions">
          <Link href="/learn-japanese" className="btn">
            Learn Japanese from Zero
          </Link>
          <Link href="/" className="btn-secondary">
            Go to the homepage
          </Link>
        </div>
        <div className="hero-text-links">
          <Link href="/articles">Browse all articles</Link>
        </div>
      </header>
    </main>
  );
}
