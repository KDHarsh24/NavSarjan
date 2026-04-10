import { CollectionModel } from "./CollectionModel.js";

export class ContactModel extends CollectionModel {
    constructor(db) {
        super(db, "Contact");
    }
}
