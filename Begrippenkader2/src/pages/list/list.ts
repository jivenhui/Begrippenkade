import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Provider import
import { Appsettings } from '../../providers/appsettings';

// Model import
import { DatasetInfo } from '../../models/Dataset/DatasetInfo';

// Page import
import { ListDetailPage } from '../list-detail/list-detail';

/*
  Generated class for the List page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public lists: DatasetInfo[];

  constructor(public navCtrl: NavController, private appsettings: Appsettings) {}

  ionViewDidLoad() {
    this.appsettings.openSQLiteDatabase().then(() => {
      this.loadAvailableLists();
    });
    console.log('Hello List Page');
  }

  public goToListDetailPage(event: any, listInfo: DatasetInfo) {
    this.navCtrl.push(ListDetailPage, {
      listInfo: listInfo
    });
  }

  private loadAvailableLists() {
    this.appsettings.getInfoAvailableLists().then((result) => {
      this.lists = <Array<DatasetInfo>> result;
    }, (error) => {
      console.log("ERROR: list.ts loadAvailableLists " + error);
    });
  }
}
