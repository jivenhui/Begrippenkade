import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Provider import
import { Appsettings } from '../../providers/appsettings';

// Model import
import { DatasetInfo } from '../../models/Dataset/DatasetInfo';

// Page import
import { QuizTestPage } from '../quiz-test/quiz-test';

/*
  Generated class for the QuizTestSelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-quiz-test-select',
  templateUrl: 'quiz-test-select.html'
})
export class QuizTestSelectPage {
  public availableLists: DatasetInfo[];

  constructor(public navCtrl: NavController, private appsettings: Appsettings) {}

  ionViewDidLoad() {
    this.appsettings.openSQLiteDatabase().then(() => {
      this.appsettings.getInfoAvailableLists().then((result) => {
        this.availableLists = <Array<DatasetInfo>> result;
      }, (error) => {
        console.log("ERROR fetching available lists");
      });
    }, (error) => {
      console.log("ERROR opening database");
    });
    console.log('Hello QuizTestSelect Page');
  }

  public startQuiz(event: any, list: DatasetInfo) {
    this.navCtrl.push(QuizTestPage, {
      list: list
    });
  }

}
