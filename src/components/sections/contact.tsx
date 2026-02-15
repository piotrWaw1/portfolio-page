import { CheckCircle, Send } from "lucide-react";
import { AnimateIn } from "../ui/animate-in";
import { useState } from "react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
  }

  return (
    <section id="contact" className="mesh-bg-warm px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <AnimateIn>
          <p className="text-amber mb-4 font-mono text-sm">
            04. What{"'"}s Next?
          </p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h2 className="gradient-text-warm mb-6 text-3xl font-bold md:text-5xl">
            Get In Touch
          </h2>
        </AnimateIn>

        <AnimateIn delay={200}>
          <p className="text-muted-foreground mb-12 leading-relaxed">
            I{"'"}m currently looking for new opportunities. Whether you have a
            question, a project idea, or just want to say hi, my inbox is always
            open. I{"'"}ll try my best to get back to you!
          </p>
        </AnimateIn>

        <AnimateIn delay={300}>
          {submitted ? (
            <div className="border-primary/30 from-primary/5 to-accent/5 rounded-xl border bg-gradient-to-br p-8">
              <CheckCircle className="text-primary mx-auto mb-4 h-12 w-12" />
              <p className="gradient-text text-lg font-medium">
                Thanks for reaching out!
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                I{"'"}ll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-accent hover:text-foreground mt-6 font-mono text-sm underline underline-offset-4 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 text-left"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-amber font-mono text-xs uppercase"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus:border-amber focus:ring-amber rounded-xl border px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-rose font-mono text-xs uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus:border-rose focus:ring-rose rounded-xl border px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-accent font-mono text-xs uppercase"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:ring-accent resize-none rounded-xl border px-4 py-3 text-sm transition-all focus:ring-1 focus:outline-none"
                  placeholder="Hey Alex, I'd love to chat about..."
                />
              </div>
              <button
                type="submit"
                className="glow-green border-primary/40 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/20 mt-2 inline-flex items-center justify-center gap-2 self-center rounded-xl border px-8 py-3.5 font-mono text-sm transition-all"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </AnimateIn>
      </div>
    </section>
  );
}
