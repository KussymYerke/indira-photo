import { defineField, defineType } from "sanity";

export default defineType({
  name: "featuredSection",
  title: "Избранные работы (секция)",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Надзаголовок",
      type: "string",
      initialValue: "актуальные",
    }),
    defineField({
      name: "title",
      title: "Заголовок",
      type: "string",
      initialValue: "Избранные проекты",
    }),
    defineField({
      name: "works",
      title: "Работы (до 3)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "work" }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Избранные работы" };
    },
  },
});
