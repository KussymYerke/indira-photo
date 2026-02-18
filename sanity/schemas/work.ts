import { defineType, defineField } from "sanity";

export default defineType({
  name: "work",
  title: "Работа",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Название",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (ссылка)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Категория",
      type: "string",
      options: {
        list: [
          { title: "Дизайнерские съемки", value: "designer" },
          { title: "Коммерческие съемки", value: "commercial" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
        defineField({
      name: "featured",
      title: "Избранная работа (показывать в секции «Избранные»)",
      type: "boolean",
      initialValue: false,
    }),
defineField({ name: "excerpt", title: "Краткий текст", type: "text" }),
    defineField({
      name: "cover",
      title: "Обложка",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "Фото (галерея)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
