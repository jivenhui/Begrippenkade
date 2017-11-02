import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// Provider import
import { Database } from '../../providers/database';

// Model import
import { QuizResult } from '../../models/Quiz/QuizResult';

/*
  Generated class for the QuizResults page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-quiz-results',
  templateUrl: 'quiz-results.html'
})
export class QuizResultsPage {
  public quizResults: QuizResult[];

  constructor(public navCtrl: NavController, private database: Database) {
    this.quizResults = [];
  }

  ionViewDidLoad() {
    this.database.openSQLiteDatabase().then(() => {
      this.database.getQuizResults().then((result) => {
        this.quizResults = <Array<QuizResult>> result;
      });
    }, (error) => {
      console.log("ERROR opening database");
    })
    console.log('Hello QuizResults Page');
  }

}
