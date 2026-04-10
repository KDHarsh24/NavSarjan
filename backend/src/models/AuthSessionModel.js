import { CollectionModel } from "./CollectionModel.js";

export class AuthSessionModel extends CollectionModel {
    constructor(db) {
        super(db, "auth_sessions");
    }

    async ensureIndexes() {
        await this.collection().createIndex({ sessionId: 1 }, { unique: true });
        await this.collection().createIndex({ userId: 1, revokedAt: 1, createdAt: 1 });
        await this.collection().createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    }

    async getActiveSessionsByUser(userId) {
        return this.collection()
            .find({ userId: String(userId), revokedAt: null })
            .sort({ createdAt: 1 })
            .toArray();
    }

    async revokeSessionById(sessionId) {
        return this.updateOne(
            { sessionId, revokedAt: null },
            { $set: { revokedAt: new Date() } }
        );
    }

    async deleteRevokedOlderThan(cutoffDate) {
        return this.collection().deleteMany({
            revokedAt: { $ne: null, $lt: cutoffDate },
        });
    }
}
