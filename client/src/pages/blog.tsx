import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { blogArticles, blogCategories } from "@/data/blog-articles";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? blogArticles
    : blogArticles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" data-testid="text-blog-title">
            Insights & Ideas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-blog-subtitle">
            Thoughts on building intelligent products, designing for trust, and navigating the frontier of AI and automation.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-12" data-testid="blog-category-filter">
          {blogCategories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={activeCategory === cat ? "default" : "secondary"}
              className="rounded-full toggle-elevate"
              onClick={() => setActiveCategory(cat)}
              data-testid={`button-category-${cat.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
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
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-xs no-default-hover-elevate no-default-active-elevate backdrop-blur-md bg-background/70">
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold leading-snug mb-2">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
                      Read article
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground" data-testid="text-no-articles">
            No articles in this category yet. Check back soon.
          </div>
        )}
      </div>
    </div>
  );
}
