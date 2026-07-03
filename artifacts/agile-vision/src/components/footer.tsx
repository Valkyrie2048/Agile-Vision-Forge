import { Link } from "wouter";
import { SiGithub, SiX } from "react-icons/si";
import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-card" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent"
                  style={{ borderBottomColor: "hsl(250 85% 60%)" }}
                  aria-hidden="true"
                />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold tracking-tight">Vision</span>
                  <span className="text-lg font-serif italic font-bold tracking-tight text-primary">Works</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground tracking-wide">yourvisionworks.ai</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              We engineer intelligence. From agentic AI systems to production-ready
              products, we help businesses harness AI to move faster
              and deliver more.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Navigate</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-home">
                Home
              </Link>
              <Link href="/get-started" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-get-started">
                Get Started
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-blog">
                Blog
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                Contact
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-social-github"
                aria-label="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-social-linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-social-x"
                aria-label="X"
              >
                <SiX className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="glow-line mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground" data-testid="text-copyright">
            &copy;2026 Agile Vision Technology Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Privacy Policy</span>
            <span className="text-xs text-muted-foreground">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
