import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero (Главный экран)",
  type: "document",
  fields: [
    defineField({
      name: "slides",
      title: "Слайды",
      type: "array",
      of: [
        {
          type: "object",
          name: "heroSlide",
          title: "Слайд",
          fields: [
            defineField({
              name: "image",
              title: "Фон (изображение)",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "eyebrow",
              title: "Надзаголовок",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Заголовок",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Подзаголовок",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "primaryCta",
              title: "Основная кнопка",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Текст", type: "string" }),
                defineField({ name: "href", title: "Ссылка", type: "string" }),
              ],
            }),
            defineField({
              name: "secondaryCta",
              title: "Вторая кнопка",
              type: "object",
              fields: [
                defineField({ name: "label", title: "Текст", type: "string" }),
                defineField({ name: "href", title: "Ссылка", type: "string" }),
              ],
            }),
            defineField({
              name: "footerLeftLabel",
              title: "Подпись слева (внизу)",
              type: "string",
            }),
            defineField({
              name: "footerProject",
              title: "Проект / подпись (внизу)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title", media: "image" },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hero" };
    },
  },
});
