import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const hero = defineCollection({
  type: "content",
  schema: z.object({
    badge: z.string(),
    heading: z.string(),
    subheading: z.string(),
    ctaText: z.string(),
  }),
});

const about = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    skillsTitle: z.string(),
  }),
});

const experience = defineCollection({
  type: "data", // Note: type is 'data' (JSON), not 'content' (Markdown)
  schema: z.object({
    title: z.string(),
    jobs: z.array(
      z.object({
        period: z.string(),
        title: z.string(),
        company: z.string(),
        url: z.string().optional(),
        description: z.string(),
        tags: z.array(z.string()),
      }),
    ),
  }),
});

export const collections = {
  hero,
  about,
  experience,
};
