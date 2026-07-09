import { useEffect } from "react";
import { useLocation } from "wouter";
import { setCanonical, absUrl } from "@/hooks/use-page-meta";

/**
 * Ensures every route has a correct absolute canonical URL, even pages that
 * don't call usePageMeta directly (home, contact, get-started, simulator, blog list).
 * Pages that call usePageMeta with an explicit `url` (e.g. blog articles) set a more
 * specific canonical on mount; this runs after route changes and keeps the default
 * (path-based) canonical correct everywhere else.
 */
export function useRouteCanonical() {
  const [location] = useLocation();

  useEffect(() => {
    setCanonical(absUrl(location || "/"));
  }, [location]);
}
