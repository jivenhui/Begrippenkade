export class Settings {
    selected_dataset: string;
    app_color: string;
    app_language: string;
    speech_gender: string;
    speech_rate: number;
    speech_pitch: number;
    automatic_update: boolean;
    mobileData: boolean;
    first_use: boolean;


    constructor(selected_dataset: string, app_color: string, app_language: string, speech_gender: string, speech_rate: number, speech_pitch: number, automatic_update: boolean, mobileData: boolean, first_use: boolean) {
        this.selected_dataset = selected_dataset;
        this.app_color = app_color;
        this.app_language = app_language;
        this.speech_gender = speech_gender;
        this.speech_rate = speech_rate;
        this.speech_pitch = speech_pitch;
        this.automatic_update = automatic_update;
        this.mobileData = mobileData;
        this.first_use = first_use;
    }
}
