import {Col_name} from "./Col_name";
import {Row} from "ionic-angular";


export class Manifest {
    Manifest: String;
    col_name_lst: Array<Col_name>;
    row_lst: Array<Row>;

    constructor(Manifest: String, col_name_lst: Array<Col_name>, row_lst: Array<Row>) {
        this.Manifest = Manifest;
        this.col_name_lst = col_name_lst;
        this.row_lst = row_lst;
    }
}
