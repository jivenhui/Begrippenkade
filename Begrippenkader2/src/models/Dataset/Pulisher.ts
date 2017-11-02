//Model import
import {DateTime} from "ionic-angular";
import {DatasetInfo} from "./DatasetInfo";

export class Publisher {
    publisher_name: String;
    version: String;
    last_update_dateTime: DateTime;
    local_datasets: Array<DatasetInfo>;

    constructor(publisher_name: String, version: String, last_update_dateTime: DateTime, local_datasets: Array<DatasetInfo>) {
        this.publisher_name = publisher_name;
        this.version = version;
        this.last_update_dateTime = last_update_dateTime;
        this.local_datasets = local_datasets;
    }
}