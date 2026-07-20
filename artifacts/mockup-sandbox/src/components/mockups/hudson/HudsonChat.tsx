export function HudsonChat() {
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
          position: "relative",
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
              <rect x="13.5" y="0.5" width="3" height="11" rx="1" fill="none" stroke="white" strokeWidth="1" opacity="0.6"/>
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
              <path d="M8 2.5C9.8 2.5 11.4 3.2 12.6 4.3L14 2.9C12.4 1.4 10.3 0.5 8 0.5C5.7 0.5 3.6 1.4 2 2.9L3.4 4.3C4.6 3.2 6.2 2.5 8 2.5Z" opacity="0.4"/>
              <path d="M8 5.5C9.1 5.5 10.1 5.9 10.8 6.6L12.3 5.1C11.1 4.1 9.6 3.5 8 3.5C6.4 3.5 4.9 4.1 3.7 5.1L5.2 6.6C5.9 5.9 6.9 5.5 8 5.5Z" opacity="0.7"/>
              <circle cx="8" cy="10" r="1.5" fill="white"/>
            </svg>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              <div style={{ width: 22, height: 11, borderRadius: 3, border: "1px solid rgba(255,255,255,0.35)", padding: 1.5, display: "flex", alignItems: "center" }}>
                <div style={{ width: "75%", height: "100%", background: "#34D399", borderRadius: 1.5 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Nav bar */}
        <div style={{ padding: "12px 20px 10px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 1 }}>New Trip</div>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>Plan with Hudson</div>
          </div>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(0,201,212,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#00C9D4" strokeWidth="1.2"/>
              <path d="M5 7H9M7 5V9" stroke="#00C9D4" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Chat messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Date separator */}
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, fontWeight: 500, letterSpacing: "0.08em" }}>TODAY · 11:24 AM</span>
          </div>

          {/* User message 1 */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ maxWidth: 260, background: "#00C9D4", borderRadius: "18px 18px 4px 18px", padding: "10px 14px" }}>
              <p style={{ color: "#001B1E", fontSize: 13.5, lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                4 days in Kyoto. I'm into food and contemporary architecture. Want to stay away from the main tourist circuits.
              </p>
            </div>
          </div>

          {/* AI thinking */}
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #001B1E 0%, #003D45 100%)", border: "1px solid rgba(0,201,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
              <span style={{ color: "#00C9D4", fontSize: 10, fontWeight: 700, letterSpacing: 0 }}>H</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "4px 18px 18px 18px", border: "1px solid rgba(255,255,255,0.07)", padding: "10px 14px", maxWidth: 270 }}>
              <div style={{ display: "flex", gap: 3, alignItems: "center", marginBottom: 6 }}>
                <span style={{ color: "rgba(0,201,212,0.8)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Planning</span>
                <div style={{ display: "flex", gap: 2 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#00C9D4", opacity: 0.4 + i * 0.2 }} />
                  ))}
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.55, margin: 0 }}>
                Got it — food-first, contemporary architecture, off the main circuits. Checking availability across a few neighbourhoods now.
              </p>
            </div>
          </div>

          {/* AI response with itinerary preview */}
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #001B1E 0%, #003D45 100%)", border: "1px solid rgba(0,201,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
              <span style={{ color: "#00C9D4", fontSize: 10, fontWeight: 700 }}>H</span>
            </div>
            <div style={{ maxWidth: 272 }}>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "4px 18px 18px 18px", border: "1px solid rgba(255,255,255,0.07)", padding: "10px 14px", marginBottom: 8 }}>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.55, margin: 0 }}>
                  Here's a 4-day plan. I've focused on Nishiki-chō and the Fushimi-Momoyama area — strong food culture and some genuinely interesting contemporary work. No Kinkaku-ji.
                </p>
              </div>

              {/* Mini itinerary card */}
              <div style={{ background: "rgba(0,201,212,0.06)", border: "1px solid rgba(0,201,212,0.18)", borderRadius: 14, padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ color: "#00C9D4", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>Kyoto · 4 Days</span>
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 10 }}>AI Generated</span>
                </div>
                {[
                  { day: "Day 1", title: "Nishiki Market & Gion Alleyways" },
                  { day: "Day 2", title: "KYOTOGRAPHIE + Arashiyama" },
                  { day: "Day 3", title: "Fushimi Sake District" },
                  { day: "Day 4", title: "Kyoto Station Area + Departure" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", paddingTop: i > 0 ? 8 : 0, borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none", marginTop: i > 0 ? 8 : 0 }}>
                    <span style={{ color: "rgba(0,201,212,0.6)", fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", width: 32, flexShrink: 0 }}>{item.day}</span>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11.5, lineHeight: 1.3 }}>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User follow-up */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ maxWidth: 240, background: "#00C9D4", borderRadius: "18px 18px 4px 18px", padding: "10px 14px" }}>
              <p style={{ color: "#001B1E", fontSize: 13.5, lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                Can you move the sake district to Day 2? I want to end on architecture.
              </p>
            </div>
          </div>

          {/* AI confirm */}
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #001B1E 0%, #003D45 100%)", border: "1px solid rgba(0,201,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
              <span style={{ color: "#00C9D4", fontSize: 10, fontWeight: 700 }}>H</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "4px 18px 18px 18px", border: "1px solid rgba(255,255,255,0.07)", padding: "10px 14px", maxWidth: 260 }}>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, lineHeight: 1.55, margin: 0 }}>
                Done — Fushimi moved to Day 2, Day 4 now closes with the Kyoto Station area and Kengo Kuma's work nearby. Updated itinerary below.
              </p>
            </div>
          </div>

        </div>

        {/* Input bar */}
        <div style={{ padding: "8px 12px 28px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(8,13,24,0.95)" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: 22, border: "1px solid rgba(255,255,255,0.08)", padding: "10px 16px", display: "flex", alignItems: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 13.5 }}>Refine your trip...</span>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#00C9D4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#001B1E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
