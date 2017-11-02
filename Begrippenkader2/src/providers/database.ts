import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';

// Model Imports
import { Entry } from '../models/Entry';
import { ListEntry } from '../models/ListEntry';
import { Settings } from '../models/Settings/Settings';
import { QuizResult } from '../models/Quiz/QuizResult';
import { DatasetInfo } from '../models/Dataset/DatasetInfo';

// Provider import
import { Appsettings } from './appsettings';

@Injectable()
export class Database {
    private storage: SQLite;
    private isOpen: boolean;
    private selectedDataset: string;
    private db: SQLiteObject;

    constructor(private platform: Platform, private appsettings: Appsettings, public sqlite: SQLite) {
        sqlite.create({name: "data.db", location: "default"}).then((db: SQLiteObject) => {
            if(this.isOpen !== true) {
                this.db = db;
                // DROP is for testing only
                // this.storage.executeSql(  "DROP TABLE IF EXISTS dict_PSO_v1", []);
                //this.storage.executeSql(  "DROP TABLE IF EXISTS available_datasets", []);
                //this.storage.executeSql(  "DROP TABLE IF EXISTS results", []);
                this.db.executeSql(  "CREATE TABLE IF NOT EXISTS results (id INTEGER PRIMARY KEY, list_name TEXT, correct_answers INTEGER, total_questions, INTEGER, date DATE)", []);
                this.db.executeSql(  "CREATE TABLE IF NOT EXISTS available_datasets (id INTEGER PRIMARY KEY, name TEXT, version INTEGER, description TEXT, publisher TEXT)", []);
                // this.storage.executeSql(  "CREATE TABLE IF NOT EXISTS dict_PSO_v1 (group_id INTEGER, sub_id INTEGER, base_lang TEXT, translation TEXT, PRIMARY KEY (`group_id`, `sub_id`))", []);

                // Lists
                // this.storage.executeSql(  "DROP TABLE IF EXISTS lists", []);
                // this.storage.executeSql(  "DROP TABLE IF EXISTS list_1", []);
                // this.storage.executeSql(  "DROP TABLE IF EXISTS list_2", []);
                // this.storage.executeSql(  "CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY, name TEXT, version INTEGER, description TEXT, publisher TEXT)", []);
                // this.storage.executeSql(  "CREATE TABLE IF NOT EXISTS list_1 (id INTEGER PRIMARY KEY, base_lang TEXT, translation TEXT)", []);
                // this.storage.executeSql(  "CREATE TABLE IF NOT EXISTS list_2 (id INTEGER PRIMARY KEY, base_lang TEXT, translation TEXT)", []);

                // Insert test data
                // this.insertTestData();
            }
        });
        console.log('Hello Database Provider');
    }

    public openSQLiteDatabase() {
        return new Promise((resolve, reject) => {
            if(this.isOpen) {
                console.log("DB IS OPEN");
                resolve(this.isOpen);
            }

            else {
                console.log("DB IS NOT OPEN");
                this.platform.ready().then(() => {
                    this.storage.create({name: "data.db", location: "default"}).then(() => {
                        this.appsettings.openSQLiteDatabase().then(() => {
                            this.appsettings.getSettings().then((result) => {
                                let settings: Settings = <Settings> result;
                                this.selectedDataset = settings.selected_dataset;
                                this.isOpen = true;
                                resolve(this.isOpen);
                            });
                        });
                    }, (error) => {
                        reject(error);
                    });
                });
            }
        });
    }

    public setSelectedDataset() {
        return new Promise((resolve, reject) => {
            this.appsettings.openSQLiteDatabase().then(() => {
                this.appsettings.getSettings().then((result) => {
                    let settings: Settings = <Settings> result;
                    this.selectedDataset = settings.selected_dataset;
                    this.isOpen = true;
                    resolve(this.isOpen);
                });
            });
        });
    }

    public saveResults(listName: string, numberOfQuestionsCorrect: number, totalNumberOfQuestions: number) {
        let query = `INSERT INTO results (list_name, correct_answers, total_questions, date) VALUES (?,?,?,?)`;
        let date = new Date();

        console.log(date.toDateString());

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, [listName, numberOfQuestionsCorrect, totalNumberOfQuestions, date]).then(() => {
                    resolve();
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public getQuizResults() {
        let query = `SELECT * FROM results`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, []).then((data) => {
                    let quizResults: QuizResult[] = [];
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            quizResults.push(new QuizResult(data.rows.item(i).id, data.rows.item(i).list_name, data.rows.item(i).correct_answers, data.rows.item(i).total_questions, data.rows.item(i).date));
                        }
                    }
                    resolve(quizResults);
                }, (error) => {
                    reject(error);
                })
            });
        });
    }

    public getListEntriesByListId(id: number) {
        let query = `SELECT * FROM list_${id}`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, []).then((data) => {
                    let entries = [];
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            entries.push(new ListEntry(data.rows.item(i).id, data.rows.item(i).base_lang, data.rows.item(i).translation));
                        }
                    }
                    resolve(entries);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public insertEntryIntoList(list: string, base_lang: string, translation: string) {
        let query = `INSERT INTO ${list} (base_lang, translation) VALUES (?,?)`

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, [base_lang, translation]).then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public insertMultipleEntriesIntoList(listId: number, entries: ListEntry[]) {
        let query = `INSERT INTO list_${listId} (base_lang, translation) VALUES (?,?)`;
        let sqlBatch: any[] = [];

        for(let entry of entries) {
            sqlBatch.push([query, [entry.base_lang, entry.translation]]);
        }

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.sqlBatch(sqlBatch).then(() => {
                    console.log("SQL BATCH SUCCES");
                    resolve();
                }, (error) => {
                    console.log("SQL BATCH ERROR");
                    reject();
                });
            });
        });
    }

    public deleteListEntryById(listId: number, entryId: number) {
        let query = `DELETE FROM list_${listId} WHERE id = ?`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, [entryId]).then((data) => {
                    resolve(data);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public createNewList(listName: string) {
        let query_1 = `INSERT INTO lists (name, version, description, publisher)
      VALUES (?,?,?,?)`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query_1, [listName, 1, "Geen beschrijving", "Eigen"]).then(() => {
                    this.db.executeSql(`SELECT id FROM lists WHERE name = ?`,[listName]).then((data) => {
                        if(data.rows.length > 0) {
                            let listId = data.rows.item(0).id;
                            console.log("ListId value: " + listId);
                            this.db.executeSql(`DROP TABLE IF EXISTS list_${listId}`, []);
                            this.db.executeSql(`CREATE TABLE IF NOT EXISTS list_${listId} (id INTEGER PRIMARY KEY, base_lang TEXT, translation TEXT)`, [])
                            resolve(listId);
                        }
                    }, (error) => {
                        reject(error);
                    })
                }, (error) => {
                    reject(error);
                })
            });
        });
    }

    public getPrimaryEntries() {
        this.setSelectedDataset();
        console.log("SELECTED DATASET IN PROVIDER: " + this.selectedDataset);
        let query =  `SELECT * FROM ${this.selectedDataset}
    WHERE NOT EXISTS (
      SELECT *
      FROM ${this.selectedDataset} subset
      WHERE subset.group_id = ${this.selectedDataset}.group_id
      AND subset.sub_id = ${this.selectedDataset}.sub_id - 1
    )
    ORDER BY group_id`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, []).then((data) => {
                    let entries = [];
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            entries.push(new Entry(data.rows.item(i).group_id, data.rows.item(i).sub_id, data.rows.item(i).base_lang, data.rows.item(i).translation));
                        }
                    }
                    resolve(entries);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    public getEntriesByGroupId(group_id: number) {
        let query =  `SELECT * FROM ${this.selectedDataset}
    WHERE group_id = (?)`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, [group_id]).then((data) => {
                    let entries = [];
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            entries.push(new Entry(data.rows.item(i).group_id, data.rows.item(i).sub_id, data.rows.item(i).base_lang, data.rows.item(i).translation));
                        }
                    }
                    resolve(entries);
                }, (error) => {
                    reject(error);
                });
            });
        });
    }

    private insertTestData() {
        this.platform.ready().then(() => {

            this.db.sqlBatch([
                [ 'INSERT INTO available_datasets VALUES (?,?,?,?,?)', [1, "PSO", 1, "Peace Support Operations woordenboek", "CDC/NLDA/TCD"] ],

                [ 'INSERT INTO lists VALUES (?,?,?,?,?)', [2, "Tentamen Engels", 1, "Tentamenvoorbereiding Engels", "TCD"] ],
                [ 'INSERT INTO list_2 VALUES (?,?,?)', [1, "Steen", "Brick"] ],
                [ 'INSERT INTO list_2 VALUES (?,?,?)', [2, "Deur", "Door"] ],

                [ 'INSERT INTO dict_PSO_v1 VALUES (?,?,?,?)', [1, 1, "Aan- en afvoerweg", "Route of communication, supply route"] ],
                [ 'INSERT INTO dict_PSO_v1 VALUES (?,?,?,?)', [2, 1, "Aanbieden", "Offer, present, forward, put forward"] ],
                [ 'INSERT INTO dict_PSO_v1 VALUES (?,?,?,?)', [2, 2, "Doen toekomen", "Send"] ],
                [ 'INSERT INTO dict_PSO_v1 VALUES (?,?,?,?)', [2, 3, "Voorleggen", "Put on the table, propose, submit"] ],
                [ 'INSERT INTO dict_PSO_v1 VALUES (?,?,?,?)', [3, 1, "Aandeel (bijdrage)", "Share, contribution, participation, apportionment, part, portion"] ],

            ]).then((data) => {
                console.log("SQL BATCH SUCCES");
            }, (error) => {
                console.log("SQL BATCH ERROR");
            });

        });
    }

    public addNewDataset(name: string, version: number, description: string, publisher: string) {
        let query = `INSERT INTO available_datasets (name, version, description, publisher) VALUES (?,?,?,?)`;
        let query2 = `CREATE TABLE IF NOT EXISTS dict_${name.toUpperCase()}_v${version} (group_id INTEGER, sub_id INTEGER, base_lang TEXT, translation TEXT, PRIMARY KEY (group_id, sub_id))`;

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.executeSql(query, [name, version, description, publisher]).then(() => {
                    console.log("INSERT TABLE SUCCES");
                    this.db.executeSql(query2, []).then(() => {
                        resolve(true);
                    }, (error) => {
                        console.log("ERROR CREATING NEW TABLE");
                    })
                }, (error) => {
                    console.log("ERROR INSERTING INTO available_datasets");
                });
            }, (error) => {
                console.log("PLATFORM NOT READY");
            });
        });
    }

    public addEntriesToDataset(dataset: DatasetInfo, entries: Entry[]) {
        let query = `INSERT INTO dict_${dataset.name.toUpperCase()}_v${dataset.version} VALUES (?,?,?,?)`;
        let sqlBatch: any[] = [];

        for(let entry of entries) {
            sqlBatch.push([query, [entry.group_id, entry.sub_id, entry.base_lang, entry.translation]]);
        }

        return new Promise((resolve, reject) => {
            this.platform.ready().then(() => {
                this.db.sqlBatch(sqlBatch).then(() => {
                    console.log("SQL BATCH SUCCES");
                    resolve();
                }, (error) => {
                    console.log("SQL BATCH ERROR");
                    reject();
                });
            });
        });
    }

    public databaseIsOpen() {
        return this.isOpen;
    }

}
