import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite';

// Model import
import {Settings} from '../models/Settings/Settings';
import {DatasetInfo} from '../models/Dataset/DatasetInfo';

@Injectable()
export class Appsettings {
    private isOpen: boolean;
    public db: SQLiteObject;

    constructor(private platform: Platform, public sqlite: SQLite) {
        this.sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
            if (this.isOpen !== true) {
                this.db = db;
                // DROP is for testing only
                this.db.executeSql("DROP TABLE IF EXISTS appsettings", []);
                this.db.executeSql("CREATE TABLE IF NOT EXISTS appsettings (id INTEGER, selected_dataset TEXT, app_color TEXT, app_language TEXT, speech_gender TEXT, speech_rate DECIMAL(2,2),speech_pitch DECIMAL(2,2), automatic_update INTEGER,mobileData INTEGER,first_use INTEGER, PRIMARY KEY(`id`))", []);
                // Insert data for testing only
                this.insertTestData();
            }
        });
        console.log('Hello Appsettings Provider');
    }

    public openSQLiteDatabase() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.sqlite.create({name: "data.db", location: "default"}).then(() => {
                    this.isOpen = true;
                    resolve(this.isOpen);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public getSettings() {
        let query = `SELECT * FROM appsettings WHERE id = 1`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, []).then((data) => {
                    let settings: Settings;
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            settings = new Settings(
                                data.rows.item(i).selected_dataset,
                                data.rows.item(i).app_color,
                                data.rows.item(i).app_language,
                                data.rows.item(i).speech_gender,
                                data.rows.item(i).speech_rate,
                                data.rows.item(i).speech_pitch,
                                !!+data.rows.item(i).automatic_update,
                                !!+data.rows.item(i).mobileData,
                                !!+data.rows.item(i).first_use
                            );
                            console.log("settings loaded : " + data.rows.item(i).app_language,)
                        }
                    }
                    resolve(settings);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public getInfoAvailableDatasets() {
        let query = `SELECT * FROM available_datasets`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, []).then((data) => {
                    let datasets = [];
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            let datasetInfo: DatasetInfo = new DatasetInfo(
                                data.rows.item(i).id,
                                data.rows.item(i).name,
                                data.rows.item(i).version,
                                data.rows.item(i).description,
                                data.rows.item(i).publisher
                            );
                            datasets.push(datasetInfo);
                        }
                    }
                    resolve(datasets);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public getInfoAvailableLists() {
        let query = `SELECT * FROM lists`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, []).then((data) => {
                    let lists = [];
                    if (data.rows.length > 0) {
                        for (let i = 0; i < data.rows.length; i++) {
                            let listInfo: DatasetInfo = new DatasetInfo(
                                data.rows.item(i).id,
                                data.rows.item(i).name,
                                data.rows.item(i).version,
                                data.rows.item(i).description,
                                data.rows.item(i).publisher
                            );
                            lists.push(listInfo);
                        }
                    }
                    resolve(lists);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public saveSettings(settings: Settings) {
        let query = `UPDATE appsettings
    SET selected_dataset = ?,
    app_color = ?,
    app_language = ?,
    speech_gender = ?,
    speech_rate = ?,
    speech_pitch = ?,
    automatic_update = ?,
    mobileData = ?,
    first_use = ?
    WHERE id = 1`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, [settings.selected_dataset, settings.app_color, settings.app_language, settings.speech_gender, settings.speech_rate, settings.speech_pitch, (settings.automatic_update) ? 1 : 0, (settings.mobileData) ? 1 : 0, (settings.first_use) ? 1 : 0]).then((data) => {
                    console.log("SETTINGS SAVED");
                    this.vacuum();
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public setSelectedLanguageSet(languageSet: string) {
        let query = `UPDATE appsettings
    SET selected_dataset = '${languageSet}' WHERE id = 1`;

        console.log(query);

        return new Promise((reject, resolve) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, []).then(() => {
                    console.log("SETTINGS SAVED");
                    resolve();
                }, (error) => {
                    console.log("ERROR IN PROVIDER!")
                    reject(error);
                });
            });
        });
    }

    public deleteLanguageSet(languageSet: DatasetInfo) {
        console.log("NAME: " + languageSet.name);
        let query_1 = `DROP TABLE dict_${languageSet.name.toUpperCase()}_v${languageSet.version}`;
        let query_2 = `DELETE FROM available_datasets WHERE name = '${languageSet.name}'`;
        console.log("QUERY: " + query_2);

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query_1, []).then(() => {
                    this.db.executeSql(query_2, []).then(() => {
                        resolve()
                    }, (error) => {
                        console.log("ERROR REMOVING DATASET ENTRY");
                    });
                }, (error) => {
                    console.log("ERROR REMOVING DATASET TABLE");
                });
            });
        });
    }

    private insertTestData() {
        this.platform.ready().then(() => {

            this.db.sqlBatch([
                ['INSERT INTO appsettings VALUES (?,?,?,?,?,?,?,?,?,?)', [1, "dict_TEST_v1", "Defensie algemeen", "NL", "female", 0.75, 0.75, 1, 1, 1]],
            ]).then((data) => {
                console.log("Test data succes");
            }, (error) => {
                console.log("Test data failed");
            });

        });
    }

    public databaseIsOpen() {
        return this.isOpen;
    }

    private vacuum() {
        let query = `VACUUM`;

        this.platform.ready().then(() => {
            this.db.executeSql(query, []).then((data) => {
                console.log("SQL VACUUM SUCCES");
            }, (error) => {
                console.log("SQL VACUUM ERROR")
            });
        });
    }

}
