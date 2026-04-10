import { CollectionModel } from "./CollectionModel.js";

export class ChatModel extends CollectionModel {
    constructor(db) {
        super(db, "Chat");
    }
}
