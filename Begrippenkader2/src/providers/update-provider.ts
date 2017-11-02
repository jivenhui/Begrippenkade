import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {HTTP} from '@ionic-native/http';
import 'rxjs/add/operator/map';

// Import models
import {DatasetInfo} from '../models/Dataset/DatasetInfo';
import {Entry} from '../models/Entry';
import {Line} from '../models/Dataset/Line';
import {Word} from '../models/Dataset/Word';
import {Manifest} from "../models/Dataset/Manifest/Manifest";
import {Col_name} from "../models/Dataset/Manifest/Col_name";
import {Row} from "../models/Dataset/Manifest/Row";

/*
  Generated class for the UpdateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UpdateProvider {
    private endpoint: string;
    private username: string;
    private manifestName: string;

    constructor(private platform: Platform, private http: HTTP) {
        this.manifestName = "manifest.json";
        this.username = "tcd-terminologie";
        this.endpoint = "https://raw.githubusercontent.com/" + this.username + "/datarepo/master/begrippenkaders/";
        console.log('Hello UpdateProvider Provider');
    }

    public checkForUpdates() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                let datasets = [];
                let myData;

                this.http.get(this.endpoint + this.manifestName, {}, {}).then((data) => {
                    myData = JSON.parse(data.data);

                    for (let i = 0; i < myData.manifest.length; i++) {
                        let currentDataset = new DatasetInfo(
                            +myData.manifest[i].id,
                            myData.manifest[i].name,
                            +myData.manifest[i].version,
                            myData.manifest[i].description,
                            myData.manifest[i].publisher,
                        );

                        currentDataset.addFileName(myData.manifest[i].file_name);

                        datasets.push(currentDataset);
                    }

                    resolve(datasets);
                }, (error) => {
                    console.log("UPDATE-SERVICE: Couldn't find url. Error was: " + error.message);
                })

            }, (error) => {
                reject("UPDATE-SERVICE: Couldn't download file. Error was: " + error.toString());
            });
        });
    }

    public downloadDataset(datasetFileName: string) {
        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                let myData;
                let entries = [];

                console.log("URL: " + this.endpoint + datasetFileName);

                this.http.get(this.endpoint + "language-set/" + datasetFileName, {}, {}).then((data) => {
                    myData = JSON.parse(data.data);

                    for (let i = 0; i < myData.entries.length; i++) {
                        let currentEntry = new Entry(
                            +myData.entries[i].group_id,
                            +myData.entries[i].sub_id,
                            myData.entries[i].base_lang,
                            myData.entries[i].translation
                        );

                        entries.push(currentEntry);
                    }

                    resolve(entries);
                }, (error) => {
                    console.log("UPDATE-SERVICE: Couldn't find url. Error was: " + error.message);
                });
            }, (error) => {
                reject("UPDATE-SERVICE: Couldn't download file. Error was: " + error.toString());
            });
        });
    }

    public testdownloadDataset() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                let myData;
                let entries = [];
                let words = [];

                this.http.get("https://raw.githubusercontent.com/jivenhui/json/master/test.json", {}, {}).then((data) => {
                    myData = JSON.parse(data.data);
                    for (let i = 0; i < myData.entries.length; i++) {
                        for (let a = 0; a < myData.entries[i].words.length; a++) {
                            let word = new Word(
                                +myData.entries[i].words[a].number,
                                myData.entries[i].words[a].source_text,
                                myData.entries[i].words[a].target_text,
                            );
                            words.push(word)
                        }
                        let currentEntry = new Line(
                            myData.entries[i].letter,
                            myData.entries[i].notes,
                            myData.entries[i].skilllvl,
                            myData.entries[i].label,
                            myData.entries[i].source_Type,
                            myData.entries[i].target_type,
                            words
                        );

                        entries.push(currentEntry);
                        words = [];
                    }
                    for (let entry of entries) {
                        console.log("" + entry.number);
                    }


                    resolve(entries);
                }, (error) => {
                    console.log("UPDATE-SERVICE: Couldn't find url. Error was: " + error.message);
                });
            }, (error) => {
                reject("UPDATE-SERVICE: Couldn't download file. Error was: " + error.toString());
            });
        });

    }

    public testdownloadManifest() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                let myData;
                let rows = [];
                let columns = [];

                this.http.get("https://raw.githubusercontent.com/jivenhui/json/master/manifest.json", {}, {}).then((data) => {
                    myData = JSON.parse(data.data);
                    for (let i = 0; i < myData.col_name_lst.length; i++) {
                        let column = new Col_name(
                            myData.col_name_lst[i],
                        );
                        columns.push(column)
                    }

                    for (let column of columns) {
                        console.log("" + column.col_name);
                    }
                    for (let i = 0; i < myData.row_lst.length; i++) {
                        debugger;
                            let row = new Row(
                                myData.row_lst[i][0],
                                myData.row_lst[i][1],
                                myData.row_lst[i][2],
                            );

                            rows.push(row)
                    }
                    let manifest = new Manifest(myData.Manifest[1],columns,rows)

                    resolve(manifest);
                }, (error) => {
                    console.log("UPDATE-SERVICE,TESTMANIFEST: Couldn't find url. Error was: " + error.message);
                });
            }, (error) => {
                reject("UPDATE-SERVICE,TESTMANIFEST: Couldn't download file. Error was: " + error.toString());
            });
        });

    }
}
