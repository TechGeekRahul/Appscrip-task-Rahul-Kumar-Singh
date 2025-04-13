import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Font Awesome
const fontAwesomeScript = document.createElement('link');
fontAwesomeScript.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
fontAwesomeScript.rel = 'stylesheet';
document.head.appendChild(fontAwesomeScript);

// Add Inter font
const interFont = document.createElement('link');
interFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
interFont.rel = 'stylesheet';
document.head.appendChild(interFont);

// Update document title and meta description for SEO
document.title = "LUXE - Discover Fashion Collection | Premium Clothing & Accessories";
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'Explore our curated collection of premium fashion items and accessories. Find the latest trends with worldwide shipping and easy returns.';
document.head.appendChild(metaDescription);

// Add schema markup for SEO
const schemaScript = document.createElement('script');
schemaScript.type = 'application/ld+json';
schemaScript.textContent = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Premium Leather Jacket",
      "url": "/products/premium-leather-jacket"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Silk Summer Dress",
      "url": "/products/silk-summer-dress"
    }
  ]
});
document.head.appendChild(schemaScript);

createRoot(document.getElementById("root")!).render(<App />);
