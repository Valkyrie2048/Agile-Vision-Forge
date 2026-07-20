export function HudsonItinerary() {
  const stops = [
    {
      time: "9:00 AM",
      name: "KYOTOGRAPHIE",
      sub: "Contemporary Photography Museum",
      tag: "Architecture",
      note: "Timed entry — Hudson booked 9:00 slot",
      dot: "#00C9D4",
    },
    {
      time: "11:30 AM",
      name: "Nishiki Market",
      sub: "Guided tasting walk — Aritsugu to Murakami-Ju",
      tag: "Food",
      note: "Best visited before lunch crowds",
      dot: "#F59E0B",
    },
    {
      time: "1:30 PM",
      name: "Nakamura-Ro",
      sub: "Lunch — kaiseki, vegetarian menu available",
      tag: "Food",
      note: "Reservation confirmed for 13:30",
      dot: "#F59E0B",
    },
    {
      time: "3:15 PM",
      name: "Higashiyama District",
      sub: "Architecture walk — Kengo Kuma influence",
      tag: "Architecture",
      note: "Hudson route avoids Ninenzaka peak crowds",
      dot: "#00C9D4",
    },
    {
      time: "6:00 PM",
      name: "Yoramu Sake Bar",
      sub: "Curated sake tasting — reservation required",
      tag: "Food",
      note: "8-seat counter — reserved under your name",
      dot: "#F59E0B",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div
        style={{
          width: 390,
          height: 844,
          background: "#080D18",
          borderRadius: 48,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', system-ui, sans-serif",
          boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Status bar */}
        <div style={{ padding: "14px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>9:41</span>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
              <rect x="0" y="3" width="3" height="9" rx="1" fill="white" opacity="0.4"/>
              <rect x="4.5" y="2" width="3" height="10" rx="1" fill="white" opacity="0.6"/>
              <rect x="9" y="0" width="3" height="12" rx="1" fill="white"/>
            </svg>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <div style={{ width: 22, height: 11, borderRadius: 3, border: "1px solid rgba(255,255,255,0.35)", padding: 1.5, display: "flex", alignItems: "center" }}>
                <div style={{ width: "75%", height: "100%", background: "#34D399", borderRadius: 1.5 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div style={{ padding: "12px 20px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}>Your Trip</div>
              <div style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>Kyoto · 4 Days</div>
            </div>
            <div style={{ marginLeft: "auto", background: "rgba(0,201,212,0.1)", border: "1px solid rgba(0,201,212,0.2)", borderRadius: 8, padding: "4px 10px" }}>
              <span style={{ color: "#00C9D4", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>AI Generated</span>
            </div>
          </div>

          {/* Day tabs */}
          <div style={{ display: "flex", gap: 6 }}>
            {["Day 1", "Day 2", "Day 3", "Day 4"].map((d, i) => (
              <div key={i} style={{
                padding: "6px 12px",
                borderRadius: 10,
                background: i === 0 ? "#00C9D4" : "rgba(255,255,255,0.05)",
                border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.07)",
              }}>
                <span style={{ color: i === 0 ? "#001B1E" : "rgba(255,255,255,0.4)", fontSize: 11.5, fontWeight: 600 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Date label */}
        <div style={{ padding: "12px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 500 }}>Thursday, 14 Aug</span>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00C9D4" }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>Architecture</span>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B" }} />
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>Food</span>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 20px 16px" }}>
          {stops.map((stop, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 4 }}>
              {/* Timeline line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: stop.dot, flexShrink: 0, boxShadow: `0 0 0 3px ${stop.dot}22` }} />
                {i < stops.length - 1 && (
                  <div style={{ width: 1, flex: 1, minHeight: 48, background: "rgba(255,255,255,0.07)", margin: "4px 0" }} />
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingBottom: i < stops.length - 1 ? 8 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 }}>
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10.5, fontWeight: 500, letterSpacing: "0.04em" }}>{stop.time}</span>
                  <span style={{ color: stop.dot, fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: `${stop.dot}15`, borderRadius: 5, padding: "2px 7px" }}>{stop.tag}</span>
                </div>
                <div style={{ color: "#fff", fontSize: 13.5, fontWeight: 600, marginBottom: 2, lineHeight: 1.3 }}>{stop.name}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 11.5, lineHeight: 1.45, marginBottom: 4 }}>{stop.sub}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="#00C9D4" strokeWidth="1" opacity="0.6"/>
                    <path d="M5 3V5.5L6.5 7" stroke="#00C9D4" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                  </svg>
                  <span style={{ color: "rgba(0,201,212,0.6)", fontSize: 10, fontStyle: "italic" }}>{stop.note}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom action */}
        <div style={{ padding: "10px 16px 28px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(8,13,24,0.95)", display: "flex", gap: 8 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "11px 16px", textAlign: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 500 }}>Adjust Plan</span>
          </div>
          <div style={{ flex: 1, background: "#00C9D4", borderRadius: 14, padding: "11px 16px", textAlign: "center" }}>
            <span style={{ color: "#001B1E", fontSize: 13, fontWeight: 600 }}>Confirm Trip</span>
          </div>
        </div>
      </div>
    </div>
  );
}
