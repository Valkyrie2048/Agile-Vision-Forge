import { useEffect } from "react";

export function usePageTitle(title: string) {
  useEffect(() => {
    const base = "Vision AI Works";
    document.title = title ? `${title} | ${base}` : `${base} - AI-Native Technology Studio`;
  }, [title]);
}
