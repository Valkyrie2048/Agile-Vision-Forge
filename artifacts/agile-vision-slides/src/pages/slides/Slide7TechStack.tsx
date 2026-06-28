export default function Slide7TechStack() {
  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ background: "#08061a", fontFamily: "var(--font-body-family)" }}>

      {/* Grid dot pattern */}
      <div className="absolute inset-0 grid-dots opacity-40" />

      {/* Center-left glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "20vh",
          left: "-8vw",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,92,247,0.12) 0%, transparent 70%)",
          filter: "blur(2.5vw)",
        }}
      />

      {/* Header */}
      <div className="absolute" style={{ top: "7vh", left: "7vw", right: "7vw" }}>
        <div className="flex items-center gap-[1vw]" style={{ marginBottom: "1.5vh" }}>
          <div style={{ width: "2vw", height: "1px", background: "#7b5cf7" }} />
          <span style={{ fontSize: "1.2vw", fontWeight: 700, color: "#a87fff", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Under the Hood
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
          Tech Stack
        </h2>
        <div style={{ marginTop: "1.8vh", width: "100%", height: "1px", background: "linear-gradient(to right, rgba(123,92,247,0.4), transparent)" }} />
      </div>

      {/* Stack groups */}
      <div
        className="absolute"
        style={{
          top: "26vh",
          left: "7vw",
          right: "7vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "2.2vh 3vw",
          height: "62vh",
        }}
      >

        {/* Frontend */}
        <div
          style={{
            padding: "3vh 2.5vw",
            background: "rgba(123,92,247,0.08)",
            border: "1px solid rgba(123,92,247,0.22)",
            borderRadius: "0.8vw",
          }}
        >
          <div
            style={{
              fontSize: "1.1vw",
              fontWeight: 700,
              color: "#a87fff",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.8vh",
            }}
          >
            Frontend
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8vw" }}>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>React 18</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>Vite</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>TypeScript</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>Tailwind CSS</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>shadcn/ui</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>Framer Motion</span>
          </div>
        </div>

        {/* Backend */}
        <div
          style={{
            padding: "3vh 2.5vw",
            background: "rgba(168,127,255,0.07)",
            border: "1px solid rgba(168,127,255,0.2)",
            borderRadius: "0.8vw",
          }}
        >
          <div
            style={{
              fontSize: "1.1vw",
              fontWeight: 700,
              color: "#a87fff",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.8vh",
            }}
          >
            Backend
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8vw" }}>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(168,127,255,0.14)", border: "1px solid rgba(168,127,255,0.28)" }}>Express.js</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(168,127,255,0.14)", border: "1px solid rgba(168,127,255,0.28)" }}>Node.js 24</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(168,127,255,0.14)", border: "1px solid rgba(168,127,255,0.28)" }}>PostgreSQL</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(168,127,255,0.14)", border: "1px solid rgba(168,127,255,0.28)" }}>Drizzle ORM</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(168,127,255,0.14)", border: "1px solid rgba(168,127,255,0.28)" }}>Zod</span>
          </div>
        </div>

        {/* AI / ML */}
        <div
          style={{
            padding: "3vh 2.5vw",
            background: "rgba(123,92,247,0.08)",
            border: "1px solid rgba(123,92,247,0.22)",
            borderRadius: "0.8vw",
          }}
        >
          <div
            style={{
              fontSize: "1.1vw",
              fontWeight: 700,
              color: "#a87fff",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.8vh",
            }}
          >
            AI / ML
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8vw" }}>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>GPT-4o</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>Claude</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>LangChain</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>Python</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(123,92,247,0.18)", border: "1px solid rgba(123,92,247,0.3)" }}>OpenAI API</span>
          </div>
        </div>

        {/* Infrastructure */}
        <div
          style={{
            padding: "3vh 2.5vw",
            background: "rgba(168,127,255,0.07)",
            border: "1px solid rgba(168,127,255,0.2)",
            borderRadius: "0.8vw",
          }}
        >
          <div
            style={{
              fontSize: "1.1vw",
              fontWeight: 700,
              color: "#a87fff",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "1.8vh",
            }}
          >
            Infrastructure &amp; Tooling
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8vw" }}>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(168,127,255,0.14)", border: "1px solid rgba(168,127,255,0.28)" }}>pnpm Workspaces</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(168,127,255,0.14)", border: "1px solid rgba(168,127,255,0.28)" }}>esbuild</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(168,127,255,0.14)", border: "1px solid rgba(168,127,255,0.28)" }}>Vercel</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(168,127,255,0.14)", border: "1px solid rgba(168,127,255,0.28)" }}>Supabase</span>
            <span style={{ padding: "0.5vh 1.3vw", borderRadius: "3vw", fontSize: "1.7vw", fontWeight: 700, color: "#f0ecff", background: "rgba(168,127,255,0.14)", border: "1px solid rgba(168,127,255,0.28)" }}>Orval</span>
          </div>
        </div>

      </div>

      {/* Slide number */}
      <div className="absolute bottom-[3.5vh] right-[5vw]" style={{ fontSize: "1.1vw", color: "rgba(240,236,255,0.2)", letterSpacing: "0.1em" }}>
        07
      </div>
    </div>
  );
}
