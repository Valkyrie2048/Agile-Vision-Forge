export default function Slide3WhoItsFor() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#08061a", fontFamily: "var(--font-body-family)" }}>

      {/* Grid dot pattern */}
      <div className="absolute inset-0 grid-dots opacity-40" />

      {/* Center glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,92,247,0.10) 0%, transparent 65%)",
          filter: "blur(2vw)",
        }}
      />

      {/* Header */}
      <div
        className="absolute"
        style={{ top: "7vh", left: "7vw", right: "7vw" }}
      >
        <div className="flex items-center gap-[1vw]" style={{ marginBottom: "1.5vh" }}>
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
            Target Audience
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
          Who It's For
        </h2>
        {/* Rule */}
        <div style={{ marginTop: "2vh", width: "100%", height: "1px", background: "linear-gradient(to right, rgba(123,92,247,0.4), transparent)" }} />
      </div>

      {/* Two column cards */}
      <div
        className="absolute"
        style={{ top: "28vh", left: "7vw", right: "7vw", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5vw" }}
      >

        {/* Card 1 — VC-backed AI studios & ambitious companies */}
        <div
          style={{
            padding: "4vh 3vw",
            background: "linear-gradient(135deg, rgba(123,92,247,0.14) 0%, rgba(123,92,247,0.06) 100%)",
            border: "1px solid rgba(123,92,247,0.28)",
            borderRadius: "1vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "5vw",
              height: "5vw",
              background: "rgba(123,92,247,0.12)",
              borderRadius: "0 0 5vw 0",
            }}
          />

          <div
            style={{
              width: "4vw",
              height: "4vw",
              borderRadius: "0.8vw",
              background: "rgba(123,92,247,0.22)",
              border: "1px solid rgba(123,92,247,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2.5vh",
            }}
          >
            <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="none" stroke="#a87fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display-family)",
              fontSize: "2.8vw",
              fontWeight: 700,
              color: "#f0ecff",
              lineHeight: 1.2,
              marginBottom: "2vh",
              textWrap: "balance",
            }}
          >
            VC-Backed AI Studios
          </h3>
          <p
            style={{
              fontSize: "2vw",
              fontWeight: 400,
              color: "rgba(240,236,255,0.6)",
              lineHeight: 1.55,
              textWrap: "pretty",
              marginBottom: "2.5vh",
            }}
          >
            Founders and teams raising capital who need a premium digital presence that signals technical credibility and product maturity.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#7b5cf7", flexShrink: 0 }} />
              <span style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.7)" }}>Investor-facing credibility</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#7b5cf7", flexShrink: 0 }} />
              <span style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.7)" }}>Technical capability showcase</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#7b5cf7", flexShrink: 0 }} />
              <span style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.7)" }}>Thought leadership content</span>
            </div>
          </div>
        </div>

        {/* Card 2 — Consumers & SMBs */}
        <div
          style={{
            padding: "4vh 3vw",
            background: "linear-gradient(135deg, rgba(168,127,255,0.10) 0%, rgba(123,92,247,0.05) 100%)",
            border: "1px solid rgba(168,127,255,0.22)",
            borderRadius: "1vw",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Corner accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "5vw",
              height: "5vw",
              background: "rgba(168,127,255,0.10)",
              borderRadius: "0 0 0 5vw",
            }}
          />

          <div
            style={{
              width: "4vw",
              height: "4vw",
              borderRadius: "0.8vw",
              background: "rgba(168,127,255,0.18)",
              border: "1px solid rgba(168,127,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2.5vh",
            }}
          >
            <svg width="2vw" height="2vw" viewBox="0 0 24 24" fill="none" stroke="#c9a8ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display-family)",
              fontSize: "2.8vw",
              fontWeight: 700,
              color: "#f0ecff",
              lineHeight: 1.2,
              marginBottom: "2vh",
              textWrap: "balance",
            }}
          >
            Consumers &amp; SMBs
          </h3>
          <p
            style={{
              fontSize: "2vw",
              fontWeight: 400,
              color: "rgba(240,236,255,0.6)",
              lineHeight: 1.55,
              textWrap: "pretty",
              marginBottom: "2.5vh",
            }}
          >
            Small and mid-sized businesses exploring AI adoption who need concrete ROI examples and an accessible entry point into AI solutions.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#a87fff", flexShrink: 0 }} />
              <span style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.7)" }}>Interactive ROI simulator</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#a87fff", flexShrink: 0 }} />
              <span style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.7)" }}>Real-world use case demos</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", background: "#a87fff", flexShrink: 0 }} />
              <span style={{ fontSize: "1.7vw", color: "rgba(240,236,255,0.7)" }}>Low-friction contact flow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide number */}
      <div
        className="absolute bottom-[4vh] right-[5vw]"
        style={{ fontSize: "1.1vw", color: "rgba(240,236,255,0.2)", letterSpacing: "0.1em" }}
      >
        03
      </div>
    </div>
  );
}
