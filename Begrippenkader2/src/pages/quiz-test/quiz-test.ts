import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Provider import
import { Database } from '../../providers/database';

// Model import
import { ListEntry } from '../../models/ListEntry';
import { DatasetInfo } from '../../models/Dataset/DatasetInfo';
import { QuizInput } from '../../models/Quiz/QuizInput';

// Page import
import { QuizTestResultPage } from '../quiz-test-result/quiz-test-result';

/*
  Generated class for the QuizTest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-quiz-test',
  templateUrl: 'quiz-test.html'
})
export class QuizTestPage {
  public list: DatasetInfo;
  public listEntries: ListEntry[];

  // Quiz entry attributes
  public currentEntry: ListEntry;
  public userEntry: string;
  public userInputList: QuizInput[];


  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Database) {
    this.list = navParams.get('list');
    this.userInputList = [];
    this.currentEntry = new ListEntry(0, "undefined", "undefined");
  }

  ionViewDidLoad() {
    this.database.openSQLiteDatabase().then(() => {
      this.database.getListEntriesByListId(this.list.id).then((result) => {
        this.listEntries = <Array<ListEntry>> result;
        this.nextQuestion();
      }, (error) => {
        console.log("ERROR retrieving list entries: quiz-test.ts")
      });
    }, (error) => {
      console.log("ERROR opening database: quiz-test.ts");
    });

    console.log('Hello QuizTest Page');
  }

  private nextQuestion() {
    if(this.listEntries.length === 0) {
      console.log("Quiz finished");
      this.navCtrl.insert(this.navCtrl.indexOf(this.navCtrl.last()), QuizTestResultPage, {
        userInputList: this.userInputList,
        listInfo: this.list
      });
      this.navCtrl.pop();
    }

    if(this.listEntries.length >= 1) {
      console.log("ENTERS IF nextQuestion");
      this.currentEntry = this.listEntries.pop();
      this.userEntry = "";
    }
  }

  public submitInput() {
    this.userInputList.push(new QuizInput(this.currentEntry.base_lang, this.currentEntry.translation, this.userEntry));
    this.nextQuestion();
  }
}
