export class CollectionModel {
    constructor(db, collectionName) {
        this.db = db;
        this.collectionName = collectionName;
    }

    collection() {
        return this.db.collection(this.collectionName);
    }

    async insertOne(data) {
        return this.collection().insertOne(data);
    }

    async find(condition = {}, projection = {}) {
        return this.collection().find(condition).project(projection).toArray();
    }

    async countDocuments(condition = {}) {
        return this.collection().countDocuments(condition);
    }

    async findPaginated({ condition = {}, projection = {}, page = 0, pageSize = 20 }) {
        const safePage = Math.max(Number(page) || 0, 0);
        const safePageSize = Math.max(Number(pageSize) || 20, 1);

        const [rows, total] = await Promise.all([
            this.collection()
                .find(condition)
                .project(projection)
                .skip(safePage * safePageSize)
                .limit(safePageSize)
                .toArray(),
            this.countDocuments(condition),
        ]);

        return {
            rows,
            total,
            page: safePage,
            pageSize: safePageSize,
        };
    }

    async findOne(condition = {}, projection = {}) {
        return this.collection().findOne(condition, projection);
    }

    async replaceOne(condition, data) {
        return this.collection().replaceOne(condition, data);
    }

    async updateOne(condition, update, options = {}) {
        return this.collection().updateOne(condition, update, options);
    }

    async updateMany(condition, update, options = {}) {
        return this.collection().updateMany(condition, update, options);
    }

    async aggregate(pipeline = []) {
        return this.collection().aggregate(pipeline).toArray();
    }

    async deleteOne(condition = {}) {
        return this.collection().deleteOne(condition);
    }
}
