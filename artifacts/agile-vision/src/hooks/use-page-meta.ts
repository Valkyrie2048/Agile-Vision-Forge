import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>;
}

const JSON_LD_ID = "page-json-ld";

function setJsonLd(data: Record<string, unknown> | undefined) {
  let el = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.id = JSON_LD_ID;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

const SITE_NAME = "Vision AI Works";
const DEFAULT_TITLE = "Vision AI Works - AI-Native Technology Studio";
const DEFAULT_DESC =
  "We build intelligent products powered by AI and Agentic AI. From concept to launch, we help startups and SMBs ship faster.";
const DEFAULT_IMAGE = "/opengraph.jpg";

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

export function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function absUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${window.location.origin}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function usePageMeta({ title, description, imageUrl, url, type = "article", jsonLd }: PageMetaOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const absImage = absUrl(DEFAULT_IMAGE);
    const canonicalUrl = url ?? window.location.href;

    document.title = fullTitle;
    setCanonical(canonicalUrl);
    setJsonLd(jsonLd);

    setMeta(`meta[property="og:title"]`, fullTitle);
    setMeta(`meta[property="og:description"]`, description);
    setMeta(`meta[property="og:image"]`, absImage);
    setMeta(`meta[property="og:image:width"]`, "1280");
    setMeta(`meta[property="og:image:height"]`, "720");
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
      setCanonical(absUrl("/"));
      setJsonLd(undefined);
      setMeta(`meta[property="og:title"]`, DEFAULT_TITLE);
      setMeta(`meta[property="og:description"]`, DEFAULT_DESC);
      setMeta(`meta[property="og:image"]`, absUrl(DEFAULT_IMAGE));
      setMeta(`meta[property="og:image:width"]`, "1280");
      setMeta(`meta[property="og:image:height"]`, "720");
      setMeta(`meta[property="og:url"]`, absUrl("/"));
      setMeta(`meta[property="og:type"]`, "website");
      setMeta(`meta[name="twitter:title"]`, DEFAULT_TITLE);
      setMeta(`meta[name="twitter:description"]`, DEFAULT_DESC);
      setMeta(`meta[name="twitter:image"]`, absUrl(DEFAULT_IMAGE));
      setMeta(`meta[name="description"]`, DEFAULT_DESC);
    };
  }, [title, description, imageUrl, url, type, jsonLd]);
}
