import { useRef, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { CONTACT, SITE } from "@/content/site";
import { useContactForm, type ContactFormData } from "@/hooks/use-contact-form";
import { cn } from "@/lib/utils";

// EmailJS public configuration (client-side keys by design)
const EMAILJS_CONFIG = {
  SERVICE_ID: "service_0budz4c",
  TEMPLATE_ID: "template_ppl2ogf",
  PUBLIC_KEY: "LWYAogkkxbuaPIF2O",
};

// Client-side spam throttle
const SPAM = { MAX_ATTEMPTS: 5, WINDOW_MS: 3_600_000 };

function allowAttempt(): boolean {
  try {
    const now = Date.now();
    const raw = localStorage.getItem("contactAttempts");
    const data = raw ? (JSON.parse(raw) as { attempts: number; timestamp: number }) : null;
    if (!data || now - data.timestamp > SPAM.WINDOW_MS) {
      localStorage.setItem("contactAttempts", JSON.stringify({ attempts: 1, timestamp: now }));
      return true;
    }
    if (data.attempts >= SPAM.MAX_ATTEMPTS) return false;
    localStorage.setItem("contactAttempts", JSON.stringify({ ...data, attempts: data.attempts + 1 }));
    return true;
  } catch {
    return true; // storage unavailable: do not block the user
  }
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

const fieldClass =
  "mt-2 block w-full rounded-sm border border-white/20 bg-white/[0.04] px-3.5 py-3 text-[0.9375rem] text-white placeholder:text-white/40 transition-colors hover:border-white/35 focus:border-brand-orange focus:outline-none focus:ring-1 focus:ring-brand-orange aria-[invalid=true]:border-[#ff8a80]";

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label}
        {optional && <span className="ml-2 text-xs font-normal text-white/60">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#ff8a80]">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactSection() {
  const { formData, errors, updateField, validateField, validateForm, resetForm } = useContactForm();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const bind = (name: keyof ContactFormData) => ({
    id: name,
    name,
    value: formData[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      updateField(name, e.target.value),
    onBlur: () => validateField(name),
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    className: fieldClass,
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const invalid = validateForm();
    if (invalid) {
      formRef.current?.querySelector<HTMLElement>(`#${invalid}`)?.focus();
      return;
    }
    if (!allowAttempt()) {
      setStatus({ kind: "error", message: "Too many submissions. Please try again later or email us directly." });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      const { name, company, email, projectType, message } = formData;
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          nome: name,
          email,
          telefone: "Not provided",
          assunto: `${projectType}${company ? ` — ${company}` : ""}`,
          mensagem: `${message}\n\nCompany: ${company || "Not provided"}\nProject type: ${projectType}`,
        },
        { publicKey: EMAILJS_CONFIG.PUBLIC_KEY },
      );
      setStatus({ kind: "success" });
      resetForm();
    } catch {
      setStatus({ kind: "error", message: `We couldn't send your message. Please try again or email ${SITE.email}.` });
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader id="contact-title" title={CONTACT.title} lede={CONTACT.lede} />
          <dl className="mt-10 space-y-5 border-t border-white/10 pt-6 text-sm">
            <div>
              <dt className="text-sm text-white/60">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${SITE.email}`} className="inline-block py-1.5 text-base text-white underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-white/60">Based in</dt>
              <dd className="mt-1 text-base text-white">{SITE.location}</dd>
            </div>
          </dl>
        </div>

        <form ref={formRef} onSubmit={onSubmit} noValidate className="lg:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Name" error={errors.name}>
              <input type="text" autoComplete="name" maxLength={100} required {...bind("name")} />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input type="email" autoComplete="email" maxLength={255} required {...bind("email")} />
            </Field>
            <Field id="company" label="Company" optional>
              <input type="text" autoComplete="organization" maxLength={100} {...bind("company")} />
            </Field>
            <Field id="projectType" label="Project type" error={errors.projectType}>
              <select required {...bind("projectType")} className={cn(fieldClass, "appearance-auto")}>
                <option value="">Select…</option>
                {CONTACT.types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-5">
            <Field id="message" label="Message" error={errors.message}>
              <textarea rows={6} maxLength={1000} required {...bind("message")} className={cn(fieldClass, "resize-y")} />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-brand-orange px-6 text-sm font-medium text-ink transition-colors hover:bg-brand-orange/90 disabled:opacity-60"
            >
              {status.kind === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              {status.kind === "sending" ? "Sending…" : "Start a project"}
            </button>
            <p role="status" aria-live="polite" className="text-sm">
              {status.kind === "success" && <span className="text-white">Message sent. We'll reply by email.</span>}
              {status.kind === "error" && <span className="text-[#ff8a80]">{status.message}</span>}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
