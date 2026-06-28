export default function Slide8Closing() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#08061a", fontFamily: "var(--font-body-family)" }}>

      {/* Grid dot pattern */}
      <div className="absolute inset-0 grid-dots opacity-60" />

      {/* Large center glow — mirrors title slide */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,92,247,0.18) 0%, rgba(168,127,255,0.07) 40%, transparent 70%)",
          filter: "blur(3vw)",
        }}
      />

      {/* Top-right accent orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-12vh",
          right: "-10vw",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(168,127,255,0.15) 0%, transparent 65%)",
          filter: "blur(2.5vw)",
        }}
      />

      {/* Bottom-left accent orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10vh",
          left: "-8vw",
          width: "28vw",
          height: "28vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88,50,220,0.15) 0%, transparent 70%)",
          filter: "blur(2vw)",
        }}
      />

      {/* Top label bar */}
      <div className="absolute top-[6vh] left-0 right-0 flex items-center justify-between px-[7vw]">
        <div className="flex items-center gap-[1.2vw]">
          <div
            style={{
              width: "0.5vw",
              height: "2.5vh",
              background: "linear-gradient(to bottom, #7b5cf7, #a87fff)",
              borderRadius: "0.3vw",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body-family)",
              fontSize: "1.4vw",
              fontWeight: 700,
              color: "rgba(240,236,255,0.5)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Agile Vision Technology Inc.
          </span>
        </div>
        <span
          style={{
            fontSize: "1.2vw",
            color: "rgba(240,236,255,0.3)",
            letterSpacing: "0.08em",
            fontFamily: "var(--font-body-family)",
          }}
        >
          2026
        </span>
      </div>

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ paddingBottom: "4vh" }}
      >
        {/* Decorative line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2vw",
            marginBottom: "4vh",
          }}
        >
          <div style={{ width: "6vw", height: "1px", background: "linear-gradient(to right, transparent, rgba(123,92,247,0.6))" }} />
          <span
            style={{
              fontFamily: "var(--font-body-family)",
              fontSize: "1.3vw",
              fontWeight: 700,
              color: "#a87fff",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Thank You
          </span>
          <div style={{ width: "6vw", height: "1px", background: "linear-gradient(to left, transparent, rgba(123,92,247,0.6))" }} />
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: "var(--font-display-family)",
            fontSize: "6.5vw",
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#f0ecff",
            textAlign: "center",
            marginBottom: "3vh",
            textWrap: "balance",
          }}
        >
          Agile Vision
          <span
            style={{
              display: "block",
              background: "linear-gradient(135deg, #7b5cf7 0%, #a87fff 50%, #c9a8ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Technology Inc.
          </span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-body-family)",
            fontSize: "2.2vw",
            fontWeight: 400,
            color: "rgba(240,236,255,0.55)",
            textAlign: "center",
            maxWidth: "52vw",
            lineHeight: 1.55,
            textWrap: "balance",
            marginBottom: "5vh",
          }}
        >
          Building the future with AI — from idea to launch, for ambitious companies.
        </p>

        {/* Divider */}
        <div style={{ width: "8vw", height: "2px", background: "linear-gradient(to right, transparent, #7b5cf7, transparent)", marginBottom: "4vh" }} />

        {/* Contact info */}
        <div style={{ display: "flex", gap: "6vw", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 700, color: "rgba(168,127,255,0.7)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8vh" }}>Author</div>
            <div style={{ fontSize: "1.9vw", fontWeight: 700, color: "#f0ecff" }}>Mathew Graham</div>
          </div>
          <div style={{ width: "1px", height: "6vh", background: "rgba(123,92,247,0.3)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.1vw", fontWeight: 700, color: "rgba(168,127,255,0.7)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.8vh" }}>Copyright</div>
            <div style={{ fontSize: "1.9vw", fontWeight: 700, color: "#f0ecff" }}>2026 All Rights Reserved</div>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div
        className="absolute bottom-[4.5vh] left-[7vw] right-[7vw]"
        style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(123,92,247,0.35), transparent)" }}
      />
    </div>
  );
}
