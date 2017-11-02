import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Provider import
import { Database } from '../../providers/database';
import { Appsettings } from '../../providers/appsettings';

// Model import
import { Entry } from '../../models/Entry';
import { Settings } from '../../models/Settings/Settings';

// Page import
import { EntryDetailsPage } from '../entry-details/entry-details';

/*
Generated class for the Home page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public selectionOfEntries: Array<Entry>;
    public selectedDataset: string;
    public entries: Array<Entry>;
    public search: string;

    public constructor(private navController: NavController, private database: Database, private appsettings: Appsettings) {
        this.selectionOfEntries = [];
        this.entries = [];
        this.selectedDataset = "..."
        this.search = "";
    }

    ionViewDidLoad() {
        this.database.openSQLiteDatabase().then(() => {
            this.loadDictionary();
        });

        this.appsettings.openSQLiteDatabase().then(() => {
            this.appsettings.getSettings().then((result) => {
                let settings = <Settings> result;
                this.selectedDataset = settings.selected_dataset;
                console.log(settings.app_language + "")
            });
        });
        console.log('Hello Home Page');
    }

    ionViewWillEnter() {
        this.appsettings.openSQLiteDatabase().then(() => {
            this.appsettings.getSettings().then((result) => {
                let settings = <Settings> result;
                this.selectedDataset = settings.selected_dataset;
                console.log("SELECTED DATASET: " + this.selectedDataset);
                this.loadDictionary();
            });
        });
    }

    public goToEntryDetailsPage(event: any, entry: Entry) {
        this.navController.push(EntryDetailsPage, {
            entry: entry
        });
    }

    public loadDictionary() {
        this.database.getPrimaryEntries().then((result) => {
            this.entries = <Array<Entry>> result;
            this.selectionOfEntries = this.entries;
        }, (error) => {
            console.log("ERROR: home.ts loadDictionary() " + error);
        });
    }

    public onSearchInput(event: any) {
        if(this.search != null || this.search != "")
            this.selectionOfEntries = this.entries.filter(
                entry => entry.base_lang.includes(this.search) === true || entry.translation.includes(this.search)
            );
    }

    public onSearchCancel(event: any) {
        this.search = "";
    }
}
