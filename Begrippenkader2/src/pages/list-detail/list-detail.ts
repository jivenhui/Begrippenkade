import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Provider import
import { Database } from '../../providers/database';

// Model import
import { DatasetInfo } from '../../models/Dataset/DatasetInfo';
import { ListEntry } from '../../models/ListEntry';

/*
Generated class for the ListDetail page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html'
})
export class ListDetailPage {
  public listInfo: DatasetInfo;
  entries: ListEntry[];

  constructor(public navCtrl: NavController, private database: Database, private navParams: NavParams) {
    this.listInfo = navParams.get('listInfo');
  }

  ionViewDidLoad() {
    this.database.openSQLiteDatabase().then(() => {
      this.loadListEntries();
    });
    console.log('Hello ListDetail Page');
  }

  public deleteListItem(id: number) {
    console.log("FIRSTID: " + id);
    this.database.deleteListEntryById(this.listInfo.id, id).then(() => {
      this.loadListEntries();
      console.log("Item deleted from list");
    });
  }

  private loadListEntries() {
    this.database.getListEntriesByListId(this.listInfo.id).then((result) => {
      this.entries = <Array<ListEntry>> result;
    }, (error) => {
      console.log("ERROR: list-details.ts loadListEntries " + error);
    });
  }
}
