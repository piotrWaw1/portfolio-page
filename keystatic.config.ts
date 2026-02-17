import { config, fields, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  singletons: {
    hero: singleton({
      label: "Hero Section",
      path: "src/content/hero/hero",
      format: { contentField: "content" },
      schema: {
        badge: fields.text({ label: "Badge Text" }),

        heading: fields.text({ label: "Main Heading" }),

        subheading: fields.text({ label: "Subheading" }),

        ctaText: fields.text({ label: "Button Text" }),

        content: fields.mdx({
          label: "Description",
          options: {
            image: false,
          },
        }),
      },
    }),
    about: singleton({
      label: "About",
      path: "src/content/about/about",
      schema: {
        title: fields.text({ label: "Title" }),
        description: fields.text({ label: "Description1" }),
        skillsTitle: fields.text({ label: "Skills" }),

        content: fields.mdx({
          label: "Description2",
          options: {
            image: false,
          },
        }),
      },
    }),
    experience: singleton({
      label: "Experience",
      path: "src/content/experience/experience",
      schema: {
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
      },
    }),
  },
});
