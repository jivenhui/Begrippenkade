import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Provider import
import { Appsettings } from '../../providers/appsettings';

// Model import
import { DatasetInfo } from '../../models/Dataset/DatasetInfo';
import { Settings } from '../../models/Settings/Settings';

// Page import
import { LanguageSetDetailPage } from '../language-set-detail/language-set-detail';
import { LanguageSetAddPage } from '../language-set-add/language-set-add';

/*
  Generated class for the LanguageSet page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-language-set',
    templateUrl: 'language-set.html'
})
export class LanguageSetPage {
    public availableDatasets: any[] = [];
    public selectedDataset: string;

    constructor(public navController: NavController, private appsettings: Appsettings) {}

    ionViewDidLoad() {
        this.appsettings.openSQLiteDatabase().then(() => {
            this.loadAvailableDatasets();
            this.getSelectedDataset();
        });
        console.log('Hello LanguageSet Page');
    }

    ionViewWillEnter() {
        this.appsettings.openSQLiteDatabase().then(() => {
            this.loadAvailableDatasets();
            this.getSelectedDataset();
            console.log("Entered LanguageSetPage")
        });
    }

    public goToDatasetDetailsPage(event: any, datasetInfoToPass: DatasetInfo) {
        this.navController.push(LanguageSetDetailPage, {
            datasetInfo: datasetInfoToPass,
            isSelected: (this.selectedDataset == ("dict_" + datasetInfoToPass.name + "_v" + datasetInfoToPass.version)) ? true : false
        });
    }

    public addDataset(event: any) {
        this.navController.push(LanguageSetAddPage, {});
    }

    private getSelectedDataset() {
        let settings: Settings;
        this.appsettings.getSettings().then((result) => {
            settings = <Settings> result;
            this.selectedDataset = settings.selected_dataset;
        }, (error) => {
            console.log("ERROR: language-set.ts getSelectedDataset " + error);
        });
    }

    private loadAvailableDatasets() {
        console.log("Loading available datasets");
        this.appsettings.getInfoAvailableDatasets().then((result) => {
            this.availableDatasets = [];
            this.availableDatasets = <Array<DatasetInfo>> result;
            for(let set of this.availableDatasets) {
                console.log(set.name);
            }
        }, (error) => {
            console.log("ERROR: language-set.ts loadAvailableDatasets " + error);
        });
    }

}
