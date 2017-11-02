import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

// Provider import
import { Database } from '../../providers/database';
import { Appsettings } from '../../providers/appsettings';

// Model import
import { Entry } from '../../models/Entry';
import { DatasetInfo } from '../../models/Dataset/DatasetInfo';

/*
  Generated class for the EntryDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-entry-details',
  templateUrl: 'entry-details.html'
})
export class EntryDetailsPage {
  public entries: Array<Entry>;
  public entry: Entry;

  constructor(public navController: NavController, public alertController: AlertController, private navParams: NavParams, private database: Database, private appsettings: Appsettings) {
    this.entry = navParams.get('entry');
    this.loadEntries();
  }

  public loadEntries() {
    this.database.getEntriesByGroupId(this.entry.group_id).then((result) => {
      this.entries = <Array<Entry>> result;
    }, (error) => {
      console.log("ERROR: entry-details.ts loadEntries() " + error);
    });
  }

  public addToList(base_lang: string, translation: string) {
    let alert = this.alertController.create();
    alert.setTitle('Toevoegen aan lijst');

    this.appsettings.getInfoAvailableLists().then((result) => {
      alert.addInput({
        type: 'radio',
        label: 'Nieuwe lijst aanmaken',
        value: 'newlist',
        checked: false
      });

      for(let list of <Array<DatasetInfo>> result) {
        alert.addInput({
          type: 'radio',
          label: list.name,
          value: `list_${list.id}`,
          checked: false
        });
      }

      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          if(data !== 'newlist') {
            console.log("EXISTING LIST");
            this.addEntryToList(data, base_lang, translation);
          }

          if(data === 'newlist') {
            console.log("NEW LIST");
            this.createNewList(base_lang, translation);
          }
        }
      });
      alert.present();
    }, (error) => {
      console.log("ERROR");
    });
  }

  private createNewList(base_lang: string, translation: string) {
    let prompt = this.alertController.create({
      title: 'Nieuwe lijst aanmaken',
      message: "Geef een naam op voor de nieuwe lijst",
      inputs: [
        {
          name: 'name',
          placeholder: 'naam'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            // Do nothing
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.addNewListToDatabase(data.name).then((result) => {
              this.addEntryToList(`list_${result}`, base_lang, translation);
            }, (error) => {
              console.log("ERROR in entry-details.ts createNewList");
            });
          }
        }
      ]
    });
    prompt.present();
  }

  private addEntryToList(list: string, base_lang: string, translation: string) {
    console.log("FUNCTION: addEntryToList called");
    this.database.insertEntryIntoList(list, base_lang, translation).then((result) => {
    }, (error) => {
      console.log("ERROR in entry-details.ts addEntryToList");
    });
  }

  private addNewListToDatabase(listName: string) {
    console.log("FUNCTION: addNewListToDatabase called");
    return new Promise((resolve, reject) => {
      this.database.createNewList(listName).then((result) => {
        console.log("RESPONSE:" + result);
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  ionViewDidLoad() {
    console.log('Hello EntryDetails Page');
  }

}
