import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// Provider import
import { Database } from '../../providers/database';

// Model import
import { QuizInput } from '../../models/Quiz/QuizInput';
import { DatasetInfo } from '../../models/Dataset/DatasetInfo';
import { ListEntry } from '../../models/ListEntry';

/*
Generated class for the QuizTestResult page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-quiz-test-result',
  templateUrl: 'quiz-test-result.html'
})
export class QuizTestResultPage {
  public userInputList: QuizInput[];
  public totalNumberOfQuestions: number;
  public numberOfQuestionsCorrect: number;
  public listInfo: DatasetInfo;

  // Pie chart
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartColors: any[];
  public pieChartType: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, private database: Database) {
    this.userInputList = this.navParams.get('userInputList');
    this.totalNumberOfQuestions = this.userInputList.length;
    this.listInfo = this.navParams.get('listInfo');

    this.numberOfQuestionsCorrect = this.userInputList.filter(
      entry => entry.expectedTranslation === entry.receivedTranslation
    ).length;

    this.pieChartLabels = ['Goed', 'Fout'];
    this.pieChartData  = [this.numberOfQuestionsCorrect, this.totalNumberOfQuestions - this.numberOfQuestionsCorrect];
    this.pieChartColors = [{ backgroundColor: ['#98cca3', '#f16666'] }];
    this.pieChartType = 'pie';
  }

  ionViewDidLoad() {
    console.log('Hello QuizTestResult Page');
  }

  public saveWrongAnswersToList() {
    this.database.openSQLiteDatabase().then(() => {
      this.database.createNewList(`Test: ${this.listInfo.name}`).then((result) => {
        let listEntries: ListEntry[] = [];

        for(let userEntry of this.userInputList) {
          if(userEntry.expectedTranslation != userEntry.receivedTranslation) {
              listEntries.push(new ListEntry(null, userEntry.listEntry, userEntry.expectedTranslation));
          }
        }

        this.database.insertMultipleEntriesIntoList(<number>result, listEntries).then(() => {
          console.log("Added all entries to list.")
        }, (error) => {
          console.log("ERROR ON BATCH");
        });
      }, (error) => {
        console.log("ERROR quiz-test-result.ts:saveWrongAnswersToList")
      });
    }, (error) => {
      console.log("ERROR quiz-test-result.ts:saveWrongAnswersToList")
    });
  }

  public saveResults() {
     this.database.saveResults(this.listInfo.name, this.numberOfQuestionsCorrect, this.totalNumberOfQuestions).then(() => {
       console.log("Results saved");
     }, (error) => {
       console.log("Something went wrong");
     });
  }

  // events
  public chartClicked(event:any):void {
    console.log(event);
  }

  public chartHovered(event:any):void {
    console.log(event);
  }
}
