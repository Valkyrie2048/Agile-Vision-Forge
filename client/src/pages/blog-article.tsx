import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { blogArticles } from "@/data/blog-articles";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
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

    if (line.trim() === "") {
      flushParagraph();
      continue;
    }

    currentParagraph.push(line);
  }
  flushParagraph();

  return blocks.map((block, i) => {
    const processInline = (text: string) => {
      const parts: (string | JSX.Element)[] = [];
      const regex = /\*\*(.+?)\*\*/g;
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }
        parts.push(
          <strong key={`b-${i}-${match.index}`} className="font-semibold text-foreground">
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

    if (block.type === "heading") {
      const Tag = block.level === 2 ? "h2" : "h3";
      const className =
        block.level === 2
          ? "text-2xl font-bold mt-10 mb-4"
          : "text-xl font-semibold mt-8 mb-3";
      return (
        <Tag key={i} className={className}>
          {block.text}
        </Tag>
      );
    }

    return (
      <p key={i} className="text-base leading-[1.8] text-muted-foreground mb-5">
        {processInline(block.text)}
      </p>
    );
  });
}

export default function BlogArticle() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been moved.
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

  return (
    <div className="min-h-screen pt-24 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog">
            <Button
              variant="ghost"
              size="sm"
              className="mb-8"
              data-testid="link-back-to-blog"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              All articles
            </Button>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Badge variant="secondary" data-testid="badge-article-category">
              {article.category}
            </Badge>
            <span className="text-sm text-muted-foreground">{article.date}</span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight mb-8"
            data-testid="text-article-title"
          >
            {article.title}
          </h1>

          <div className="relative rounded-md overflow-hidden mb-10">
            <img
              src={article.imagePath}
              alt={article.title}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          <div data-testid="article-content">
            {renderMarkdown(article.content)}
          </div>
        </motion.div>

        <hr className="my-12 border-border" />

        <div className="flex flex-col sm:flex-row items-stretch gap-4 justify-between">
          {prevArticle ? (
            <Link href={`/blog/${prevArticle.slug}`} className="flex-1">
              <Card
                className="w-full text-left p-4 cursor-pointer hover-elevate h-full"
                data-testid="link-prev-article"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
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
                className="w-full text-right p-4 cursor-pointer hover-elevate h-full"
                data-testid="link-next-article"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1">
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-medium line-clamp-2">{nextArticle.title}</span>
              </Card>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </article>
    </div>
  );
}
