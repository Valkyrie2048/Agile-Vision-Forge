export default function Slide1Title() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#08061a", fontFamily: "var(--font-body-family)" }}>

      {/* Grid dot pattern */}
      <div className="absolute inset-0 grid-dots opacity-60" />

      {/* Top-right glow orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10vh",
          right: "-8vw",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,92,247,0.22) 0%, rgba(168,127,255,0.08) 50%, transparent 75%)",
          filter: "blur(2vw)",
        }}
      />

      {/* Bottom-left secondary glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-8vh",
          left: "-6vw",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88,50,220,0.18) 0%, transparent 70%)",
          filter: "blur(2.5vw)",
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
          Project Overview · 2026
        </span>
      </div>

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ paddingBottom: "6vh" }}
      >
        {/* Label */}
        <div className="flex items-center gap-[1vw] mb-[3.5vh]">
          <div style={{ width: "3vw", height: "1px", background: "rgba(123,92,247,0.6)" }} />
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
            AI Technology Studio
          </span>
          <div style={{ width: "3vw", height: "1px", background: "rgba(123,92,247,0.6)" }} />
        </div>

        {/* Hero headline */}
        <h1
          style={{
            fontFamily: "var(--font-display-family)",
            fontSize: "7.5vw",
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#f0ecff",
            textAlign: "center",
            textWrap: "balance",
            marginBottom: "2.5vh",
          }}
        >
          We Build the
          <span
            style={{
              display: "block",
              background: "linear-gradient(135deg, #7b5cf7 0%, #a87fff 50%, #c9a8ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Future with AI
          </span>
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-body-family)",
            fontSize: "2.2vw",
            fontWeight: 400,
            color: "rgba(240,236,255,0.58)",
            textAlign: "center",
            maxWidth: "55vw",
            lineHeight: 1.55,
            textWrap: "balance",
            marginBottom: "5vh",
          }}
        >
          From idea to launch — AI products, agentic systems, and intelligent software for ambitious companies.
        </p>

        {/* Tech tag pills */}
        <div className="flex flex-wrap items-center justify-center" style={{ gap: "1vw", maxWidth: "58vw" }}>
          <span style={{ padding: "0.6vh 1.6vw", borderRadius: "3vw", fontSize: "1.2vw", fontFamily: "var(--font-body-family)", fontWeight: 700, color: "rgba(168,127,255,0.8)", background: "rgba(123,92,247,0.12)", border: "1px solid rgba(123,92,247,0.25)", letterSpacing: "0.04em" }}>GPT-4o</span>
          <span style={{ padding: "0.6vh 1.6vw", borderRadius: "3vw", fontSize: "1.2vw", fontFamily: "var(--font-body-family)", fontWeight: 700, color: "rgba(168,127,255,0.8)", background: "rgba(123,92,247,0.12)", border: "1px solid rgba(123,92,247,0.25)", letterSpacing: "0.04em" }}>Claude</span>
          <span style={{ padding: "0.6vh 1.6vw", borderRadius: "3vw", fontSize: "1.2vw", fontFamily: "var(--font-body-family)", fontWeight: 700, color: "rgba(168,127,255,0.8)", background: "rgba(123,92,247,0.12)", border: "1px solid rgba(123,92,247,0.25)", letterSpacing: "0.04em" }}>LangChain</span>
          <span style={{ padding: "0.6vh 1.6vw", borderRadius: "3vw", fontSize: "1.2vw", fontFamily: "var(--font-body-family)", fontWeight: 700, color: "rgba(168,127,255,0.8)", background: "rgba(123,92,247,0.12)", border: "1px solid rgba(123,92,247,0.25)", letterSpacing: "0.04em" }}>React</span>
          <span style={{ padding: "0.6vh 1.6vw", borderRadius: "3vw", fontSize: "1.2vw", fontFamily: "var(--font-body-family)", fontWeight: 700, color: "rgba(168,127,255,0.8)", background: "rgba(123,92,247,0.12)", border: "1px solid rgba(123,92,247,0.25)", letterSpacing: "0.04em" }}>Node.js</span>
          <span style={{ padding: "0.6vh 1.6vw", borderRadius: "3vw", fontSize: "1.2vw", fontFamily: "var(--font-body-family)", fontWeight: 700, color: "rgba(168,127,255,0.8)", background: "rgba(123,92,247,0.12)", border: "1px solid rgba(123,92,247,0.25)", letterSpacing: "0.04em" }}>Python</span>
          <span style={{ padding: "0.6vh 1.6vw", borderRadius: "3vw", fontSize: "1.2vw", fontFamily: "var(--font-body-family)", fontWeight: 700, color: "rgba(168,127,255,0.8)", background: "rgba(123,92,247,0.12)", border: "1px solid rgba(123,92,247,0.25)", letterSpacing: "0.04em" }}>Supabase</span>
          <span style={{ padding: "0.6vh 1.6vw", borderRadius: "3vw", fontSize: "1.2vw", fontFamily: "var(--font-body-family)", fontWeight: 700, color: "rgba(168,127,255,0.8)", background: "rgba(123,92,247,0.12)", border: "1px solid rgba(123,92,247,0.25)", letterSpacing: "0.04em" }}>Vercel</span>
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
