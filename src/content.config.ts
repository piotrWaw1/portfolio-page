import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const heroSchema = z.object({
  badge: z.string(),
  heading: z.string(),
  subheading: z.string(),
  ctaText: z.string(),
});

const aboutSchema = z.object({
  title: z.string(),
  skillsTitle: z.string(),
  skills: z.array(z.object({ title: z.string(), color: z.string() })),
});

const experienceSchema = z.object({
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
});

const projectsSchema = z.object({
  title: z.string(),
  mainProjects: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      description: z.string(),
      githubUrl: z.string().optional(),
      projectUrl: z.string().optional(),
      accentFrom: z.string(),
      accentTo: z.string(),
      borderColor: z.string(),
      glowClass: z.string(),
      subTitleColor: z.string(),
      technologies: z.array(z.string()),
    }),
  ),
  otherProjects: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      githubUrl: z.string().optional(),
      projectUrl: z.string().optional(),
      folderColor: z.string(),
      hover: z.string(),
      borderHoverColor: z.string(),
      technologies: z.array(z.string()),
    }),
  ),
});

const offerServices = z.object({
  title: z.string(),
  description: z.string(),
  services: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      keyWords: z.array(z.string()),
    }),
  ),
});

const offerStack = z.object({
  title: z.string(),
  description: z.string(),
  services: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    }),
  ),
});

export const collections = {
  // English
  "en/hero": defineCollection({ type: "content", schema: heroSchema }),
  "en/about": defineCollection({ type: "content", schema: aboutSchema }),
  "en/experience": defineCollection({ type: "data", schema: experienceSchema }),
  "en/projects": defineCollection({ type: "data", schema: projectsSchema }),

  "en/offer/hero": defineCollection({
    type: "content",
    schema: heroSchema,
  }),
  "en/offer/services": defineCollection({
    type: "data",
    schema: offerServices,
  }),
  "en/offer/stack": defineCollection({
    type: "data",
    schema: offerStack,
  }),
  "en/offer/process": defineCollection({
    type: "data",
    schema: offerStack,
  }),

  // Polish
  "pl/hero": defineCollection({ type: "content", schema: heroSchema }),
  "pl/about": defineCollection({ type: "content", schema: aboutSchema }),
  "pl/experience": defineCollection({ type: "data", schema: experienceSchema }),
  "pl/projects": defineCollection({ type: "data", schema: projectsSchema }),

  "pl/offer/hero": defineCollection({
    type: "content",
    schema: heroSchema,
  }),
  "pl/offer/services": defineCollection({
    type: "data",
    schema: offerServices,
  }),
  "pl/offer/stack": defineCollection({
    type: "data",
    schema: offerStack,
  }),
  "pl/offer/process": defineCollection({
    type: "data",
    schema: offerStack,
  }),
};
