import {Component} from '@angular/core';
import {App, List, NavController} from 'ionic-angular';

// Provider import
import {Appsettings} from '../../providers/appsettings';

// Model import
import {Settings} from '../../models/Settings/Settings';
import {DatasetInfo} from '../../models/Dataset/DatasetInfo';
import {AppLanguage} from "../../models/Settings/AppLanguage";
import {Color} from "../../models/Settings/Color";

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    public settings: Settings;
    languages: Array<AppLanguage>;
    colors: Array<Color>;

    constructor(public navController: NavController, private appsettings: Appsettings) {
        this.languages = new Array<AppLanguage>();
        this.colors = new Array<Color>();
        this.settings = new Settings("DATASETTEST", "male", "normal", "normal", 1.5, 1.5, false, false, false);
    }

    ionViewDidLoad() {
        this.appsettings.openSQLiteDatabase().then(() => {
            this.loadSettings();
            this.testData();
            ;
        });
        console.log('Hello Settings Page');
        console.log(this.settings.app_language);
        console.log(this.settings.selected_dataset)
    }

    private loadSettings() {
        this.appsettings.getSettings().then((result) => {
            this.settings = <Settings> result;

        }, (error) => {
            console.log("ERROR: settings.ts loadSettings() " + error);
        });
    }

    testitem(){
        console.log(this.settings.selected_dataset);
        console.log(this.settings.app_color);
    }

    saveSettings(){
        this.appsettings.openSQLiteDatabase().then(() => {

            this.appsettings.saveSettings(this.settings).then(() => {
                console.log("SETTINGS: Succesfully saved the settings");

            }, (error) => {
                console.log("SETTINGS: Couldn't save the settings. Error was: " + error.message);
            });

        },(error) => {
            console.log("SETTINGS: Couldn't open database from SettingData. Error was: " + error.message);
        })
    }

    private testData() {
        let langaue1 = new AppLanguage(1, 'NL', 'Nederland');
        let language2 = new AppLanguage(2, 'BE', 'Belgium');
        let language3 = new AppLanguage(3, 'FR', 'France');
        this.languages.push(langaue1, language2, language3);

        let color1 = new Color(1, "Defensie algemeen", "#e17000", "#fff");
        let color2 = new Color(1, "Landmacht", "#e17000", "#fff");
        let color3 = new Color(1, "Luchtmacht", "#e17000", "#fff");
        this.colors.push(color1, color2, color3)
    }
}
