import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect, useState, useCallback } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ParticleField } from "@/components/particle-field";
import { WarpDrive, type WarpTrigger } from "@/components/warp-drive";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import GetStarted from "@/pages/get-started";
import Contact from "@/pages/contact";
import Blog from "@/pages/blog";
import BlogArticle from "@/pages/blog-article";
import Simulator from "@/pages/simulator";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/get-started" component={GetStarted} />
      <Route path="/contact" component={Contact} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogArticle} />
      <Route path="/simulator" component={Simulator} />
      <Route component={NotFound} />
    </Switch>
  );
}

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, label, [role='button'], [tabindex]";

function AppContent() {
  const [location] = useLocation();
  const isBlogPage = location === "/blog" || location.startsWith("/blog/");

  const [warp, setWarp] = useState<WarpTrigger | null>(null);
  const [warpActive, setWarpActive] = useState(false);

  const fireWarp = useCallback((x: number, y: number, target: EventTarget | null) => {
    if (warp) return; // already running
    if (target instanceof Element && target.closest(INTERACTIVE_SELECTOR)) return;
    setWarp({ x, y });
    setWarpActive(true);
  }, [warp]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    fireWarp(e.clientX, e.clientY, e.target);
  }, [fireWarp]);

  const handleTouch = useCallback((e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    if (t) fireWarp(t.clientX, t.clientY, e.target);
  }, [fireWarp]);

  const handleComplete = useCallback(() => {
    setWarp(null);
    setWarpActive(false);
  }, []);

  return (
    <>
      <ScrollToTop />
      {!isBlogPage && <ParticleField />}
      <WarpDrive trigger={warp} onComplete={handleComplete} />
      <div
        className="min-h-screen flex flex-col relative z-[2]"
        style={{
          pointerEvents: "auto",
          transition: "filter 0.50s ease, opacity 0.50s ease",
          filter: warpActive ? "blur(10px)" : "none",
          opacity: warpActive ? 0.35 : 1,
        }}
        onClick={handleClick}
        onTouchEnd={handleTouch}
      >
        <Navigation />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
