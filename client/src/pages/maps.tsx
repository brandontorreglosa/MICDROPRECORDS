import React from "react";

export default function MapsPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", margin: 0, padding: 0, overflow: "hidden" }}>
      <iframe
        src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=mic%20drop%20studio+()&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        style={{ width: "100vw", height: "100vh", border: "none", margin: 0, padding: 0, display: "block" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mic Drop Studio Map"
      />
    </div>
  );
}
