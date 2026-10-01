import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page not found | Astraeus";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <p className="meta text-ink/50">Error 404</p>
      <h1 className="text-3xl font-semibold text-ink">Page not found</h1>
      <p className="max-w-sm text-muted-foreground">The page you are looking for doesn't exist or has moved.</p>
      <Link to="/" className="inline-flex h-11 items-center rounded-md bg-brand-blue px-5 text-sm font-medium text-white">
        Back to home
      </Link>
    </main>
  );
};

export default NotFound;
