import { CollectionModel } from "./CollectionModel.js";

export class NotificationModel extends CollectionModel {
    constructor(db) {
        super(db, "Notification");
    }
}
