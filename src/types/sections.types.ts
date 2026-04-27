import type { CollectionEntry } from "astro:content";

export type HeroEntry = CollectionEntry<"en/hero"> | CollectionEntry<"pl/hero">;

export type AboutEntry =
  | CollectionEntry<"en/about">
  | CollectionEntry<"pl/about">;

export type ExperienceEntry =
  | CollectionEntry<"en/experience">
  | CollectionEntry<"pl/experience">;

export type ProjectsEntry =
  | CollectionEntry<"en/projects">
  | CollectionEntry<"pl/projects">;

export type OfferServicesEntry =
  | CollectionEntry<"en/offer/services">
  | CollectionEntry<"pl/offer/services">;

export type OfferStackEntry =
  | CollectionEntry<"en/offer/stack">
  | CollectionEntry<"pl/offer/stack">;

export type OfferProcessEntry =
  | CollectionEntry<"en/offer/process">
  | CollectionEntry<"pl/offer/process">;
