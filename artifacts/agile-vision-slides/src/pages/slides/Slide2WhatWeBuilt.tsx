export default function Slide2WhatWeBuilt() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#08061a", fontFamily: "var(--font-body-family)" }}>

      {/* Grid dot pattern */}
      <div className="absolute inset-0 grid-dots opacity-40" />

      {/* Right-side glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10vh",
          right: "-5vw",
          width: "35vw",
          height: "35vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,92,247,0.14) 0%, transparent 70%)",
          filter: "blur(2vw)",
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute"
        style={{
          left: 0,
          top: "15vh",
          bottom: "15vh",
          width: "0.4vw",
          background: "linear-gradient(to bottom, transparent, #7b5cf7 30%, #a87fff 70%, transparent)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center" style={{ padding: "0 8vw" }}>

        {/* Left column */}
        <div style={{ flex: "0 0 45vw", paddingRight: "5vw" }}>
          {/* Section label */}
          <div className="flex items-center gap-[1vw]" style={{ marginBottom: "2.5vh" }}>
            <div style={{ width: "2vw", height: "1px", background: "#7b5cf7" }} />
            <span
              style={{
                fontSize: "1.2vw",
                fontWeight: 700,
                color: "#a87fff",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              The Project
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display-family)",
              fontSize: "5.5vw",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#f0ecff",
              textWrap: "balance",
              marginBottom: "3vh",
            }}
          >
            What We Built
          </h2>

          <p
            style={{
              fontSize: "2.3vw",
              fontWeight: 400,
              color: "rgba(240,236,255,0.65)",
              lineHeight: 1.6,
              textWrap: "pretty",
              marginBottom: "4vh",
            }}
          >
            A full-stack marketing website for a VC-backed AI studio — presenting capabilities, demonstrating value, and converting visitors into clients.
          </p>

          {/* Divider rule */}
          <div style={{ width: "6vw", height: "2px", background: "linear-gradient(to right, #7b5cf7, transparent)", marginBottom: "3vh" }} />

          <p
            style={{
              fontSize: "1.9vw",
              fontWeight: 400,
              color: "rgba(240,236,255,0.45)",
              lineHeight: 1.55,
            }}
          >
            Built by Agile Vision Technology Inc. · 2026
          </p>
        </div>

        {/* Right column — capability tiles */}
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2.2vh" }}>

          <div
            style={{
              padding: "2.5vh 2.5vw",
              background: "rgba(123,92,247,0.08)",
              border: "1px solid rgba(123,92,247,0.2)",
              borderRadius: "0.8vw",
            }}
          >
            <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#a87fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.8vh" }}>Mission</div>
            <div style={{ fontSize: "2.2vw", fontWeight: 700, color: "#f0ecff", lineHeight: 1.3 }}>AI-first products for ambitious companies, built from idea to launch</div>
          </div>

          <div
            style={{
              padding: "2.5vh 2.5vw",
              background: "rgba(123,92,247,0.08)",
              border: "1px solid rgba(123,92,247,0.2)",
              borderRadius: "0.8vw",
            }}
          >
            <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#a87fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.8vh" }}>What It Showcases</div>
            <div style={{ fontSize: "2.2vw", fontWeight: 700, color: "#f0ecff", lineHeight: 1.3 }}>Six core capabilities: agentic AI, web apps, analytics, chatbots, mobile, automation</div>
          </div>

          <div
            style={{
              padding: "2.5vh 2.5vw",
              background: "rgba(123,92,247,0.08)",
              border: "1px solid rgba(123,92,247,0.2)",
              borderRadius: "0.8vw",
            }}
          >
            <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "#a87fff", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.8vh" }}>Stack</div>
            <div style={{ fontSize: "2.2vw", fontWeight: 700, color: "#f0ecff", lineHeight: 1.3 }}>React · Vite · Tailwind · Express · PostgreSQL · Framer Motion</div>
          </div>

        </div>
      </div>

      {/* Slide number */}
      <div
        className="absolute bottom-[4vh] right-[5vw]"
        style={{ fontSize: "1.1vw", color: "rgba(240,236,255,0.2)", fontFamily: "var(--font-body-family)", letterSpacing: "0.1em" }}
      >
        02
      </div>
    </div>
  );
}
