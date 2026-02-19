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
      format: {
        data: "yaml",
        contentField: "content",
      },
      schema: {
        title: fields.text({ label: "Title", defaultValue: "About Me" }),
        skillsTitle: fields.text({ label: "Skills title" }),
        skills: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            color: fields.text({ label: "Color" }),
          }),
          { label: "Skills" },
        ),
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
    projects: singleton({
      label: "Projects",
      path: "src/content/projects/projects",
      schema: {
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
      },
    }),
  },
});
