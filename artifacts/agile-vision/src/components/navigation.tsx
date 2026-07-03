import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Industries", href: "/industries" },
  { label: "Business Simulator", href: "/simulator" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location === "/";
  const overHero = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-2xl border-b shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" data-testid="link-home">
            <span className="cursor-pointer select-none flex items-center gap-2.5">
              <span
                className={`w-2 h-2 rounded-full transition-colors ${overHero ? "bg-white" : "bg-primary"}`}
                aria-hidden="true"
              />
              <span className="flex items-baseline gap-1.5">
                <span className={`text-2xl font-bold tracking-tight transition-colors ${overHero ? "text-white" : "text-foreground"}`}>Vision</span>
                <span className={`text-2xl font-serif italic font-bold tracking-tight transition-colors ${overHero ? "text-white/90" : "text-primary"}`}>Works</span>
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? location === "/" : location.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                      overHero
                        ? isActive ? "text-white" : "text-white/60 hover:text-white"
                        : isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${overHero ? "bg-white" : "bg-primary"}`}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className={overHero ? "text-white hover:text-white" : ""}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className={`md:hidden ${overHero ? "text-white hover:text-white" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const isMobileActive = item.href === "/" ? location === "/" : location.startsWith(item.href);
                return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isMobileActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
