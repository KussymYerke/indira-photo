import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Настройки сайта')
        .child(
          S.editor()
            .id('settings')
            .schemaType('settings')
            .documentId('settings')
        ),
      S.listItem()
        .title('Hero (Главный экран)')
        .child(
          S.editor()
            .id('hero')
            .schemaType('hero')
            .documentId('hero')
        ),
      S.listItem()
        .title('Избранные работы')
        .child(
          S.editor()
            .id('featuredSection')
            .schemaType('featuredSection')
            .documentId('featuredSection')
        ),
      S.divider(),
      S.documentTypeListItem('work').title('Работы'),
    ])
