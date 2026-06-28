export default function Slide6Blog() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#08061a", fontFamily: "var(--font-body-family)" }}>

      {/* Grid dot pattern */}
      <div className="absolute inset-0 grid-dots opacity-40" />

      {/* Top-right glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-8vh",
          right: "-6vw",
          width: "32vw",
          height: "32vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,92,247,0.13) 0%, transparent 70%)",
          filter: "blur(2vw)",
        }}
      />

      {/* Header */}
      <div className="absolute" style={{ top: "7vh", left: "7vw", right: "7vw" }}>
        <div className="flex items-center gap-[1vw]" style={{ marginBottom: "1.5vh" }}>
          <div style={{ width: "2vw", height: "1px", background: "#7b5cf7" }} />
          <span style={{ fontSize: "1.2vw", fontWeight: 700, color: "#a87fff", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Insights &amp; Ideas
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
          Blog &amp; AI Analysis
        </h2>
        <div style={{ marginTop: "1.8vh", width: "100%", height: "1px", background: "linear-gradient(to right, rgba(123,92,247,0.4), transparent)" }} />
      </div>

      {/* Two-column layout */}
      <div
        className="absolute"
        style={{
          top: "26vh",
          left: "7vw",
          right: "7vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3vw",
          height: "62vh",
        }}
      >

        {/* Left — Featured article + article list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>

          {/* Featured article */}
          <div
            style={{
              padding: "3vh 2.5vw",
              background: "linear-gradient(135deg, rgba(123,92,247,0.14) 0%, rgba(123,92,247,0.06) 100%)",
              border: "1px solid rgba(123,92,247,0.28)",
              borderRadius: "0.8vw",
              flex: "0 0 auto",
            }}
          >
            <div style={{ fontSize: "1.1vw", fontWeight: 700, color: "#a87fff", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1vh" }}>
              Featured Article
            </div>
            <div
              style={{
                fontSize: "2.1vw",
                fontWeight: 700,
                color: "#f0ecff",
                lineHeight: 1.3,
                marginBottom: "1.2vh",
                fontFamily: "var(--font-display-family)",
              }}
            >
              Why Agentic AI Changes Everything for Small Businesses
            </div>
            <div style={{ fontSize: "1.5vw", color: "rgba(240,236,255,0.5)", lineHeight: 1.4 }}>
              Feb 15, 2026 · 7 min read · AI &amp; Machine Learning
            </div>
          </div>

          {/* Article list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh", flex: 1 }}>

            <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
              <div style={{ width: "0.35vw", height: "100%", minHeight: "5vh", background: "rgba(123,92,247,0.4)", borderRadius: "0.3vw", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "1.8vw", fontWeight: 700, color: "#f0ecff", lineHeight: 1.3, marginBottom: "0.5vh" }}>The Design Systems Revolution in AI Products</div>
                <div style={{ fontSize: "1.4vw", color: "rgba(240,236,255,0.4)" }}>Design · Jan 2026</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
              <div style={{ width: "0.35vw", height: "100%", minHeight: "5vh", background: "rgba(123,92,247,0.4)", borderRadius: "0.3vw", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "1.8vw", fontWeight: 700, color: "#f0ecff", lineHeight: 1.3, marginBottom: "0.5vh" }}>The ROI of Automation — What the Numbers Actually Show</div>
                <div style={{ fontSize: "1.4vw", color: "rgba(240,236,255,0.4)" }}>Automation · Dec 2025</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "1.5vw", alignItems: "flex-start" }}>
              <div style={{ width: "0.35vw", height: "100%", minHeight: "5vh", background: "rgba(123,92,247,0.4)", borderRadius: "0.3vw", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "1.8vw", fontWeight: 700, color: "#f0ecff", lineHeight: 1.3, marginBottom: "0.5vh" }}>Spatial Computing and the Next Interface Frontier</div>
                <div style={{ fontSize: "1.4vw", color: "rgba(240,236,255,0.4)" }}>Emerging Tech · Nov 2025</div>
              </div>
            </div>

          </div>

          {/* Article count */}
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <div style={{ fontSize: "3.5vw", fontWeight: 700, color: "#7b5cf7", lineHeight: 1, fontFamily: "var(--font-display-family)" }}>8</div>
            <div style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.45)" }}>articles across 6 categories</div>
          </div>

        </div>

        {/* Right — AI Analysis callout */}
        <div
          style={{
            padding: "3.5vh 2.8vw",
            background: "linear-gradient(160deg, rgba(168,127,255,0.12) 0%, rgba(123,92,247,0.06) 100%)",
            border: "1px solid rgba(168,127,255,0.25)",
            borderRadius: "0.8vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.8vw",
              padding: "0.6vh 1.4vw",
              borderRadius: "3vw",
              background: "rgba(168,127,255,0.15)",
              border: "1px solid rgba(168,127,255,0.3)",
              marginBottom: "2.5vh",
              width: "fit-content",
            }}
          >
            <svg width="1.3vw" height="1.3vw" viewBox="0 0 24 24" fill="none" stroke="#c9a8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ fontSize: "1.2vw", fontWeight: 700, color: "#c9a8ff", letterSpacing: "0.15em", textTransform: "uppercase" }}>AI Analysis</span>
          </div>

          <div
            style={{
              fontSize: "2.2vw",
              fontWeight: 700,
              color: "#f0ecff",
              lineHeight: 1.3,
              marginBottom: "2vh",
              fontFamily: "var(--font-display-family)",
            }}
          >
            Every article includes an AI-generated analysis section
          </div>

          <div style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.58)", lineHeight: 1.55, marginBottom: "3vh" }}>
            Each post surfaces a structured breakdown automatically — impact score, key takeaways, and target audience — giving readers an instant signal of relevance before committing to the full read.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.8vh", flex: 1 }}>

            <div
              style={{
                padding: "1.8vh 1.8vw",
                background: "rgba(168,127,255,0.08)",
                border: "1px solid rgba(168,127,255,0.18)",
                borderRadius: "0.5vw",
                display: "flex",
                alignItems: "flex-start",
                gap: "1.2vw",
              }}
            >
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#a87fff", flexShrink: 0, marginTop: "0.8vh" }} />
              <div style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.7)" }}>Impact score — Informative / Actionable / Transformative</div>
            </div>

            <div
              style={{
                padding: "1.8vh 1.8vw",
                background: "rgba(168,127,255,0.08)",
                border: "1px solid rgba(168,127,255,0.18)",
                borderRadius: "0.5vw",
                display: "flex",
                alignItems: "flex-start",
                gap: "1.2vw",
              }}
            >
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#a87fff", flexShrink: 0, marginTop: "0.8vh" }} />
              <div style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.7)" }}>4 key takeaways extracted per article</div>
            </div>

            <div
              style={{
                padding: "1.8vh 1.8vw",
                background: "rgba(168,127,255,0.08)",
                border: "1px solid rgba(168,127,255,0.18)",
                borderRadius: "0.5vw",
                display: "flex",
                alignItems: "flex-start",
                gap: "1.2vw",
              }}
            >
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#a87fff", flexShrink: 0, marginTop: "0.8vh" }} />
              <div style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.7)" }}>Relevance tagging for target reader roles</div>
            </div>

          </div>
        </div>

      </div>

      {/* Slide number */}
      <div className="absolute bottom-[3.5vh] right-[5vw]" style={{ fontSize: "1.1vw", color: "rgba(240,236,255,0.2)", letterSpacing: "0.1em" }}>
        06
      </div>
    </div>
  );
}
