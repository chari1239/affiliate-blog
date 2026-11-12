import { bholuLost } from "@/lib/bholu-spots-data";
import "./bholu-spots.css";

// Bholu on the 404 page: he has searched everywhere for the missing
// page — even under the ふ card stuck on his head. Rendered by
// app/not-found.jsx inside the page header.
export default function BholuLost() {
  return (
    <figure className="bholu-lost-card">
      <img
        className="bholu-lost-img"
        src={bholuLost.image}
        alt={bholuLost.imageAlt}
        width={1152}
        height={768}
        loading="lazy"
      />
      <figcaption className="bholu-lost-quote">
        <span className="bholu-spot-name">Bholu</span>
        <p className="bholu-spot-text">{bholuLost.line}</p>
      </figcaption>
    </figure>
  );
}
