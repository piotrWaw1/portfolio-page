import { config, fields, singleton } from "@keystatic/core";

const heroSchema = {
  badge: fields.text({ label: "Badge Text" }),
  heading: fields.mdx.inline({ label: "Main Heading" }),
  subheading: fields.text({ label: "Subheading" }),
  ctaText: fields.text({ label: "Button Text" }),
  content: fields.mdx({ label: "Description", options: { image: false } }),
};

const aboutSchema = {
  title: fields.text({ label: "Title", defaultValue: "About Me" }),
  skillsTitle: fields.text({ label: "Skills title" }),
  skills: fields.array(
    fields.object({
      title: fields.text({ label: "Title" }),
      color: fields.text({ label: "Color" }),
    }),
    { label: "Skills" },
  ),
  content: fields.mdx({ label: "Description", options: { image: false } }),
};

const experienceSchema = {
  title: fields.text({ label: "Title", defaultValue: "Experience" }),
  jobs: fields.array(
    fields.object({
      period: fields.text({ label: "Period" }),
      title: fields.text({ label: "Title" }),
      company: fields.text({ label: "Company" }),
      url: fields.text({ label: "URL" }),
      description: fields.text({ label: "Description" }),
      tags: fields.array(fields.text({ label: "Tags" }), {
        label: "Technologies",
      }),
    }),
    { label: "Work History" },
  ),
};

const projectsSchema = {
  title: fields.text({ label: "Title", defaultValue: "Project" }),
  mainProjects: fields.array(
    fields.object({
      title: fields.text({ label: "Title" }),
      subtitle: fields.text({ label: "Subtitle" }),
      description: fields.text({ label: "Description" }),
      githubUrl: fields.text({ label: "Github Url" }),
      projectUrl: fields.text({ label: "Project Url" }),
      accentFrom: fields.text({ label: "Accent From" }),
      accentTo: fields.text({ label: "Accent To" }),
      borderColor: fields.text({ label: "Border Color" }),
      glowClass: fields.text({ label: "Glow class" }),
      subTitleColor: fields.text({ label: "Subtitle Color" }),
      technologies: fields.array(fields.text({ label: "Tags" }), {
        label: "Technologies",
      }),
    }),
    { label: "Main projects" },
  ),
  otherProjects: fields.array(
    fields.object({
      title: fields.text({ label: "Title" }),
      description: fields.text({ label: "Description" }),
      githubUrl: fields.text({ label: "Github Url" }),
      projectUrl: fields.text({ label: "Project Url" }),
      folderColor: fields.text({ label: "Folder Color" }),
      hover: fields.text({ label: "Hover" }),
      borderHoverColor: fields.text({ label: "Border Hover Color" }),
      technologies: fields.array(fields.text({ label: "Tags" }), {
        label: "Technologies",
      }),
    }),
  ),
};

const offerServices = {
  title: fields.text({ label: "Title", defaultValue: "What We Build" }),
  description: fields.text({ label: "Description" }),
  services: fields.array(
    fields.object({
      title: fields.text({ label: "Title" }),
      description: fields.text({ label: "Description" }),
      keyWords: fields.array(fields.text({ label: "Key words" }), {
        label: "Key words",
      }),
    }),
    { label: "Services" },
  ),
};

export default config({
  storage: { kind: "local" },
  singletons: {
    // --- ENGLISH ---
    hero_en: singleton({
      label: "🇬🇧 Hero Section",
      path: "src/content/en/hero/hero",
      format: { contentField: "content" },
      schema: heroSchema,
    }),
    about_en: singleton({
      label: "🇬🇧 About",
      path: "src/content/en/about/about",
      format: { data: "yaml", contentField: "content" },
      schema: aboutSchema,
    }),
    experience_en: singleton({
      label: "🇬🇧 Experience",
      path: "src/content/en/experience/experience",
      schema: experienceSchema,
    }),
    projects_en: singleton({
      label: "🇬🇧 Projects",
      path: "src/content/en/projects/projects",
      schema: projectsSchema,
    }),

    offer_hero_en: singleton({
      label: "🇬🇧 Offer Hero Section",
      path: "src/content/en/offer/hero/hero",
      format: { contentField: "content" },
      schema: heroSchema,
    }),
    offer_services_en: singleton({
      label: "🇬🇧 Offer Services Section",
      path: "src/content/en/offer/services/services",
      schema: offerServices,
    }),
    // --- POLISH ---
    hero_pl: singleton({
      label: "🇵🇱 Hero Section",
      path: "src/content/pl/hero/hero",
      format: { contentField: "content" },
      schema: heroSchema,
    }),
    about_pl: singleton({
      label: "🇵🇱 About",
      path: "src/content/pl/about/about",
      format: { data: "yaml", contentField: "content" },
      schema: aboutSchema,
    }),
    experience_pl: singleton({
      label: "🇵🇱 Experience",
      path: "src/content/pl/experience/experience",
      schema: experienceSchema,
    }),
    projects_pl: singleton({
      label: "🇵🇱 Projects",
      path: "src/content/pl/projects/projects",
      schema: projectsSchema,
    }),
    offer_hero_pl: singleton({
      label: "🇵🇱 Offer Hero Section",
      path: "src/content/pl/offer/hero/hero",
      format: { contentField: "content" },
      schema: heroSchema,
    }),
    offer_services_pl: singleton({
      label: "🇵🇱 Offer Services Section",
      path: "src/content/pl/offer/services/services",
      schema: offerServices,
    }),
  },
});
