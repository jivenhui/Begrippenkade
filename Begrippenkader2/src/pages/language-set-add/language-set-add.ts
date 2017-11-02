import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Model import
import { DatasetInfo } from '../../models/Dataset/DatasetInfo';
import { Entry } from '../../models/Entry';

// Provider import
import { UpdateProvider } from '../../providers/update-provider';
import { Database } from '../../providers/database';

/*
  Generated class for the LanguageSetAdd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-language-set-add',
  templateUrl: 'language-set-add.html'
})
export class LanguageSetAddPage {
  public availableDatasets: DatasetInfo[];

  constructor(public navCtrl: NavController, private updateProvider: UpdateProvider, private database: Database) {
    this.availableDatasets = [];
    this.updateProvider.checkForUpdates().then((data) => {
      console.log("SETTINGS: Retrieved updates");
this.testaddManifest();
      this.availableDatasets = <Array<DatasetInfo>> data;
    })
  }

  ionViewDidLoad() {
    console.log('Hello LanguageSetAdd Page');
  }

  public addDataset($event, dataset: DatasetInfo) {
    this.updateProvider.downloadDataset(dataset.fileName).then((data) => {
      this.database.addNewDataset(dataset.name, dataset.version, dataset.description, dataset.publisher).then(() => {
        this.database.addEntriesToDataset(dataset, <Array<Entry>> data).then(() => {
          console.log("SUCCES!")
        });
      });
    });
  }

    public testaddDataset() {
        this.updateProvider.testdownloadDataset().then(() => {

        });
    }

    public testaddManifest() {
        this.updateProvider.testdownloadManifest().then(() => {

        });
    }
}
