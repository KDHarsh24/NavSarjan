import { CollectionModel } from "../models/CollectionModel.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { MESSAGES } from "../constants/messages.js";
import { ROLES, normalizeRole } from "../constants/roles.js";
import { ApiError } from "../utils/ApiError.js";

export class DataService {
    constructor({ db, historyService, toObjectId }) {
        this.db = db;
        this.historyService = historyService;
        this.toObjectId = toObjectId;
    }

    getCollectionModel(collectionName) {
        return new CollectionModel(this.db, collectionName);
    }

    isElevatedRole(role) {
        const normalizedRole = normalizeRole(role);
        return normalizedRole === ROLES.ADMIN || normalizedRole === ROLES.POLICY_MAKER;
    }

    getAllowedCollectionsByOperation() {
        return {
            insert: {
                [ROLES.STARTUP]: ["startup", "project", "ipr", "events", "resources"],
                [ROLES.INVESTOR]: ["events"],
                [ROLES.POLICY_MAKER]: ["history", "events"],
                [ROLES.ADMIN]: ["startup", "project", "ipr", "history", "user", "events", "resources", "institute"],
            },
            fetch: {
                [ROLES.STARTUP]: ["startup", "project", "ipr", "user", "events", "resources", "institute"],
                [ROLES.INVESTOR]: ["startup", "project", "ipr", "user", "events", "institute"],
                [ROLES.POLICY_MAKER]: ["startup", "project", "ipr", "history", "user", "events", "resources", "institute"],
                [ROLES.ADMIN]: ["startup", "project", "ipr", "history", "user", "events", "resources", "institute"],
            },
            fetchOne: {
                [ROLES.STARTUP]: ["startup", "project", "ipr", "user", "events", "resources", "institute"],
                [ROLES.INVESTOR]: ["startup", "project", "ipr", "user", "events", "institute"],
                [ROLES.POLICY_MAKER]: ["startup", "project", "ipr", "history", "user", "events", "resources", "institute"],
                [ROLES.ADMIN]: ["startup", "project", "ipr", "history", "user", "events", "resources", "institute"],
            },
            replace: {
                [ROLES.STARTUP]: ["startup", "project", "ipr", "user", "events", "resources"],
                [ROLES.INVESTOR]: ["user"],
                [ROLES.POLICY_MAKER]: ["startup", "project", "ipr", "history", "user", "events", "resources"],
                [ROLES.ADMIN]: ["startup", "project", "ipr", "history", "user", "events", "resources", "institute"],
            },
        };
    }

    ensureAuthorized({ operation, collectionName, user }) {
        const role = normalizeRole(user?.role);
        const collection = String(collectionName || "").trim().toLowerCase();
        const operationAcl = this.getAllowedCollectionsByOperation()[operation] || {};
        const allowedCollections = operationAcl[role] || [];

        if (!allowedCollections.includes(collection)) {
            throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
        }
    }

    getOwnerScope(collectionName, user) {
        const role = normalizeRole(user?.role);
        const email = String(user?.email || "").trim();

        if (!email || this.isElevatedRole(role)) {
            return null;
        }

        if (collectionName === "startup" && role === ROLES.STARTUP) {
            return { founderuserid: email };
        }

        if (collectionName === "project" && role === ROLES.STARTUP) {
            return { ownerid: email };
        }

        if (collectionName === "ipr" && role === ROLES.STARTUP) {
            return { email };
        }

        if (collectionName === "user") {
            return { email };
        }

        if (collectionName === "events") {
            return { Participants: { $in: [String(user?.id || "")] } };
        }

        if (collectionName === "resources" && role === ROLES.STARTUP) {
            return { startupRequestingid: String(user?.id || "") };
        }

        return null;
    }

    mergeConditionWithOwnerScope(condition = {}, ownerScope = null) {
        if (!ownerScope) {
            return condition;
        }

        if (!condition || Object.keys(condition).length === 0) {
            return ownerScope;
        }

        return {
            $and: [condition, ownerScope],
        };
    }

    validateOwnerForInsert(collectionName, role, data = {}, ownerEmail = "", ownerUserId = "") {
        if (this.isElevatedRole(role)) {
            return;
        }

        if (!ownerEmail) {
            throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
        }

        if (collectionName === "startup" && String(data?.founderuserid || "") !== ownerEmail) {
            throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
        }

        if (collectionName === "project" && String(data?.ownerid || "") !== ownerEmail) {
            throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
        }

        if (collectionName === "ipr" && String(data?.email || "") !== ownerEmail) {
            throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
        }

        if (collectionName === "events") {
            const participantIds = Array.isArray(data?.Participants) ? data.Participants.map(String) : [];
            if (!participantIds.includes(String(ownerUserId || ""))) {
                throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
            }
        }

        if (collectionName === "resources" && String(data?.startupRequestingid || "") !== String(ownerUserId || "")) {
            throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
        }
    }

    normalizeCondition(condition = {}) {
        const nextCondition = { ...condition };
        if (nextCondition._id) {
            nextCondition._id = this.toObjectId(nextCondition._id);
        }
        return nextCondition;
    }

    normalizeData(data = {}) {
        const nextData = { ...data };
        if (nextData._id) {
            nextData._id = this.toObjectId(nextData._id);
        }
        return nextData;
    }

    parseNumericValue(value) {
        if (typeof value === "number" && Number.isFinite(value)) {
            return value;
        }

        if (typeof value !== "string") {
            return 0;
        }

        const raw = value.trim().toLowerCase();
        if (!raw) {
            return 0;
        }

        let multiplier = 1;
        if (raw.includes("crore") || raw.includes("cr")) {
            multiplier = 10_000_000;
        } else if (raw.includes("lakh") || raw.includes("lac")) {
            multiplier = 100_000;
        } else if (raw.includes("million") || raw.includes("m")) {
            multiplier = 1_000_000;
        } else if (raw.includes("billion") || raw.includes("bn") || raw.includes("b")) {
            multiplier = 1_000_000_000;
        } else if (raw.includes("k")) {
            multiplier = 1_000;
        }

        const numeric = Number.parseFloat(raw.replace(/[^\d.-]/g, ""));
        if (Number.isNaN(numeric)) {
            return 0;
        }

        return numeric * multiplier;
    }

    async buildMetricsMeta({ collection, safeCondition, metrics = {} }) {
        const safeMetrics = metrics && typeof metrics === "object" ? metrics : {};
        const meta = {};

        if (safeMetrics.revenueField) {
            const revenueField = String(safeMetrics.revenueField);
            const docs = await collection.find(safeCondition, {
                [revenueField]: 1,
                _id: 0,
            });

            const totalRevenue = docs.reduce((sum, doc) => {
                return sum + this.parseNumericValue(doc?.[revenueField]);
            }, 0);

            meta.totalRevenue = Number(totalRevenue.toFixed(2));
        }

        return meta;
    }

    buildSearchCondition(collectionName, searchText = "") {
        const safeSearchText = String(searchText || "").trim();
        if (!safeSearchText) {
            return null;
        }

        const regex = { $regex: safeSearchText, $options: "i" };

        if (collectionName === "startup") {
            return {
                $or: [
                    { name: regex },
                    { description: regex },
                    { founder: regex },
                    { industry: { $elemMatch: regex } },
                ],
            };
        }

        if (collectionName === "project") {
            return {
                $or: [
                    { name: regex },
                    { description: regex },
                    { ownerName: regex },
                    { technologies: { $elemMatch: regex } },
                ],
            };
        }

        return null;
    }

    buildFilterCondition(collectionName, filters = {}) {
        const safeFilters = filters && typeof filters === "object" ? filters : {};
        const filterCondition = {};

        if (collectionName === "startup" && safeFilters.industry && safeFilters.industry !== "all") {
            filterCondition.industry = { $in: [safeFilters.industry] };
        }

        if (collectionName === "project" && safeFilters.status && safeFilters.status !== "all") {
            filterCondition.status = safeFilters.status;
        }

        return filterCondition;
    }

    buildFetchCondition({ collectionName, condition = {}, searchText = "", filters = {} }) {
        const baseCondition = this.normalizeCondition(condition);
        const filterCondition = this.buildFilterCondition(collectionName, filters);
        const searchCondition = this.buildSearchCondition(collectionName, searchText);

        const mergedBase = {
            ...baseCondition,
            ...filterCondition,
        };

        if (!searchCondition) {
            return mergedBase;
        }

        if (Object.keys(mergedBase).length === 0) {
            return searchCondition;
        }

        return {
            $and: [mergedBase, searchCondition],
        };
    }

    buildDuplicateCondition(collectionName, data = {}) {
        if (collectionName === "startup" && data?.name && data?.founderuserid) {
            return { name: data.name, founderuserid: data.founderuserid };
        }

        if (collectionName === "project" && data?.name && data?.ownerid) {
            return { name: data.name, ownerid: data.ownerid };
        }

        if (collectionName === "ipr" && data?.inventionTitle && data?.email) {
            return { inventionTitle: data.inventionTitle, email: data.email };
        }

        if (collectionName === "user" && data?.email) {
            return { email: data.email };
        }

        return null;
    }

    async insert({ collectionName, data, user }) {
        this.ensureAuthorized({ operation: "insert", collectionName, user });

        const role = normalizeRole(user?.role);
        const ownerEmail = String(user?.email || "").trim();
        const ownerUserId = String(user?.id || "").trim();
        this.validateOwnerForInsert(collectionName, role, data, ownerEmail, ownerUserId);

        const collection = this.getCollectionModel(collectionName);
        const duplicateCondition = this.buildDuplicateCondition(collectionName, data);

        if (duplicateCondition) {
            const existing = await collection.findOne(duplicateCondition, { _id: 1 });
            if (existing) {
                return {
                    ok: false,
                    code: "DUPLICATE_DOCUMENT",
                    existingId: existing._id,
                };
            }
        }

        const result = await collection.insertOne(data);

        const historyEntityType = collectionName === "resources" ? "startup" : collectionName;
        const historyEntityId = collectionName === "resources" ? data?.startupRequestingid : result.insertedId;

        await this.historyService.logHistory({
            entityType: historyEntityType,
            entityId: historyEntityId,
            fieldChanged:
                collectionName === "startup"
                    ? "New Startup Launched"
                    : collectionName === "ipr"
                        ? "IPR Request"
                        : collectionName === "resources"
                            ? "Resource Request Submitted"
                            : "New Project Open",
            changedBy: data?.ownerid || data?.founderuserid || data?.requestRaisedByEmail || "admin",
        });

        return { ok: true, result };
    }

    async fetch({
        collectionName,
        condition = {},
        projection = {},
        searchText = "",
        filters = {},
        metrics = {},
        page,
        pageSize,
        user,
    }) {
        this.ensureAuthorized({ operation: "fetch", collectionName, user });

        const collection = this.getCollectionModel(collectionName);
        const scopedCondition = this.mergeConditionWithOwnerScope(
            this.normalizeCondition(condition),
            this.getOwnerScope(collectionName, user)
        );

        const safeCondition = this.buildFetchCondition({
            collectionName,
            condition: scopedCondition,
            searchText,
            filters,
        });
        const meta = await this.buildMetricsMeta({
            collection,
            safeCondition,
            metrics,
        });

        const hasPagination = page !== undefined || pageSize !== undefined;

        if (hasPagination) {
            const paginated = await collection.findPaginated({
                condition: safeCondition,
                projection,
                page: page ?? 0,
                pageSize: pageSize ?? 20,
            });

            if (Object.keys(meta).length > 0) {
                paginated.meta = meta;
            }

            return paginated;
        }

        const rows = await collection.find(safeCondition, projection);

        if (Object.keys(meta).length > 0) {
            return {
                rows,
                meta,
            };
        }

        return rows;
    }

    async fetchOne({ collectionName, condition = {}, projection = {}, user }) {
        this.ensureAuthorized({ operation: "fetchOne", collectionName, user });

        const collection = this.getCollectionModel(collectionName);
        const safeCondition = this.mergeConditionWithOwnerScope(
            this.normalizeCondition(condition),
            this.getOwnerScope(collectionName, user)
        );
        return collection.findOne(safeCondition, projection);
    }

    async replace({ collectionName, condition, data, user }) {
        this.ensureAuthorized({ operation: "replace", collectionName, user });

        const collection = this.getCollectionModel(collectionName);
        const safeCondition = this.mergeConditionWithOwnerScope(
            this.normalizeCondition(condition),
            this.getOwnerScope(collectionName, user)
        );
        const safeData = this.normalizeData(data);

        const result = await collection.replaceOne(safeCondition, safeData);

        if (result.matchedCount === 0) {
            return { ok: false, result };
        }

        await this.historyService.logHistory({
            entityType: collectionName,
            entityId: safeData._id,
            fieldChanged:
                collectionName === "startup"
                    ? "Startup Edit"
                    : collectionName === "ipr"
                        ? "IPR Request Changed"
                        : "Project Approval",
            changedBy: safeData?.ownerid || safeData?.founderuserid || "admin",
            isVerification: collectionName === "history",
        });

        if (collectionName === "history" && safeData.isVerification === true) {
            const sourceCollection = this.getCollectionModel(safeData.entityType);
            if (safeData.entityType === "user") {
                await sourceCollection.updateOne(
                    { email: safeData.entityId },
                    { $set: { isVerification: safeData.isVerification } }
                );
            } else {
                await sourceCollection.updateOne(
                    { _id: this.toObjectId(safeData.entityId) },
                    { $set: { level: safeData.isVerification } }
                );
            }
        }

        return { ok: true, result };
    }

    async invest({ collectionName, entityId, amount, user }) {
        const normalizedCollection = String(collectionName || "").trim().toLowerCase();
        if (!["project", "startup"].includes(normalizedCollection)) {
            return { ok: false, code: "INVALID_COLLECTION" };
        }

        const normalizedAmount = Number(amount);
        if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
            return { ok: false, code: "INVALID_AMOUNT" };
        }

        const role = normalizeRole(user?.role);
        if (!(role === ROLES.INVESTOR || role === ROLES.ADMIN)) {
            throw new ApiError(HTTP_STATUS.FORBIDDEN, MESSAGES.AUTH.FORBIDDEN);
        }

        const collection = this.getCollectionModel(normalizedCollection);
        const safeId = this.toObjectId(entityId);
        const entity = await collection.findOne({ _id: safeId }, { investors: 1, name: 1 });

        if (!entity) {
            return { ok: false, code: "NOT_FOUND" };
        }

        const investorEmail = String(user?.email || "").trim().toLowerCase();
        const existingInvestors = Array.isArray(entity.investors) ? entity.investors : [];
        const index = existingInvestors.findIndex(
            (investor) => String(investor?.email || "").trim().toLowerCase() === investorEmail
        );

        const nextInvestors = [...existingInvestors];
        const now = new Date();

        if (index >= 0) {
            const previousAmount = Number(nextInvestors[index]?.amount) || 0;
            nextInvestors[index] = {
                ...nextInvestors[index],
                id: nextInvestors[index]?.id || user?.id,
                name: user?.name || nextInvestors[index]?.name || "Investor",
                email: user?.email || nextInvestors[index]?.email,
                amount: Number((previousAmount + normalizedAmount).toFixed(2)),
                updatedAt: now,
            };
        } else {
            nextInvestors.push({
                id: user?.id,
                name: user?.name || "Investor",
                email: user?.email,
                amount: Number(normalizedAmount.toFixed(2)),
                investedAt: now,
                updatedAt: now,
                verified: false,
            });
        }

        const result = await collection.updateOne(
            { _id: safeId },
            { $set: { investors: nextInvestors } }
        );

        await this.historyService.logHistory({
            entityType: normalizedCollection,
            entityId: safeId,
            fieldChanged: "Investment Added",
            changedBy: user?.email || "investor",
        });

        return {
            ok: true,
            result,
        };
    }
}
