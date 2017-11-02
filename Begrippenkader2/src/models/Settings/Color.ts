export class Color {
    id: number;
    name: string;
    main_color: string;
    text_color: String;


    constructor(id: number, name: string, main_color: string, text_color: String) {
        this.id = id;
        this.name = name;
        this.main_color = main_color;
        this.text_color = text_color;
    }
}
