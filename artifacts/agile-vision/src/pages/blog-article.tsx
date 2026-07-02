import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRoute, Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { blogArticles, type BlogArticle as BlogArticleType } from "@/data/blog-articles";
import { Clock, ArrowLeft, ArrowRight, ChevronUp, User, Calendar, Share2, Sparkles, Target, Users, Zap } from "lucide-react";
import { Linkedin as SiLinkedIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePageMeta } from "@/hooks/use-page-meta";

function renderMarkdown(content: string) {
  const blocks: { type: string; text: string; level?: number }[] = [];
  const lines = content.split("\n");
  let currentParagraph: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      blocks.push({ type: "paragraph", text: currentParagraph.join(" ") });
      currentParagraph = [];
    }
  };

  for (const line of lines) {
    const headingMatch = line.match(/^(#{1,3})\s+(.*)/);
    if (headingMatch) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      continue;
    }

    const blockquoteMatch = line.match(/^>\s*"?(.*)"?\s*$/);
    if (blockquoteMatch) {
      flushParagraph();
      let quoteText = blockquoteMatch[1];
      if (quoteText.startsWith('"')) quoteText = quoteText.slice(1);
      if (quoteText.endsWith('"')) quoteText = quoteText.slice(0, -1);
      blocks.push({ type: "blockquote", text: quoteText });
      continue;
    }

    const listMatch = line.match(/^-\s+(.*)/);
    if (listMatch) {
      flushParagraph();
      blocks.push({ type: "listitem", text: listMatch[1] });
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      continue;
    }

    currentParagraph.push(line);
  }
  flushParagraph();

  const processInline = (text: string, keyPrefix: number) => {
    const parts: (string | React.ReactElement)[] = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <strong key={`b-${keyPrefix}-${match.index}`} className="font-semibold text-foreground">
          {match[1]}
        </strong>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };

  const result: React.ReactElement[] = [];
  let listItems: { text: string; index: number }[] = [];
  let isFirstParagraph = true;
  const flushList = () => {
    if (listItems.length > 0) {
      result.push(
        <ul key={`ul-${listItems[0].index}`} className="space-y-3 my-7 ml-1">
          {listItems.map((item) => (
            <li key={item.index} className="flex gap-3 text-[1.0625rem] leading-[1.8] text-muted-foreground">
              <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "hsl(250 85% 60%)" }} />
              <span>{processInline(item.text, item.index)}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    if (block.type === "listitem") {
      listItems.push({ text: block.text, index: i });
      continue;
    }

    flushList();

    if (block.type === "heading") {
      const id = block.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      if (block.level === 2) {
        result.push(
          <div key={`divider-${i}`} className="flex items-center gap-4 mt-16 mb-6">
            <h2 id={id} className="text-[1.625rem] font-bold scroll-mt-24 text-foreground tracking-tight">
              {block.text}
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>
        );
      } else {
        result.push(
          <h3 key={i} id={id} className="text-xl font-semibold mt-10 mb-4 scroll-mt-24 text-foreground">
            {block.text}
          </h3>
        );
      }
      continue;
    }

    if (block.type === "blockquote") {
      result.push(
        <figure key={i} className="relative my-14 mx-0">
          <div className="relative py-8 px-8 sm:px-10 rounded-md" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.06) 0%, hsla(280,80%,60%,0.04) 100%)" }}>
            <div className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full" style={{ background: "linear-gradient(to bottom, hsl(250 85% 60%), hsl(280 80% 60%))" }} />
            <svg className="absolute top-4 right-6 w-10 h-10 opacity-[0.07]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.998 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.986z" />
            </svg>
            <blockquote>
              <p className="text-lg sm:text-xl font-serif leading-relaxed text-foreground/90 italic">
                &ldquo;{block.text}&rdquo;
              </p>
            </blockquote>
          </div>
        </figure>
      );
      continue;
    }

    if (isFirstParagraph) {
      isFirstParagraph = false;
      const firstChar = block.text.charAt(0);
      const restOfText = block.text.slice(1);
      result.push(
        <p key={i} className="text-[1.0625rem] leading-[1.9] text-muted-foreground mb-7">
          <span
            className="float-left text-[3.75rem] font-serif font-bold leading-[0.8] mr-3 mt-2 text-foreground"
            style={{ textShadow: "2px 2px 0px hsla(250,85%,60%,0.15)" }}
          >
            {firstChar}
          </span>
          {processInline(restOfText, i)}
        </p>
      );
      continue;
    }

    result.push(
      <p key={i} className="text-[1.0625rem] leading-[1.9] text-muted-foreground mb-7">
        {processInline(block.text, i)}
      </p>
    );
  }

  flushList();

  return result;
}

function extractHeadings(content: string) {
  const headings: { id: string; text: string }[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^##\s+(.*)/);
    if (match) {
      const id = match[1].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      headings.push({ id, text: match[1] });
    }
  }
  return headings;
}

function AiAnalysisSection({ analysis }: { analysis: BlogArticleType["aiAnalysis"] }) {
  const [state, setState] = useState<"idle" | "analyzing" | "done">("idle");
  const [typedSummary, setTypedSummary] = useState("");
  const [visibleTakeaways, setVisibleTakeaways] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [analyzeStep, setAnalyzeStep] = useState(0);
  const timersRef = useRef<number[]>([]);

  const analyzeSteps = [
    "Reading article content...",
    "Extracting key themes...",
    "Identifying actionable insights...",
    "Assessing industry impact...",
    "Generating synopsis...",
  ];

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearInterval(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  const handleGenerate = () => {
    clearAllTimers();
    setState("analyzing");
    setTypedSummary("");
    setVisibleTakeaways(0);
    setShowFooter(false);
    setAnalyzeStep(0);

    let stepIndex = 0;
    const stepInterval = window.setInterval(() => {
      stepIndex++;
      if (stepIndex < analyzeSteps.length) {
        setAnalyzeStep(stepIndex);
      } else {
        clearInterval(stepInterval);
        setState("done");

        let charIndex = 0;
        const typingInterval = window.setInterval(() => {
          charIndex++;
          if (charIndex <= analysis.summary.length) {
            setTypedSummary(analysis.summary.slice(0, charIndex));
          } else {
            clearInterval(typingInterval);

            let takeawayIdx = 0;
            const takeawayInterval = window.setInterval(() => {
              takeawayIdx++;
              setVisibleTakeaways(takeawayIdx);
              if (takeawayIdx >= analysis.keyTakeaways.length) {
                clearInterval(takeawayInterval);
                const footerTimer = window.setTimeout(() => setShowFooter(true), 300);
                timersRef.current.push(footerTimer as unknown as number);
              }
            }, 400);
            timersRef.current.push(takeawayInterval);
          }
        }, 12);
        timersRef.current.push(typingInterval);
      }
    }, 600);
    timersRef.current.push(stepInterval);
  };

  if (state === "idle") {
    return (
      <div className="mt-16" data-testid="ai-analysis-section">
        <div className="relative rounded-md overflow-hidden border border-border/50" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.04) 0%, hsla(280,80%,60%,0.02) 50%, hsla(250,85%,60%,0.04) 100%)" }}>
          <div className="relative p-7 sm:p-9 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.15), hsla(280,80%,60%,0.1))" }}>
              <Sparkles className="w-6 h-6" style={{ color: "hsl(250 85% 60%)" }} />
            </div>
            <h3 className="text-lg font-bold tracking-tight mb-2" data-testid="text-ai-analysis-title">
              Agile Vision AI Analysis
            </h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              Get an intelligent synopsis of this article with key takeaways, impact assessment, and audience relevance.
            </p>
            <Button
              onClick={handleGenerate}
              className="gap-2"
              style={{ background: "linear-gradient(135deg, hsl(250 85% 60%), hsl(270 80% 55%))", borderColor: "hsl(250 85% 55%)" }}
              data-testid="button-generate-analysis"
            >
              <Sparkles className="w-4 h-4" />
              Generate Analysis
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (state === "analyzing") {
    return (
      <div className="mt-16" data-testid="ai-analysis-section">
        <div className="relative rounded-md overflow-hidden" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.06) 0%, hsla(280,80%,60%,0.04) 50%, hsla(250,85%,60%,0.06) 100%)" }}>
          <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
            <motion.div
              className="h-full w-1/3"
              style={{ background: "linear-gradient(90deg, transparent, hsl(250 85% 60%), hsl(280 80% 60%), transparent)" }}
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="relative p-7 sm:p-9">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.2), hsla(280,80%,60%,0.15))" }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4.5 h-4.5" style={{ color: "hsl(250 85% 60%)" }} />
                </motion.div>
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight">Agile Vision AI Analysis</h3>
                <p className="text-[11px] text-muted-foreground tracking-wide uppercase">Analyzing article...</p>
              </div>
            </div>
            <div className="space-y-3">
              {analyzeSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: idx <= analyzeStep ? 1 : 0.2, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 text-sm"
                >
                  {idx < analyzeStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "hsla(250,85%,60%,0.15)" }}
                    >
                      <svg className="w-3 h-3" style={{ color: "hsl(250 85% 60%)" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                  ) : idx === analyzeStep ? (
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 rounded-full flex-shrink-0"
                      style={{ background: "hsla(250,85%,60%,0.2)" }}
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full flex-shrink-0 bg-muted/30" />
                  )}
                  <span className={idx <= analyzeStep ? "text-foreground" : "text-muted-foreground/40"}>
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      data-testid="ai-analysis-section"
    >
      <div className="relative rounded-md overflow-hidden" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.06) 0%, hsla(280,80%,60%,0.04) 50%, hsla(250,85%,60%,0.06) 100%)" }}>
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a78bfa' fill-opacity='1'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, hsl(250 85% 60%), hsl(280 80% 60%), hsl(250 85% 60%))" }} />

        <div className="relative p-7 sm:p-9">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.2), hsla(280,80%,60%,0.15))" }}>
              <Sparkles className="w-4.5 h-4.5" style={{ color: "hsl(250 85% 60%)" }} />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight" data-testid="text-ai-analysis-heading">Agile Vision AI Analysis</h3>
              <p className="text-[11px] text-muted-foreground tracking-wide uppercase">Intelligent Article Synopsis</p>
            </div>
          </div>

          <p className="text-[15px] leading-relaxed text-muted-foreground mb-7" data-testid="text-ai-analysis-summary">
            {typedSummary}
            {typedSummary.length < analysis.summary.length && (
              <motion.span
                className="inline-block w-[2px] h-4 ml-0.5 align-text-bottom"
                style={{ background: "hsl(250 85% 60%)" }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </p>

          {visibleTakeaways > 0 && (
            <div className="mb-7">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4" style={{ color: "hsl(250 85% 60%)" }} />
                <span className="text-sm font-semibold">Key Takeaways</span>
              </div>
              <div className="space-y-2.5">
                {analysis.keyTakeaways.slice(0, visibleTakeaways).map((takeaway, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    data-testid={`text-takeaway-${idx}`}
                  >
                    <span className="mt-[0.35em] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "hsl(250 85% 60%)" }} />
                    <span>{takeaway}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {showFooter && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-wrap gap-4 pt-4 border-t border-border/50"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5" style={{ color: "hsl(250 85% 60%)" }} />
                <span className="text-xs text-muted-foreground">Impact:</span>
                <Badge className="no-default-hover-elevate no-default-active-elevate text-[11px]" style={{ background: analysis.impactScore === "Transformative" ? "hsla(250,85%,60%,0.15)" : analysis.impactScore === "High" ? "hsla(160,70%,40%,0.15)" : "hsla(200,70%,50%,0.15)", color: analysis.impactScore === "Transformative" ? "hsl(250 85% 60%)" : analysis.impactScore === "High" ? "hsl(160 70% 40%)" : "hsl(200 70% 50%)" }} data-testid="badge-impact-score">
                  {analysis.impactScore}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5" style={{ color: "hsl(250 85% 60%)" }} />
                <span className="text-xs text-muted-foreground">Best for:</span>
                <span className="text-xs font-medium" data-testid="text-relevance">{analysis.relevance}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const article = blogArticles.find((a) => a.slug === slug);
  usePageMeta({
    title: article?.title ?? "Article",
    description: article?.excerpt ?? "",
    imageUrl: article?.imagePath,
    url: typeof window !== "undefined" ? window.location.href : undefined,
    type: "article",
  });

  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTocId, setActiveTocId] = useState("");
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setProgress(0);
    setShowBackToTop(false);
    setActiveTocId("");
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
      setShowBackToTop(scrollTop > 500);

      const headingEls = document.querySelectorAll("article h2[id], article h3[id]");
      let current = "";
      headingEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) {
          current = el.id;
        }
      });
      setActiveTocId(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you are looking for does not exist or has been moved.
          </p>
          <Link href="/blog">
            <Button data-testid="button-back-to-blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = blogArticles.indexOf(article);
  const prevArticle = currentIndex > 0 ? blogArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < blogArticles.length - 1 ? blogArticles[currentIndex + 1] : null;

  const headings = extractHeadings(article.content);
  const showToc = headings.length >= 3;

  const relatedArticles = blogArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60]" data-testid="reading-progress-track">
        <motion.div
          className="h-full origin-left"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, hsl(250 85% 60%), hsl(280 80% 60%), hsl(250 85% 60%))",
            backgroundSize: "200% 100%",
          }}
          data-testid="reading-progress-bar"
        />
      </div>

      <div className="relative w-full h-[60vh] sm:h-[65vh] lg:h-[75vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImageY }}>
          <img
            src={article.imagePath}
            alt={article.title}
            className="w-full h-[120%] object-cover"
            style={{ filter: "saturate(1.4) contrast(1.18) brightness(0.82) hue-rotate(-10deg)" }}
          />
        </motion.div>

        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.3) 0%, hsla(280,75%,45%,0.2) 40%, hsla(220,80%,50%,0.25) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 35%, rgba(10,0,30,0.15) 60%, rgba(10,0,30,0.3) 100%)" }} />
        <div className="absolute inset-0 mix-blend-overlay opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <motion.div className="absolute inset-0 flex items-end" style={{ opacity: heroOpacity }}>
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link href="/blog">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-7 backdrop-blur-md bg-white/10 border-white/20 text-white"
                  data-testid="link-back-to-blog"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  All articles
                </Button>
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge className="no-default-hover-elevate no-default-active-elevate text-xs" style={{ background: "hsl(250 85% 60%)", color: "white" }} data-testid="badge-article-category">
                  {article.category}
                </Badge>
                <span className="flex items-center gap-1.5 text-sm text-white/60">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-white/60">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.1] text-white max-w-3xl"
                data-testid="text-article-title"
              >
                {article.title}
              </h1>

              <p className="text-base sm:text-lg text-white/50 mt-4 max-w-2xl leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>

              <div className="flex items-center justify-between mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center border border-white/20" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.3), hsla(280,80%,60%,0.2))" }}>
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <a
                      href={article.author.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm font-medium text-white"
                      data-testid="link-author-linkedin"
                    >
                      {article.author.name}
                      <SiLinkedIn className="w-3 h-3 text-white/50" />
                    </a>
                    <span className="text-xs text-white/40">Founder, Agile Vision</span>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="backdrop-blur-md bg-white/5 border-white/15 text-white/70"
                  onClick={handleShare}
                  data-testid="button-share-article"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, hsla(250,85%,60%,0.03), transparent)" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28">
          <div className={`flex gap-14 ${showToc ? "lg:flex-row" : ""} flex-col`}>
            <article className="flex-1 max-w-[700px] mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                data-testid="article-content"
              >
                {renderMarkdown(article.content)}
              </motion.div>

              <AiAnalysisSection analysis={article.aiAnalysis} />

              <div className="mt-14">
                <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, hsl(250 85% 60% / 0.3), hsl(280 80% 60% / 0.2), transparent)" }} />
                <div className="pt-10">
                  <div className="flex items-start gap-5">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.15), hsla(280,80%,60%,0.1))" }}>
                      <User className="w-7 h-7" style={{ color: "hsl(250 85% 60%)" }} />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5 font-medium">Written by</p>
                      <p className="text-xl font-bold tracking-tight" data-testid="text-author-name">{article.author.name}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-md">
                        Founder of Agile Vision Technology. Building intelligent products and AI-powered solutions for businesses ready to move faster.
                      </p>
                      <a
                        href={article.author.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium mt-4"
                        style={{ color: "hsl(250 85% 60%)" }}
                        data-testid="link-author-linkedin-bottom"
                      >
                        <SiLinkedIn className="w-4 h-4" />
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {showToc && (
              <aside className="hidden lg:block w-56 flex-shrink-0">
                <div className="sticky top-28 z-[999]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-6">
                    In this article
                  </p>
                  <nav className="space-y-0.5" data-testid="table-of-contents">
                    {headings.map((h) => (
                      <a
                        key={h.id}
                        href={`#${h.id}`}
                        className={`block py-2 pl-4 text-[13px] transition-all duration-200 leading-snug border-l-2 ${
                          activeTocId === h.id
                            ? "border-[hsl(250_85%_60%)] text-foreground font-medium"
                            : "border-border text-muted-foreground"
                        }`}
                        data-testid={`toc-link-${h.id}`}
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>

                  <div className="mt-8 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center gap-2"
                      onClick={handleShare}
                      data-testid="button-share-sidebar"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share article
                    </Button>
                  </div>
                </div>
              </aside>
            )}
          </div>

          {relatedArticles.length > 0 && (
            <div className="mt-24">
              <div className="h-px w-full mb-12" style={{ background: "linear-gradient(90deg, transparent, hsl(250 85% 60% / 0.2), transparent)" }} />
              <div className="flex items-center gap-4 mb-10">
                <h3 className="text-xl font-bold whitespace-nowrap">More in {article.category}</h3>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((related, idx) => (
                  <motion.div
                    key={related.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <Link href={`/blog/${related.slug}`}>
                      <Card
                        className="cursor-pointer hover-elevate overflow-visible h-full group"
                        data-testid={`card-related-${related.slug}`}
                      >
                        <div className="relative overflow-hidden rounded-t-md">
                          <img
                            src={related.imagePath}
                            alt={related.title}
                            className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ filter: "saturate(1.4) contrast(1.15) brightness(0.85) hue-rotate(-10deg)" }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.35) 0%, hsla(280,75%,45%,0.25) 40%, hsla(220,80%,50%,0.3) 100%)" }} />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%, rgba(10,0,30,0.15) 100%)" }} />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5">
                            <Clock className="w-3 h-3" />
                            <span>{related.readTime}</span>
                          </div>
                          <h4 className="text-sm font-semibold leading-snug line-clamp-2">{related.title}</h4>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-stretch gap-4 justify-between mt-16 max-w-[700px]">
            {prevArticle ? (
              <Link href={`/blog/${prevArticle.slug}`} className="flex-1">
                <Card
                  className="w-full text-left p-5 cursor-pointer hover-elevate h-full group"
                  data-testid="link-prev-article"
                >
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <ArrowLeft className="w-3 h-3 transition-transform duration-200 group-hover:-translate-x-0.5" /> Previous
                  </span>
                  <span className="text-sm font-medium line-clamp-2">{prevArticle.title}</span>
                </Card>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextArticle ? (
              <Link href={`/blog/${nextArticle.slug}`} className="flex-1">
                <Card
                  className="w-full text-right p-5 cursor-pointer hover-elevate h-full group"
                  data-testid="link-next-article"
                >
                  <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground mb-2">
                    Next <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-sm font-medium line-clamp-2">{nextArticle.title}</span>
                </Card>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </div>

      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.8,
          pointerEvents: showBackToTop ? "auto" as const : "none" as const,
        }}
        transition={{ duration: 0.2 }}
        data-testid="button-back-to-top-wrapper"
      >
        <Button
          size="icon"
          variant="outline"
          className="backdrop-blur-md bg-background/80 shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-testid="button-back-to-top"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  );
}
