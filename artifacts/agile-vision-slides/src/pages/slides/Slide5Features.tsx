export default function Slide5Features() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#08061a", fontFamily: "var(--font-body-family)" }}>

      {/* Grid dot pattern */}
      <div className="absolute inset-0 grid-dots opacity-40" />

      {/* Bottom-right glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5vh",
          right: "-5vw",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,127,255,0.12) 0%, transparent 70%)",
          filter: "blur(2vw)",
        }}
      />

      {/* Header */}
      <div className="absolute" style={{ top: "7vh", left: "7vw", right: "7vw" }}>
        <div className="flex items-center gap-[1vw]" style={{ marginBottom: "1.5vh" }}>
          <div style={{ width: "2vw", height: "1px", background: "#7b5cf7" }} />
          <span style={{ fontSize: "1.2vw", fontWeight: 700, color: "#a87fff", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            What Makes It Stand Out
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display-family)",
            fontSize: "4.8vw",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#f0ecff",
          }}
        >
          Standout Features
        </h2>
        <div style={{ marginTop: "1.8vh", width: "100%", height: "1px", background: "linear-gradient(to right, rgba(123,92,247,0.4), transparent)" }} />
      </div>

      {/* 3-column feature cards */}
      <div
        className="absolute"
        style={{
          top: "27vh",
          left: "7vw",
          right: "7vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2vw",
          height: "58vh",
        }}
      >

        {/* Feature 1 — Cinematic Hero */}
        <div
          style={{
            padding: "3.5vh 2.2vw",
            background: "rgba(123,92,247,0.08)",
            border: "1px solid rgba(123,92,247,0.22)",
            borderRadius: "0.8vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Icon block */}
          <div
            style={{
              width: "5vw",
              height: "5vw",
              borderRadius: "0.8vw",
              background: "rgba(123,92,247,0.2)",
              border: "1px solid rgba(123,92,247,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2.5vh",
            }}
          >
            <svg width="2.4vw" height="2.4vw" viewBox="0 0 24 24" fill="none" stroke="#a87fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="6" />
              <line x1="12" y1="18" x2="12" y2="22" />
              <line x1="2" y1="12" x2="6" y2="12" />
              <line x1="18" y1="12" x2="22" y2="12" />
            </svg>
          </div>

          <div
            style={{
              fontSize: "2.3vw",
              fontWeight: 700,
              color: "#f0ecff",
              lineHeight: 1.25,
              marginBottom: "1.5vh",
              fontFamily: "var(--font-display-family)",
            }}
          >
            Cinematic Hero
          </div>

          <div
            style={{
              width: "3vw",
              height: "2px",
              background: "linear-gradient(to right, #7b5cf7, transparent)",
              marginBottom: "2vh",
            }}
          />

          <div style={{ fontSize: "1.8vw", color: "rgba(240,236,255,0.6)", lineHeight: 1.55, flex: 1 }}>
            Particle field with 110 mouse-reactive nodes, scroll-driven parallax, multi-layer floating orbs, and 3D text tilt — all from pure CSS and Canvas
          </div>
        </div>

        {/* Feature 2 — AI Simulator */}
        <div
          style={{
            padding: "3.5vh 2.2vw",
            background: "linear-gradient(160deg, rgba(123,92,247,0.12) 0%, rgba(168,127,255,0.07) 100%)",
            border: "1px solid rgba(168,127,255,0.28)",
            borderRadius: "0.8vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "5vw",
              height: "5vw",
              borderRadius: "0.8vw",
              background: "rgba(168,127,255,0.18)",
              border: "1px solid rgba(168,127,255,0.32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2.5vh",
            }}
          >
            <svg width="2.4vw" height="2.4vw" viewBox="0 0 24 24" fill="none" stroke="#c9a8ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>

          <div
            style={{
              fontSize: "2.3vw",
              fontWeight: 700,
              color: "#f0ecff",
              lineHeight: 1.25,
              marginBottom: "1.5vh",
              fontFamily: "var(--font-display-family)",
            }}
          >
            AI ROI Simulator
          </div>

          <div
            style={{
              width: "3vw",
              height: "2px",
              background: "linear-gradient(to right, #a87fff, transparent)",
              marginBottom: "2vh",
            }}
          />

          <div style={{ fontSize: "1.8vw", color: "rgba(240,236,255,0.6)", lineHeight: 1.55, flex: 1 }}>
            Six real business scenarios — customer support, data processing, lead management, inventory, content, QA — with live before/after metrics and annual savings projections
          </div>
        </div>

        {/* Feature 3 — Interactive Demos */}
        <div
          style={{
            padding: "3.5vh 2.2vw",
            background: "rgba(123,92,247,0.08)",
            border: "1px solid rgba(123,92,247,0.22)",
            borderRadius: "0.8vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "5vw",
              height: "5vw",
              borderRadius: "0.8vw",
              background: "rgba(123,92,247,0.2)",
              border: "1px solid rgba(123,92,247,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2.5vh",
            }}
          >
            <svg width="2.4vw" height="2.4vw" viewBox="0 0 24 24" fill="none" stroke="#a87fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>

          <div
            style={{
              fontSize: "2.3vw",
              fontWeight: 700,
              color: "#f0ecff",
              lineHeight: 1.25,
              marginBottom: "1.5vh",
              fontFamily: "var(--font-display-family)",
            }}
          >
            Capability Demos
          </div>

          <div
            style={{
              width: "3vw",
              height: "2px",
              background: "linear-gradient(to right, #7b5cf7, transparent)",
              marginBottom: "2vh",
            }}
          />

          <div style={{ fontSize: "1.8vw", color: "rgba(240,236,255,0.6)", lineHeight: 1.55, flex: 1 }}>
            Tabbed interactive previews for each service area — chatbot, web app, mobile, analytics, automation, agentic AI — with real product mockups
          </div>
        </div>

      </div>

      {/* Slide number */}
      <div className="absolute bottom-[3.5vh] right-[5vw]" style={{ fontSize: "1.1vw", color: "rgba(240,236,255,0.2)", letterSpacing: "0.1em" }}>
        05
      </div>
    </div>
  );
}
