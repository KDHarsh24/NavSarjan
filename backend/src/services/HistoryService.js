export class HistoryService {
    constructor({ historyModel }) {
        this.historyModel = historyModel;
    }

    async logHistory({ entityType, entityId, fieldChanged, changedBy, isVerification = 0 }) {
        const historyData = {
            entityType,
            entityId,
            fieldChanged,
            changedBy,
            changeDate: new Date(),
            isVerification,
        };

        return this.historyModel.insertOne(historyData);
    }
}
