import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

// Model import
import { DatasetInfo } from '../../models/Dataset/DatasetInfo';

// Provider import
import { Appsettings } from '../../providers/appsettings';

/*
  Generated class for the LanguageSetDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-language-set-detail',
  templateUrl: 'language-set-detail.html'
})
export class LanguageSetDetailPage {
  public datasetInfo: DatasetInfo;
  public isSelected: boolean;

  constructor(public navCtrl: NavController, private navParams: NavParams, private appsettings: Appsettings, private alertController: AlertController) {
    this.datasetInfo = navParams.get('datasetInfo');
    this.isSelected = navParams.get('isSelected');
    console.log("SELECTED: " + this.isSelected);
  }

  ionViewDidLoad() {
    console.log('Hello LanguageSetDetail Page');
  }

  public setLanguageSetActive() {
    let confirm = this.alertController.create({
      title: 'Taalset activeren?',
      message: 'Weet u zeker dat u deze taalset op actief wilt zetten?',
      buttons: [
        {
          text: 'Nee',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ja',
          handler: () => {
            console.log('Agree clicked');
            console.log("DB: " + `dict_${this.datasetInfo.name}_v${this.datasetInfo.version}`);
            this.appsettings.setSelectedLanguageSet(`dict_${this.datasetInfo.name}_v${this.datasetInfo.version}`).then(() => {
              // Do nothing
              this.navCtrl.pop();
            }, (error) => {
              console.log("ERROR: language-set-detail.ts setLanguageSetActive " + error);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  public deleteLanguageSet() {
    let dialogue = this.alertController.create({
      title: 'Taalset Verwijderen?',
      message: 'Weet u zeker dat u deze taalset wilt verwijderen?',
      buttons: [
        {
          text: 'Nee',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ja',
          handler: () => {
            console.log('Agree clicked');
            this.appsettings.deleteLanguageSet(this.datasetInfo).then(() => {
              // Do nothing
            }, (error) => {
              console.log("ERROR: language-set-detail.ts deleteLanguageSet " + error);
            });
            this.navCtrl.pop();
          }
        }
      ]
    });
    dialogue.present();
  }
}
