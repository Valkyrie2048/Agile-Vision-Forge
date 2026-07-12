import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect, useState, useCallback, Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ParticleField } from "@/components/particle-field";
import { WarpDrive, type WarpTrigger } from "@/components/warp-drive";
import { useIsMobile } from "@/hooks/use-mobile";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import { useRouteCanonical } from "@/hooks/use-route-canonical";

const GetStarted = lazy(() => import("@/pages/get-started"));
const Contact = lazy(() => import("@/pages/contact"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogArticle = lazy(() => import("@/pages/blog-article"));
const Simulator = lazy(() => import("@/pages/simulator"));
const Industries = lazy(() => import("@/pages/industries"));
const Work = lazy(() => import("@/pages/work"));
const WorkCaseStudy = lazy(() => import("@/pages/work-case-study"));
const NotFound = lazy(() => import("@/pages/not-found"));

function RouteFallback() {
  return (
    <div className="min-h-[60svh] flex items-center justify-center" aria-hidden="true">
      <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
    </div>
  );
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/get-started" component={GetStarted} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogArticle} />
        <Route path="/simulator" component={Simulator} />
        <Route path="/industries" component={Industries} />
        <Route path="/work" component={Work} />
        <Route path="/work/:slug" component={WorkCaseStudy} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

const INTERACTIVE_SELECTOR = "a, button, input, textarea, select, label, [role='button'], [tabindex]";

function AppContent() {
  const [location] = useLocation();
  const isBlogPage = location === "/blog" || location.startsWith("/blog/");
  const isIndustriesPage = location === "/industries";
  const isWorkPage = location === "/work" || location.startsWith("/work/");
  const isMobile = useIsMobile();
  useRouteCanonical();

  const [warp, setWarp] = useState<WarpTrigger | null>(null);

  const fireWarp = useCallback((x: number, y: number, target: EventTarget | null) => {
    if (isMobile) return; // WebGL effect skipped on mobile — perf/reliability risk for a purely decorative touch
    if (warp) return; // already running
    if (!(target instanceof Element)) return;
    if (!target.closest("[data-warp-zone]")) return; // hero section only
    if (target.closest(INTERACTIVE_SELECTOR)) return;
    setWarp({ x, y });
  }, [warp, isMobile]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    fireWarp(e.clientX, e.clientY, e.target);
  }, [fireWarp]);

  const handleTouch = useCallback((e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    if (t) fireWarp(t.clientX, t.clientY, e.target);
  }, [fireWarp]);

  const handleComplete = useCallback(() => {
    setWarp(null);
  }, []);

  return (
    <>
      <ScrollToTop />
      {!isBlogPage && !isIndustriesPage && !isWorkPage && !isMobile && <ParticleField />}
      <WarpDrive trigger={warp} onComplete={handleComplete} />
      <div
        className="min-h-[100svh] flex flex-col relative z-[2]"
        style={{ pointerEvents: "auto" }}
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
