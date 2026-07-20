export function HudsonDisruption() {
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

        {/* Alert banner */}
        <div style={{ margin: "12px 16px 0", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 16, padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(239,68,68,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14.5 13H1.5L8 2Z" stroke="#EF4444" strokeWidth="1.3" strokeLinejoin="round"/>
              <path d="M8 6.5V9" stroke="#EF4444" strokeWidth="1.3" strokeLinecap="round"/>
              <circle cx="8" cy="11" r="0.7" fill="#EF4444"/>
            </svg>
          </div>
          <div>
            <div style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Flight Disruption Detected</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12.5, lineHeight: 1.45 }}>
              NH826 Tokyo → London pushed <strong style={{ color: "#fff" }}>+3h 25min</strong>. Your connection window is now 38 minutes.
            </div>
          </div>
        </div>

        {/* Flight detail */}
        <div style={{ margin: "10px 16px 0", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Affected Flight</span>
            <span style={{ color: "#EF4444", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em" }}>DELAYED</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div>
              <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>NRT</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10.5 }}>14 Aug · 18:45</div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 9.5 }}>NH826</div>
              <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.12)" }} />
                <svg width="10" height="10" viewBox="0 0 10 10" fill="rgba(255,255,255,0.25)">
                  <path d="M2 5H8M8 5L5 2M8 5L5 8" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div style={{ color: "#EF4444", fontSize: 9.5, fontStyle: "italic" }}>was 15:20</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>LHR</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10.5 }}>15 Aug · 21:10</div>
            </div>
          </div>
        </div>

        {/* AI proposal */}
        <div style={{ margin: "10px 16px 0", background: "rgba(0,201,212,0.05)", border: "1px solid rgba(0,201,212,0.2)", borderRadius: 16, padding: "14px 16px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #001B1E 0%, #003D45 100%)", border: "1px solid rgba(0,201,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#00C9D4", fontSize: 10, fontWeight: 700 }}>H</span>
            </div>
            <div>
              <div style={{ color: "#00C9D4", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Hudson AI Proposal</div>
              <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>Prepared in 42 seconds · awaiting your approval</div>
            </div>
          </div>

          <div style={{ space: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              {
                icon: "✈",
                label: "Rebook to BA018",
                detail: "Departs 16:10 · Arrives 20:50 · 78-min connection",
                badge: "Recommended",
                badgeColor: "#00C9D4",
              },
              {
                icon: "🏨",
                label: "Hotel check-in adjusted",
                detail: "London Marriott notified · late arrival confirmed",
                badge: "Auto-prepared",
                badgeColor: "#8B5CF6",
              },
              {
                icon: "🍽",
                label: "Dinner reservation moved",
                detail: "Sketch (Mayfair) shifted to 21:30 — table held",
                badge: "Pending your OK",
                badgeColor: "#F59E0B",
              },
            ].map((item, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "10px 12px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <span style={{ color: "#fff", fontSize: 12.5, fontWeight: 600 }}>{item.label}</span>
                    <span style={{ color: item.badgeColor, fontSize: 9, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>{item.badge}</span>
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 10, padding: "8px 10px", background: "rgba(0,201,212,0.06)", borderRadius: 10, display: "flex", gap: 6, alignItems: "flex-start" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginTop: 1, flexShrink: 0 }}>
              <circle cx="6" cy="6" r="5" stroke="#00C9D4" strokeWidth="1"/>
              <path d="M6 4V6.5" stroke="#00C9D4" strokeWidth="1" strokeLinecap="round"/>
              <circle cx="6" cy="8.5" r="0.5" fill="#00C9D4"/>
            </svg>
            <p style={{ color: "rgba(0,201,212,0.7)", fontSize: 11, lineHeight: 1.5, margin: 0 }}>
              No booking has been made. Hudson has prepared this proposal and will act only after your confirmation.
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ padding: "10px 16px 28px", display: "flex", gap: 8 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "12px 16px", textAlign: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 500 }}>Dismiss</span>
          </div>
          <div style={{ flex: 2, background: "#00C9D4", borderRadius: 14, padding: "12px 16px", textAlign: "center" }}>
            <span style={{ color: "#001B1E", fontSize: 13, fontWeight: 700 }}>Confirm &amp; Rebook</span>
          </div>
        </div>
      </div>
    </div>
  );
}
