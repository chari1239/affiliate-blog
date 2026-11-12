import { bholuHome } from "@/lib/bholu-spots-data";
import "./bholu-spots.css";

// Compact duo strip inside the homepage's Learn Japanese section:
// Bholu introduces himself next to the section's own copy and CTA
// (app/page.jsx keeps its heading, links and button untouched).
export default function BholuHomeStrip() {
  return (
    <div className="bholu-home-strip">
      <img
        className="bholu-home-img"
        src={bholuHome.image}
        alt={bholuHome.imageAlt}
        width={336}
        height={224}
        loading="lazy"
      />
      <div className="bholu-home-bubble">
        <span className="bholu-spot-name">Bholu</span>
        <p className="bholu-spot-text">{bholuHome.line}</p>
      </div>
    </div>
  );
}
