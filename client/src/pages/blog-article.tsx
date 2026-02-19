import { useState, useEffect, useRef } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { blogArticles } from "@/data/blog-articles";
import { Clock, ArrowLeft, ArrowRight, ChevronUp } from "lucide-react";
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

  const flushList = () => {
    if (listItems.length > 0) {
      result.push(
        <ul key={`ul-${listItems[0].index}`} className="space-y-2 my-5 ml-1">
          {listItems.map((item) => (
            <li key={item.index} className="flex gap-3 text-base leading-[1.8] text-muted-foreground">
              <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
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
          <h2 key={i} id={id} className="text-2xl font-bold mt-12 mb-5 scroll-mt-24 text-foreground">
            {block.text}
          </h2>
        );
      } else {
        result.push(
          <h3 key={i} id={id} className="text-xl font-semibold mt-8 mb-4 scroll-mt-24 text-foreground">
            {block.text}
          </h3>
        );
      }
      continue;
    }

    if (block.type === "blockquote") {
      result.push(
        <blockquote
          key={i}
          className="relative my-10 py-6 px-8 border-l-4 border-primary bg-primary/5"
        >
          <p className="text-lg font-medium leading-relaxed text-foreground italic">
            {block.text}
          </p>
        </blockquote>
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
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setProgress(0);
    setShowBackToTop(false);
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(pct);
      setShowBackToTop(scrollTop > 400);
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
    .slice(0, 2);

  return (
    <div className="min-h-screen" ref={articleRef}>
      <div
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary/20 z-[60]"
        data-testid="reading-progress-track"
      >
        <motion.div
          className="h-full bg-primary origin-left"
          style={{ width: `${progress}%` }}
          data-testid="reading-progress-bar"
        />
      </div>

      <div className="relative w-full h-[50vh] sm:h-[55vh] lg:h-[60vh] overflow-hidden">
        <img
          src={article.imagePath}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 pb-10 lg:pb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link href="/blog">
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-5 backdrop-blur-md bg-white/10 border-white/20 text-white"
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
                <span className="text-sm text-white/70">{article.date}</span>
                <span className="flex items-center gap-1 text-sm text-white/70">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight text-white"
                data-testid="text-article-title"
              >
                {article.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20">
        <div className={`flex gap-12 ${showToc ? "lg:flex-row" : ""} flex-col`}>
          <article className="flex-1 max-w-[680px] mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              data-testid="article-content"
            >
              {renderMarkdown(article.content)}
            </motion.div>
          </article>

          {showToc && (
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 z-[999]">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  In this article
                </p>
                <nav className="space-y-1" data-testid="table-of-contents">
                  {headings.map((h) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="block py-1.5 text-sm text-muted-foreground transition-colors leading-snug"
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

        <hr className="my-14 border-border max-w-[680px]" />

        {relatedArticles.length > 0 && (
          <div className="max-w-[680px] mb-14">
            <h3 className="text-lg font-semibold mb-6">More in {article.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        className="w-full h-36 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-muted-foreground">{related.readTime}</span>
                      <h4 className="text-sm font-semibold mt-1 leading-snug line-clamp-2">{related.title}</h4>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch gap-4 justify-between max-w-[680px]">
          {prevArticle ? (
            <Link href={`/blog/${prevArticle.slug}`} className="flex-1">
              <Card
                className="w-full text-left p-5 cursor-pointer hover-elevate h-full"
                data-testid="link-prev-article"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <ArrowLeft className="w-3 h-3" /> Previous
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
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-2">
                  Next <ArrowRight className="w-3 h-3" />
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
