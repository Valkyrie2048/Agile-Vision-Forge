export function BrowserFrame({
  src,
  alt,
  accentColor,
  url,
}: {
  src: string;
  alt: string;
  accentColor: string;
  url?: string;
}) {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div
        className="absolute -inset-x-6 -bottom-10 top-6 rounded-3xl blur-3xl opacity-20 pointer-events-none"
        style={{ background: accentColor }}
      />
      <div
        className="relative flex flex-col h-full rounded-xl overflow-hidden border border-white/[0.09]"
        style={{ boxShadow: "0 20px 60px -10px rgba(0,0,0,0.85)" }}
      >
        <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161616] border-b border-white/[0.07] flex-shrink-0">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="flex-1 mx-2 h-5 rounded bg-white/[0.05] border border-white/[0.05] flex items-center px-2 gap-1.5 min-w-0">
            <svg
              className="w-2 h-2 text-white/20 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-[9px] font-mono text-white/20 tracking-wide truncate">
              {url ? `https://${url}` : ""}
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden bg-zinc-950">
          <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
        </div>
      </div>
    </div>
  );
}

export function PhoneFrame({
  src,
  alt,
  accentColor,
}: {
  src: string;
  alt: string;
  accentColor: string;
}) {
  return (
    <div className="relative flex justify-center items-center w-full h-full">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${accentColor}28, transparent 65%)` }}
      />
      <div className="relative" style={{ width: "min(50%, 180px)" }}>
        <div
          className="relative rounded-[2rem] overflow-hidden border-[2.5px] border-white/[0.14] bg-black"
          style={{
            boxShadow: `0 48px 80px -24px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.05), 0 20px 40px -10px ${accentColor}35`,
          }}
        >
          <div className="flex justify-center pt-2 pb-1 bg-black">
            <div className="w-20 h-5 bg-black rounded-full border border-white/[0.11]" />
          </div>
          <div style={{ aspectRatio: "9/19.5" }}>
            <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex justify-center py-2 bg-black">
            <div className="w-20 h-1 rounded-full bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
