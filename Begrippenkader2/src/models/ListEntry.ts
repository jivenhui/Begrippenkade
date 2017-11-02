export class ListEntry {
  id: number;
  base_lang: string;
  translation: string;

  constructor(id: number|null, base_lang: string, translation: string) {
    this.id = id;
    this.base_lang = base_lang;
    this.translation = translation;
  }
}
