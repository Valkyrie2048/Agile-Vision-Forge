import { useState, useEffect, useRef } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { blogArticles } from "@/data/blog-articles";
import { Clock, ArrowLeft, ArrowRight, ChevronUp, User, Calendar, Linkedin } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    const parts: (string | JSX.Element)[] = [];
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

  const result: JSX.Element[] = [];
  let listItems: { text: string; index: number }[] = [];
  let isFirstParagraph = true;

  const flushList = () => {
    if (listItems.length > 0) {
      result.push(
        <ul key={`ul-${listItems[0].index}`} className="space-y-2.5 my-6 ml-1">
          {listItems.map((item) => (
            <li key={item.index} className="flex gap-3 text-[1.0625rem] leading-[1.8] text-muted-foreground">
              <span className="mt-[0.65em] w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
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
          <h2 key={i} id={id} className="text-[1.625rem] font-bold mt-14 mb-5 scroll-mt-24 text-foreground tracking-tight">
            {block.text}
          </h2>
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
        <figure key={i} className="relative my-12">
          <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full" style={{ background: "linear-gradient(to bottom, hsl(250 85% 60%), hsl(280 80% 60%))" }} />
          <blockquote className="pl-8 pr-4">
            <p className="text-xl font-serif leading-relaxed text-foreground italic tracking-tight">
              &ldquo;{block.text}&rdquo;
            </p>
          </blockquote>
        </figure>
      );
      continue;
    }

    if (isFirstParagraph) {
      isFirstParagraph = false;
      const firstChar = block.text.charAt(0);
      const restOfText = block.text.slice(1);
      result.push(
        <p key={i} className="text-[1.0625rem] leading-[1.85] text-muted-foreground mb-6">
          <span className="float-left text-[3.5rem] font-serif font-bold leading-[0.85] mr-3 mt-1.5 text-foreground">
            {firstChar}
          </span>
          {processInline(restOfText, i)}
        </p>
      );
      continue;
    }

    result.push(
      <p key={i} className="text-[1.0625rem] leading-[1.85] text-muted-foreground mb-6">
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

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const article = blogArticles.find((a) => a.slug === slug);
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTocId, setActiveTocId] = useState("");
  const articleRef = useRef<HTMLDivElement>(null);

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
      setShowBackToTop(scrollTop > 400);

      const headingEls = document.querySelectorAll("article h2[id], article h3[id]");
      let current = "";
      headingEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
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

  return (
    <div className="min-h-screen" ref={articleRef}>
      <div
        className="fixed top-0 left-0 right-0 h-[3px] z-[60]"
        data-testid="reading-progress-track"
      >
        <motion.div
          className="h-full origin-left"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, hsl(250 85% 60%), hsl(280 80% 60%))",
          }}
          data-testid="reading-progress-bar"
        />
      </div>

      <div className="relative w-full h-[55vh] sm:h-[60vh] lg:h-[65vh] overflow-hidden">
        <img
          src={article.imagePath}
          alt={article.title}
          className="w-full h-full object-cover"
          style={{ filter: "saturate(1.15) contrast(1.05)" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.25) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(250,85%,60%,0.12) 0%, transparent 50%, hsla(280,80%,60%,0.08) 100%)" }} />

        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link href="/blog">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-6 backdrop-blur-md bg-white/10 border-white/20 text-white"
                  data-testid="link-back-to-blog"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                  All articles
                </Button>
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge className="no-default-hover-elevate no-default-active-elevate bg-primary text-primary-foreground text-xs" data-testid="badge-article-category">
                  {article.category}
                </Badge>
                <span className="flex items-center gap-1.5 text-sm text-white/70">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-white/70">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white max-w-3xl"
                data-testid="text-article-title"
              >
                {article.title}
              </h1>

              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <User className="w-4.5 h-4.5 text-white" />
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
                    <SiLinkedin className="w-3.5 h-3.5 text-white/60" />
                  </a>
                  <span className="text-xs text-white/50">Founder, Agile Vision</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24">
        <div className={`flex gap-16 ${showToc ? "lg:flex-row" : ""} flex-col`}>
          <article className="flex-1 max-w-[680px] mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              data-testid="article-content"
            >
              {renderMarkdown(article.content)}
            </motion.div>

            <div className="mt-16 pt-10 border-t border-border">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Written by</p>
                  <p className="text-lg font-semibold" data-testid="text-author-name">{article.author.name}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Founder of Agile Vision Technology. Building intelligent products and AI-powered solutions for businesses ready to move faster.
                  </p>
                  <a
                    href={article.author.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary font-medium mt-3"
                    data-testid="link-author-linkedin-bottom"
                  >
                    <SiLinkedin className="w-4 h-4" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </article>

          {showToc && (
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-24 z-[999]">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5">
                  In this article
                </p>
                <nav className="space-y-0.5 border-l border-border" data-testid="table-of-contents">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className={`block py-2 pl-4 text-sm transition-colors leading-snug -ml-px border-l-2 ${
                        activeTocId === h.id
                          ? "border-primary text-foreground font-medium"
                          : "border-transparent text-muted-foreground"
                      }`}
                      data-testid={`toc-link-${h.id}`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {relatedArticles.length > 0 && (
          <div className="mt-20 pt-10 border-t border-border">
            <h3 className="text-xl font-bold mb-8">More in {article.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedArticles.map((related) => (
                <Link key={related.slug} href={`/blog/${related.slug}`}>
                  <Card
                    className="cursor-pointer hover-elevate overflow-visible h-full"
                    data-testid={`card-related-${related.slug}`}
                  >
                    <div className="relative overflow-hidden rounded-t-md">
                      <img
                        src={related.imagePath}
                        alt={related.title}
                        className="w-full h-40 object-cover"
                        style={{ filter: "saturate(1.1)" }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span>{related.readTime}</span>
                      </div>
                      <h4 className="text-sm font-semibold leading-snug line-clamp-2">{related.title}</h4>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch gap-4 justify-between mt-14 max-w-[680px]">
          {prevArticle ? (
            <Link href={`/blog/${prevArticle.slug}`} className="flex-1">
              <Card
                className="w-full text-left p-5 cursor-pointer hover-elevate h-full"
                data-testid="link-prev-article"
              >
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <ArrowLeft className="w-3 h-3" /> Previous article
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
                className="w-full text-right p-5 cursor-pointer hover-elevate h-full"
                data-testid="link-next-article"
              >
                <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground mb-2">
                  Next article <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-medium line-clamp-2">{nextArticle.title}</span>
              </Card>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>

      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${showBackToTop ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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
      </div>
    </div>
  );
}
