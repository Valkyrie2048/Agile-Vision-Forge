import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { blogArticles, blogCategories } from "@/data/blog-articles";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogArticles
    : blogArticles.filter((a) => a.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium tracking-wider uppercase text-primary" data-testid="text-blog-label">
              Blog
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5" data-testid="text-blog-title">
            Insights & Ideas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed" data-testid="text-blog-subtitle">
            Thoughts on building intelligent products, designing for trust, and navigating the frontier of AI and automation.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-14"
          data-testid="blog-category-filter"
        >
          {blogCategories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "default" : "outline"}
              className="rounded-full toggle-elevate"
              onClick={() => setActiveCategory(cat)}
              data-testid={`button-category-${cat.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
            >
              {cat}
            </Button>
          ))}
        </motion.div>

        {featured && (
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-14"
          >
            <Link href={`/blog/${featured.slug}`}>
              <Card
                className="cursor-pointer overflow-visible hover-elevate"
                data-testid={`card-featured-${featured.slug}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden rounded-t-md lg:rounded-l-md lg:rounded-tr-none">
                    <img
                      src={featured.imagePath}
                      alt={featured.title}
                      className="w-full h-64 lg:h-80 object-cover"
                      style={{ filter: "saturate(1.15) contrast(1.05)" }}
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className="no-default-hover-elevate no-default-active-elevate backdrop-blur-md bg-primary text-primary-foreground text-xs">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                      <Badge variant="secondary" className="no-default-hover-elevate no-default-active-elevate text-xs">
                        {featured.category}
                      </Badge>
                      <span>{featured.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {featured.readTime}
                      </span>
                    </div>
                    <h2
                      className="text-2xl lg:text-3xl font-bold leading-tight mb-4"
                      data-testid="text-featured-title"
                    >
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <span className="text-xs text-muted-foreground">By {featured.author.name}</span>
                      <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                        Read article
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              >
                <Link href={`/blog/${article.slug}`}>
                  <Card
                    className="cursor-pointer overflow-visible h-full flex flex-col hover-elevate"
                    data-testid={`card-article-${article.slug}`}
                  >
                    <div className="relative overflow-hidden rounded-t-md">
                      <img
                        src={article.imagePath}
                        alt={article.title}
                        className="w-full h-52 object-cover"
                        style={{ filter: "saturate(1.1)" }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="text-xs no-default-hover-elevate no-default-active-elevate backdrop-blur-md bg-background/80">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span>{article.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold leading-snug mb-3">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs text-muted-foreground">By {article.author.name}</span>
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                          Read article
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <motion.div
            {...fadeUp}
            className="text-center py-24"
          >
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2" data-testid="text-no-articles">No articles yet</h3>
            <p className="text-muted-foreground">
              No articles in this category yet. Check back soon.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
