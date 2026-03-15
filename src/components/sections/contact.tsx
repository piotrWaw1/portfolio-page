import { CheckCircle, Send } from "lucide-react";
import { AnimateIn } from "../ui/animate-in";
import { useEffect, useState, useRef } from "react";
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
import gsap from "gsap";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [t, setT] = useState(() => useTranslations(defaultLang));
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const lang = getLangFromUrl(new URL(window.location.href));
    setT(() => useTranslations(lang));
  }, []);

  // Magnetic Button Effect
  useEffect(() => {
    const button = buttonRef.current;
    if (!button || window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.3;
      const y = (e.clientY - top - height / 2) * 0.3;

      gsap.to(button, { x, y, duration: 0.3, ease: "power3.out" });
    };

    const onMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    button.addEventListener("mousemove", onMouseMove);
    button.addEventListener("mouseleave", onMouseLeave);

    return () => {
      button.removeEventListener("mousemove", onMouseMove);
      button.removeEventListener("mouseleave", onMouseLeave);
    };
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
        toast.error("Failed to send message. Please try again.", {
          style: {
            "--normal-bg": "color-mix(in oklab, var(--destructive) 10%, var(--background))",
            "--normal-text": "var(--destructive)",
            "--normal-border": "var(--destructive)",
          } as React.CSSProperties,
        });
      } else {
        setSubmitted(true);
        form.reset();
        toast.success("Message sent successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="contact" className="mesh-bg-warm px-6 py-24 md:py-32 relative">
      <div className="mx-auto max-w-2xl text-center">
        <AnimateIn>
          <p className="text-amber mb-4 font-mono text-sm tracking-wider uppercase font-semibold">
            04. {t("contact.whatsNext")}
          </p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h2 className="gradient-text-warm mb-6 text-4xl font-bold md:text-6xl tracking-tight">
            {t("contact.getInTouch")}
          </h2>
        </AnimateIn>

        <AnimateIn delay={200}>
          <p className="text-muted-foreground mb-12 leading-relaxed text-lg text-balance max-w-xl mx-auto">
            {t("contact.iAmCurrentlyLookingForNewOpportunity")}
          </p>
        </AnimateIn>

        <AnimateIn delay={300}>
          {submitted ? (
            <div className="border-primary/20 from-primary/5 to-accent/5 rounded-3xl border bg-gradient-to-br p-12 backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(114,30,150,0.1)]">
              <CheckCircle className="text-primary mx-auto mb-6 h-16 w-16 drop-shadow-[0_0_15px_rgba(114,30,150,0.5)]" />
              <p className="gradient-text text-2xl font-bold tracking-tight">
                {t("contact.thanksForReachingOut")}
              </p>
              <p className="text-muted-foreground mt-3 text-base">
                {t("contact.iWillGetBackToYou")}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-accent hover:text-primary mt-8 font-mono text-sm uppercase tracking-wider underline underline-offset-8 transition-colors"
              >
                {t("contact.sendAnotherMessage")}
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)} className="text-left relative z-10">
              <div className="rounded-3xl border border-white/5 bg-secondary/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                <FieldGroup>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Controller
                      disabled={isLoading}
                      name={"name"}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="form-name"
                            className="text-amber/90 font-mono text-xs tracking-wider uppercase"
                          >
                            {t("contact.name")}
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-name"
                            aria-invalid={fieldState.invalid}
                            placeholder="John Doe"
                            autoComplete="off"
                            className="border-white/10 bg-background/40 text-foreground placeholder:text-muted-foreground/30 focus-visible:border-amber focus-visible:ring-amber/30 rounded-2xl border px-5 py-6 transition-all duration-300 hover:bg-background/60 shadow-inner"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error?.message || "Invalid input"]} />
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
                            className="text-rose/90 font-mono text-xs tracking-wider uppercase"
                          >
                            {t("contact.email")}
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-email"
                            aria-invalid={fieldState.invalid}
                            placeholder="john@example.com"
                            autoComplete="off"
                            className="border-white/10 bg-background/40 text-foreground placeholder:text-muted-foreground/30 focus-visible:border-rose focus-visible:ring-rose/30 rounded-2xl border px-5 py-6 transition-all duration-300 hover:bg-background/60 shadow-inner"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error?.message || "Invalid input"]} />
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
                          className="text-accent/90 font-mono text-xs tracking-wider uppercase mt-2"
                        >
                          {t("contact.message")}
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="form-message"
                          aria-invalid={fieldState.invalid}
                          placeholder={t("contact.heyAlex")}
                          autoComplete="off"
                          className="border-white/10 bg-background/40 text-foreground placeholder:text-muted-foreground/30 focus-visible:border-accent focus-visible:ring-accent/30 min-h-[150px] resize-none rounded-2xl border px-5 py-4 transition-all duration-300 hover:bg-background/60 shadow-inner"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error?.message || "Invalid input"]} />
                        )}
                      </Field>
                    )}
                  />
                  
                  <div className="mt-6 flex justify-center">
                    <button
                      ref={buttonRef}
                      disabled={isLoading}
                      type="submit"
                      className="glow-green border-primary/40 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/20 relative inline-flex items-center justify-center gap-3 rounded-full border px-10 py-4 font-mono text-sm tracking-wider uppercase font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isLoading ? "Sending..." : t("contact.sendMessage")}
                        {!isLoading && <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                      </span>
                    </button>
                  </div>
                </FieldGroup>
              </div>
            </form>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
