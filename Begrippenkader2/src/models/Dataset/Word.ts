export class Word{
    number: number;
    source_text: string;
    target_text: string;


    constructor(number: number, source_text: string, target_text: string) {
        this.number = number;
        this.source_text = source_text;
        this.target_text = target_text;
    }
}