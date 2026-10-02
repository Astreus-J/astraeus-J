import { useCallback, useState } from "react";

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const EMPTY: ContactFormData = { name: "", company: "", email: "", projectType: "", message: "" };

const validators: Record<keyof ContactFormData, (value: string) => string | undefined> = {
  name: (v) => (v.trim().length < 2 ? "Enter your name." : undefined),
  company: () => undefined,
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? undefined : "Enter a valid email address."),
  projectType: (v) => (v ? undefined : "Select a project type."),
  message: (v) => (v.trim().length < 10 ? "Tell us a little more (at least 10 characters)." : undefined),
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const updateField = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: validators[field](value) } : prev));
  }, []);

  const validateField = useCallback(
    (field: keyof ContactFormData) => setErrors((prev) => ({ ...prev, [field]: validators[field](formData[field]) })),
    [formData],
  );

  /** Returns the name of the first invalid field, or null when the form is valid. */
  const validateForm = useCallback((): keyof ContactFormData | null => {
    const next: ContactFormErrors = {};
    let first: keyof ContactFormData | null = null;
    (Object.keys(formData) as Array<keyof ContactFormData>).forEach((f) => {
      const err = validators[f](formData[f]);
      if (err) {
        next[f] = err;
        first ??= f;
      }
    });
    setErrors(next);
    return first;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(EMPTY);
    setErrors({});
  }, []);

  return { formData, errors, updateField, validateField, validateForm, resetForm };
};
