import { useEffect } from "react";
import { Logo } from "@/components/Logo";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found | Astreus";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <p className="text-sm text-white/60">Error 404</p>
      <h1 className="text-3xl font-semibold text-white">Page not found</h1>
      <p className="max-w-sm text-white/70">The page you are looking for doesn't exist or has moved.</p>
      <a href="/" className="inline-flex h-11 items-center rounded-sm bg-brand-orange px-5 text-sm font-medium text-ink">
        Back to home
      </a>
    </main>
  );
};

export default NotFound;
