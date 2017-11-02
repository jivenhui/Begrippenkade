export class Entry {
  group_id: number;
  sub_id: number;
  base_lang: string;
  translation: string;

  constructor(group_id: number, sub_id: number, base_lang: string, translation: string) {
    this.group_id = group_id;
    this.sub_id = sub_id;
    this.base_lang = base_lang;
    this.translation = translation;
  }
}
