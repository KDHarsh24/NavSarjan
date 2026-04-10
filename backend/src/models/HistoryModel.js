import { CollectionModel } from "./CollectionModel.js";

export class HistoryModel extends CollectionModel {
    constructor(db) {
        super(db, "history");
    }
}
