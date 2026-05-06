import { useEffect, useState } from "react";
import { AnimateIn } from "../ui/animate-in";
import { CheckCircle, Send } from "lucide-react";
import { getLangFromUrl, useTranslations } from "@/i18n/utils";
import { DefaultLocale } from "@/types/locales.types";
import { z } from "astro/zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import SelectComponent from "../select-component";

const contactFormSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  company: z.string().optional(),
  projectType: z.string(),
  message: z.string().max(500),
});

type ContactForm = z.infer<typeof contactFormSchema>;

export default function OfferContact() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false);
  const [t, setT] = useState(() => useTranslations(DefaultLocale));

  const projectTypes = {
    landingPage: t("offer.contatctForm.landingPage"),
    businessWebside: t("offer.contatctForm.businessWebsite"),
    eCommerce: t("offer.contatctForm.eComerce"),
    webAplication: t("offer.contatctForm.webApplication"),
    redesign: t("offer.contatctForm.redesign"),
    other: t("offer.contatctForm.other"),
  };

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      message: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: ContactForm) {
    console.log(data);

    setSubmitted(true);
    form.reset();
  }

  useEffect(() => {
    const lang = getLangFromUrl(new URL(window.location.href));
    setT(() => useTranslations(lang));
  }, []);

  return (
    <section id="contact" className="mesh-bg-warm px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <div className="mb-12 flex items-center gap-4">
            <h2 className="text-foreground flex items-center gap-2 text-2xl font-bold md:text-3xl">
              <span className="text-amber font-mono text-lg md:text-xl">
                {" "}
                04.{" "}
              </span>
              {t("offer.contatctForm.startProject")}
            </h2>
            <div className="from-amber/40 h-px flex-1 bg-gradient-to-r to-transparent"></div>
          </div>
        </AnimateIn>
      </div>

      <div className="mx-auto max-w-3xl">
        <AnimateIn delay={100}>
          <h2 className="gradient-text-warm mb-6 text-center text-3xl font-bold md:text-5xl">
            {t("offer.contatctForm.contactWithUs")}
          </h2>
        </AnimateIn>

        <AnimateIn delay={100}>
          <p className="text-muted-foreground mb-12 text-center leading-relaxed">
            {t("offer.contatctForm.readyToBringYourIdeaToLife")}
          </p>
        </AnimateIn>

        <AnimateIn delay={200}>
          {submitted ? (
            <div className="border-primary/30 from-primary/5 to-accent/5 rounded-2xl border bg-gradient-to-br p-10 text-center">
              <CheckCircle className="text-primary mx-auto mb-4 h-14 w-14" />
              <p className="gradient-text text-xl font-semibold">
                {t("offer.contatctForm.thankYouForInquiry")}
              </p>
              <p className="text-muted-foreground mt-3">
                {t("offer.contatctForm.weWillReviewYourProjectDetails")}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-accent hover:text-foreground mt-8 font-mono text-sm underline underline-offset-4 transition-colors"
              >
                {t("offer.contatctForm.submitAnotherInquiry")}
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="bg-secondary/10 rounded-3xl border border-white/5 p-6 backdrop-blur-xl md:p-8">
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
                            className="text-primary font-mono uppercase"
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
                            className="text-cyan font-mono uppercase"
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
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Controller
                      disabled={isLoading}
                      name={"company"}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="form-company"
                            className="text-rose font-mono uppercase"
                          >
                            {t("offer.contatctForm.companyBrand")}
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-company"
                            aria-invalid={fieldState.invalid}
                            placeholder="Company"
                            autoComplete="off"
                            className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus-visible:border-rose focus-visible:ring-rose/65 rounded-xl border px-4 py-6 transition-all"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      disabled={isLoading}
                      name={"projectType"}
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="form-projectType"
                            className="text-amber font-mono uppercase"
                          >
                            {t("offer.contatctForm.projectType")}
                          </FieldLabel>
                          <SelectComponent
                            field={field}
                            options={projectTypes}
                            label={t("offer.contatctForm.projectType")}
                            placeholder={t(
                              "offer.contatctForm.selectProjectType",
                            )}
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
                    className="group glow-green border-primary/40 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/20 mt-2 inline-flex items-center justify-center gap-2 self-center rounded-xl border px-8 py-3.5 font-mono text-sm transition-all"
                  >
                    <span className="transition-all duration-300 ease-in-out">
                      {t("contact.sendMessage")}
                    </span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </FieldGroup>
              </div>
            </form>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
