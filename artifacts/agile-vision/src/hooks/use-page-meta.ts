import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  type?: "website" | "article";
}

const SITE_NAME = "Agile Vision";
const DEFAULT_TITLE = "Agile Vision - AI-Native Technology Studio";
const DEFAULT_DESC =
  "We build intelligent products powered by AI and Agentic AI. From concept to launch, we help startups and SMBs ship faster.";
const DEFAULT_IMAGE = "/og-image.png";

function setMeta(selector: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const attr = selector.startsWith('meta[property')
      ? "property"
      : "name";
    const val = selector.match(/["']([^"']+)["']/)?.[1] ?? "";
    el.setAttribute(attr, val);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function absUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${window.location.origin}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function usePageMeta({ title, description, imageUrl, url, type = "article" }: PageMetaOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const absImage = absUrl(imageUrl ?? DEFAULT_IMAGE);
    const canonicalUrl = url ?? window.location.href;

    document.title = fullTitle;

    setMeta(`meta[property="og:title"]`, fullTitle);
    setMeta(`meta[property="og:description"]`, description);
    setMeta(`meta[property="og:image"]`, absImage);
    setMeta(`meta[property="og:image:width"]`, "1200");
    setMeta(`meta[property="og:image:height"]`, "630");
    setMeta(`meta[property="og:url"]`, canonicalUrl);
    setMeta(`meta[property="og:type"]`, type);
    setMeta(`meta[property="og:site_name"]`, SITE_NAME);

    setMeta(`meta[name="twitter:title"]`, fullTitle);
    setMeta(`meta[name="twitter:description"]`, description);
    setMeta(`meta[name="twitter:image"]`, absImage);
    setMeta(`meta[name="twitter:card"]`, "summary_large_image");

    setMeta(`meta[name="description"]`, description);

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta(`meta[property="og:title"]`, DEFAULT_TITLE);
      setMeta(`meta[property="og:description"]`, DEFAULT_DESC);
      setMeta(`meta[property="og:image"]`, absUrl(DEFAULT_IMAGE));
      setMeta(`meta[property="og:url"]`, absUrl("/"));
      setMeta(`meta[property="og:type"]`, "website");
      setMeta(`meta[name="twitter:title"]`, DEFAULT_TITLE);
      setMeta(`meta[name="twitter:description"]`, DEFAULT_DESC);
      setMeta(`meta[name="twitter:image"]`, absUrl(DEFAULT_IMAGE));
      setMeta(`meta[name="description"]`, DEFAULT_DESC);
    };
  }, [title, description, imageUrl, url, type]);
}
