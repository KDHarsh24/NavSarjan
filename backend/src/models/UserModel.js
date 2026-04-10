import { CollectionModel } from "./CollectionModel.js";

export class UserModel extends CollectionModel {
    constructor(db) {
        super(db, "user");
    }
}
