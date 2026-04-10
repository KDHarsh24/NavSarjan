import { MongoClient, ObjectId } from "mongodb";

export class DatabaseManager {
    constructor({ uri, dbName }) {
        this.uri = uri;
        this.dbName = dbName;
        this.client = null;
        this.db = null;
    }

    async connect() {
        if (this.db) {
            return this.db;
        }

        this.client = new MongoClient(this.uri);
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        return this.db;
    }

    getDb() {
        if (!this.db) {
            throw new Error("Database not initialized. Call connect() first.");
        }

        return this.db;
    }

    toObjectId(value) {
        return new ObjectId(value);
    }
}
