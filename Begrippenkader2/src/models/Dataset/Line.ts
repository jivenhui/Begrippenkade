//Model import
import { Word } from './Word';

export class Line {
    letter: number;
    notes: string;
    skilllvl: string;
    label: string;
    source_Type: string;
    target_type: string;
    words: Array<Word>;

    constructor(letter: number, notes: string, skilllvl: string, label: string, source_Type: string, target_type: string, words: Array<Word>) {
        this.letter = letter;
        this.notes = notes;
        this.skilllvl = skilllvl;
        this.label = label;
        this.source_Type = source_Type;
        this.target_type = target_type;
        this.words = words;
    }
}