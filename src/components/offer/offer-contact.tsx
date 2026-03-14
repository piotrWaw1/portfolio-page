import { useState } from "react";
import { AnimateIn } from "../ui/animate-in";
import { CheckCircle, Send } from "lucide-react";

export default function OfferContact() {
  const projectTypes = [
    "Landing Page",
    "Business Website",
    "E-commerce",
    "Web Application",
    "Redesign",
    "Other",
  ];

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormState({
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <AnimateIn>
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="from-amber/40 h-px flex-1 bg-gradient-to-l to-transparent" />
            <h2 className="text-foreground flex items-center gap-2 text-2xl font-bold md:text-3xl">
              <span className="text-amber font-mono text-lg md:text-xl">
                04.
              </span>
              Start a Project
            </h2>
            <div className="from-amber/40 h-px flex-1 bg-gradient-to-r to-transparent" />
          </div>
        </AnimateIn>

        <AnimateIn delay={100}>
          <p className="text-muted-foreground mb-12 text-center leading-relaxed">
            Ready to bring your idea to life? Tell us about your project and
            we'll get back to you within 24 hours with a free consultation and
            estimate.
          </p>
        </AnimateIn>

        <AnimateIn delay={200}>
          {submitted ? (
            <div className="border-primary/30 from-primary/5 to-accent/5 rounded-2xl border bg-gradient-to-br p-10 text-center">
              <CheckCircle className="text-primary mx-auto mb-4 h-14 w-14" />
              <p className="gradient-text text-xl font-semibold">
                Thank you for your inquiry!
              </p>
              <p className="text-muted-foreground mt-3">
                "We'll review your project details and get back to you within 24
                hours."
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-accent hover:text-foreground mt-8 font-mono text-sm underline underline-offset-4 transition-colors"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="border-border/50 bg-card/50 flex flex-col gap-6 rounded-2xl border p-6 md:p-8"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="offer-name"
                    className="text-primary font-mono text-xs uppercase"
                  >
                    Your Name
                  </label>
                  <input
                    id="offer-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary rounded-xl border px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none"
                    placeholder="Jane Smith"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="offer-email"
                    className="text-cyan font-mono text-xs uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="offer-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:ring-cyan rounded-xl border px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none"
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="offer-company"
                    className="text-accent font-mono text-xs uppercase"
                  >
                    Company / Brand
                  </label>
                  <input
                    id="offer-company"
                    type="text"
                    value={formState.company}
                    onChange={(e) =>
                      setFormState({ ...formState, company: e.target.value })
                    }
                    className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:ring-accent rounded-xl border px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none"
                    placeholder="Acme Inc."
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="offer-type"
                    className="text-amber font-mono text-xs uppercase"
                  >
                    Project Type
                  </label>
                  <select
                    id="offer-type"
                    required
                    value={formState.projectType}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        projectType: e.target.value,
                      })
                    }
                    className="border-border bg-secondary/50 text-foreground focus:border-amber focus:ring-amber rounded-xl border px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select a type...
                    </option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="offer-budget"
                  className="text-rose font-mono text-xs uppercase"
                >
                  Estimated Budget
                </label>
                <select
                  id="offer-budget"
                  value={formState.budget}
                  onChange={(e) =>
                    setFormState({ ...formState, budget: e.target.value })
                  }
                  className="border-border bg-secondary/50 text-foreground focus:border-rose focus:ring-rose rounded-xl border px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none"
                >
                  <option value="" disabled>
                    Select a range...
                  </option>
                  <option value="under-2k">Under $2,000</option>
                  <option value="2k-5k">$2,000 - $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-25k">$10,000 - $25,000</option>
                  <option value="25k+">$25,000+</option>
                  <option value="not-sure">Not sure yet</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="offer-message"
                  className="text-violet font-mono text-xs uppercase"
                >
                  Project Details
                </label>
                <textarea
                  id="offer-message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus:border-violet focus:ring-violet resize-none rounded-xl border px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none"
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                className="glow-green border-primary/40 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/20 mt-2 inline-flex items-center justify-center gap-2 self-center rounded-xl border px-8 py-3.5 font-mono text-sm transition-all"
              >
                Send Inquiry
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
