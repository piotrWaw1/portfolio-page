import { CheckCircle, Send } from "lucide-react";
import { AnimateIn } from "../ui/animate-in";
import { useEffect, useState } from "react";
import { z } from "astro/zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { toast } from "sonner";
import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import { defaultLang } from "@/i18n/ui";

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string().max(300),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [t, setT] = useState(() => useTranslations(defaultLang));

  useEffect(() => {
    const lang = getLangFromUrl(new URL(window.location.href));
    setT(() => useTranslations(lang));
  }, []);  

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: ContactForm) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 400 || response.status === 500) {
        toast.error("Missing field or incorrect email address", {
          style: {
            "--normal-bg":
              "color-mix(in oklab, var(--destructive) 10%, var(--background))",
            "--normal-text": "var(--destructive)",
            "--normal-border": "var(--destructive)",
          } as React.CSSProperties,
        });
      } else {
        setSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="contact" className="mesh-bg-warm px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <AnimateIn>
          <p className="text-amber mb-4 font-mono text-sm">
            04. {t("contact.whatsNext")}
          </p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h2 className="gradient-text-warm mb-6 text-3xl font-bold md:text-5xl">
            {t("contact.getInTouch")}
          </h2>
        </AnimateIn>

        <AnimateIn delay={200}>
          <p className="text-muted-foreground mb-12 leading-relaxed">
            {t("contact.iAmCurrentlyLookingForNewOpportunity")}
          </p>
        </AnimateIn>

        <AnimateIn delay={300}>
          {submitted ? (
            <div className="border-primary/30 from-primary/5 to-accent/5 rounded-xl border bg-gradient-to-br p-8">
              <CheckCircle className="text-primary mx-auto mb-4 h-12 w-12" />
              <p className="gradient-text text-lg font-medium">
                {t("contact.thanksForReachingOut")}
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                {t("contact.iWillGetBackToYou")}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-accent hover:text-foreground mt-6 font-mono text-sm underline underline-offset-4 transition-colors"
              >
                {t("contact.sendAnotherMessage")}
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Controller
                    disabled={isLoading}
                    name={"name"}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="form-name"
                          className="text-amber font-mono uppercase"
                        >
                          {t("contact.name")}
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-name"
                          aria-invalid={fieldState.invalid}
                          placeholder="John Doe"
                          autoComplete="off"
                          className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-amber focus-visible:ring-amber/65 rounded-xl border px-4 py-6 transition-all"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    disabled={isLoading}
                    name={"email"}
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="form-email"
                          className="text-rose font-mono uppercase"
                        >
                          {t("contact.email")}
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-email"
                          aria-invalid={fieldState.invalid}
                          placeholder="john@example.com"
                          autoComplete="off"
                          className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-rose focus-visible:ring-rose/65 rounded-xl border px-4 py-6 transition-all"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <Controller
                  disabled={isLoading}
                  name={"message"}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="form-message"
                        className="text-accent font-mono uppercase"
                      >
                        {t("contact.message")}
                      </FieldLabel>
                      <Textarea
                        {...field}
                        id="form-message"
                        aria-invalid={fieldState.invalid}
                        placeholder={t("contact.heyAlex")}
                        autoComplete="off"
                        className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-accent focus-visible:ring-accent/65 h-30 resize-none rounded-xl border px-4 py-3 transition-all"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <button
                  disabled={isLoading}
                  type="submit"
                  className="glow-green border-primary/40 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/20 mt-2 inline-flex items-center justify-center gap-2 self-center rounded-xl border px-8 py-3.5 font-mono text-sm transition-all"
                >
                  {t("contact.sendMessage")}
                  <Send className="h-4 w-4" />
                </button>
              </FieldGroup>
            </form>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
