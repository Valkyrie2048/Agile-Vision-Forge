export default function Slide4KeyPages() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#08061a", fontFamily: "var(--font-body-family)" }}>

      {/* Grid dot pattern */}
      <div className="absolute inset-0 grid-dots opacity-40" />

      {/* Top-left glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-5vh",
          left: "-5vw",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,92,247,0.12) 0%, transparent 70%)",
          filter: "blur(2vw)",
        }}
      />

      {/* Header */}
      <div className="absolute" style={{ top: "7vh", left: "7vw", right: "7vw" }}>
        <div className="flex items-center gap-[1vw]" style={{ marginBottom: "1.5vh" }}>
          <div style={{ width: "2vw", height: "1px", background: "#7b5cf7" }} />
          <span style={{ fontSize: "1.2vw", fontWeight: 700, color: "#a87fff", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Site Architecture
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
          Key Pages
        </h2>
        <div style={{ marginTop: "1.8vh", width: "100%", height: "1px", background: "linear-gradient(to right, rgba(123,92,247,0.4), transparent)" }} />
      </div>

      {/* 4-card grid */}
      <div
        className="absolute"
        style={{
          top: "28vh",
          left: "7vw",
          right: "7vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "2vw",
          height: "60vh",
        }}
      >

        {/* Home */}
        <div
          style={{
            padding: "3vh 2.5vw",
            background: "rgba(123,92,247,0.08)",
            border: "1px solid rgba(123,92,247,0.22)",
            borderRadius: "0.8vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: "1.5vh", right: "1.5vw", fontSize: "1.1vw", fontWeight: 700, color: "rgba(168,127,255,0.35)", letterSpacing: "0.12em" }}>01</div>
          <div
            style={{
              width: "3.5vw",
              height: "3.5vw",
              borderRadius: "0.7vw",
              background: "rgba(123,92,247,0.2)",
              border: "1px solid rgba(123,92,247,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.8vh",
            }}
          >
            <svg width="1.8vw" height="1.8vw" viewBox="0 0 24 24" fill="none" stroke="#a87fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div style={{ fontSize: "2.2vw", fontWeight: 700, color: "#f0ecff", marginBottom: "1vh", fontFamily: "var(--font-display-family)" }}>Home</div>
          <div style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.6)", lineHeight: 1.45 }}>Cinematic hero with particle field, six capability cards with deep-dive modals, and interactive project demos</div>
        </div>

        {/* Simulator */}
        <div
          style={{
            padding: "3vh 2.5vw",
            background: "rgba(168,127,255,0.07)",
            border: "1px solid rgba(168,127,255,0.2)",
            borderRadius: "0.8vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: "1.5vh", right: "1.5vw", fontSize: "1.1vw", fontWeight: 700, color: "rgba(168,127,255,0.35)", letterSpacing: "0.12em" }}>02</div>
          <div
            style={{
              width: "3.5vw",
              height: "3.5vw",
              borderRadius: "0.7vw",
              background: "rgba(168,127,255,0.15)",
              border: "1px solid rgba(168,127,255,0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.8vh",
            }}
          >
            <svg width="1.8vw" height="1.8vw" viewBox="0 0 24 24" fill="none" stroke="#c9a8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </div>
          <div style={{ fontSize: "2.2vw", fontWeight: 700, color: "#f0ecff", marginBottom: "1vh", fontFamily: "var(--font-display-family)" }}>AI Simulator</div>
          <div style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.6)", lineHeight: 1.45 }}>Interactive ROI calculator with 6 business scenarios — visualizes AI impact with before/after metrics and savings projections</div>
        </div>

        {/* Blog */}
        <div
          style={{
            padding: "3vh 2.5vw",
            background: "rgba(123,92,247,0.08)",
            border: "1px solid rgba(123,92,247,0.22)",
            borderRadius: "0.8vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: "1.5vh", right: "1.5vw", fontSize: "1.1vw", fontWeight: 700, color: "rgba(168,127,255,0.35)", letterSpacing: "0.12em" }}>03</div>
          <div
            style={{
              width: "3.5vw",
              height: "3.5vw",
              borderRadius: "0.7vw",
              background: "rgba(123,92,247,0.2)",
              border: "1px solid rgba(123,92,247,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.8vh",
            }}
          >
            <svg width="1.8vw" height="1.8vw" viewBox="0 0 24 24" fill="none" stroke="#a87fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div style={{ fontSize: "2.2vw", fontWeight: 700, color: "#f0ecff", marginBottom: "1vh", fontFamily: "var(--font-display-family)" }}>Blog</div>
          <div style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.6)", lineHeight: 1.45 }}>Magazine-style editorial hub with 8 articles across AI, design, development, and automation — each featuring AI analysis sections</div>
        </div>

        {/* Contact / Get Started */}
        <div
          style={{
            padding: "3vh 2.5vw",
            background: "rgba(168,127,255,0.07)",
            border: "1px solid rgba(168,127,255,0.2)",
            borderRadius: "0.8vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", top: "1.5vh", right: "1.5vw", fontSize: "1.1vw", fontWeight: 700, color: "rgba(168,127,255,0.35)", letterSpacing: "0.12em" }}>04</div>
          <div
            style={{
              width: "3.5vw",
              height: "3.5vw",
              borderRadius: "0.7vw",
              background: "rgba(168,127,255,0.15)",
              border: "1px solid rgba(168,127,255,0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1.8vh",
            }}
          >
            <svg width="1.8vw" height="1.8vw" viewBox="0 0 24 24" fill="none" stroke="#c9a8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.58 4.5 2 2 0 0 1 3.55 2.37h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17z" />
            </svg>
          </div>
          <div style={{ fontSize: "2.2vw", fontWeight: 700, color: "#f0ecff", marginBottom: "1vh", fontFamily: "var(--font-display-family)" }}>Contact &amp; Get Started</div>
          <div style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.6)", lineHeight: 1.45 }}>Guided project intake wizard with category selection, scope description, and direct email delivery — zero friction</div>
        </div>

      </div>

      {/* Slide number */}
      <div className="absolute bottom-[3.5vh] right-[5vw]" style={{ fontSize: "1.1vw", color: "rgba(240,236,255,0.2)", letterSpacing: "0.1em" }}>
        04
      </div>
    </div>
  );
}
