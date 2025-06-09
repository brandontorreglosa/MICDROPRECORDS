import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// SEO meta tags
document.title = "Mic Drop Records - Independent Music Label | Discover Underground Artists";
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Discover cutting-edge music from independent artists at Mic Drop Records. Stream exclusive releases, explore artist profiles, and experience the future of underground music.";
document.head.appendChild(metaDescription);

const ogTitle = document.createElement("meta");
ogTitle.property = "og:title";
ogTitle.content = "Mic Drop Records - Where Underground Meets Mainstream";
document.head.appendChild(ogTitle);

const ogDescription = document.createElement("meta");
ogDescription.property = "og:description";
ogDescription.content = "Independent music label featuring emerging artists, exclusive releases, and professional recording services. Join the underground revolution.";
document.head.appendChild(ogDescription);

createRoot(document.getElementById("root")!).render(<App />);
