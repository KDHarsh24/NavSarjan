import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";

import { DatabaseManager } from "./config/database.js";
import { buildApp } from "./app.js";

import { UserModel } from "./models/UserModel.js";
import { HistoryModel } from "./models/HistoryModel.js";
import { ChatModel } from "./models/ChatModel.js";
import { ContactModel } from "./models/ContactModel.js";
import { NotificationModel } from "./models/NotificationModel.js";
import { AuthSessionModel } from "./models/AuthSessionModel.js";

import { HistoryService } from "./services/HistoryService.js";
import { AuthService } from "./services/AuthService.js";
import { DataService } from "./services/DataService.js";
import { ChatService } from "./services/ChatService.js";

import { AuthController } from "./controllers/AuthController.js";
import { DataController } from "./controllers/DataController.js";
import { ChatController } from "./controllers/ChatController.js";

import { buildAuthRoutes } from "./routes/authRoutes.js";
import { buildDataRoutes } from "./routes/dataRoutes.js";
import { buildChatRoutes } from "./routes/chatRoutes.js";
import { buildAuthMiddleware } from "./middlewares/authMiddleware.js";
import { buildRateLimiters } from "./middlewares/rateLimiter.js";
import { setDependencies } from "./bootstrap/dependencyContainer.js";
import { MESSAGES } from "./constants/messages.js";

const getRequiredEnv = (key) => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

const PORT = Number(process.env.PORT || 5001);
const DB_NAME = process.env.MONGO_DB_NAME || "navsarjan";
const JWT_SECRET = getRequiredEnv("JWT_SECRET");
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const REFRESH_TOKEN_SECRET = getRequiredEnv("REFRESH_TOKEN_SECRET");
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";
const MAX_ACTIVE_SESSIONS_PER_USER = Number(process.env.MAX_ACTIVE_SESSIONS_PER_USER) || 5;
const REVOKED_SESSION_RETENTION_DAYS = Number(process.env.REVOKED_SESSION_RETENTION_DAYS) || 30;
const API_RATE_LIMIT_WINDOW_MS = Number(process.env.API_RATE_LIMIT_WINDOW_MS) || 60_000;
const API_RATE_LIMIT_MAX = Number(process.env.API_RATE_LIMIT_MAX) || 120;
const AUTH_RATE_LIMIT_WINDOW_MS = Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60_000;
const AUTH_RATE_LIMIT_MAX = Number(process.env.AUTH_RATE_LIMIT_MAX) || 20;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
const MONGO_URI = getRequiredEnv("MONGO_URI");
const MONGO_URI_FALLBACK = process.env.MONGO_URI_FALLBACK || "mongodb://127.0.0.1:27017/navsarjan";

const isAtlasDnsFailure = (error) =>
    error?.code === "ENOTFOUND" ||
    error?.syscall === "querySrv" ||
    String(error?.message || "").includes("querySrv ENOTFOUND");

const start = async () => {
    try {
        const databaseManager = new DatabaseManager({ uri: MONGO_URI, dbName: DB_NAME });
        let db;

        try {
            db = await databaseManager.connect();
        } catch (primaryError) {
            if (!isAtlasDnsFailure(primaryError)) {
                throw primaryError;
            }

            console.warn(
                `Primary MongoDB URI could not be resolved. Falling back to ${MONGO_URI_FALLBACK}`
            );

            const fallbackDatabaseManager = new DatabaseManager({
                uri: MONGO_URI_FALLBACK,
                dbName: DB_NAME,
            });
            db = await fallbackDatabaseManager.connect();
        }

        const userModel = new UserModel(db);
        const historyModel = new HistoryModel(db);
        const chatModel = new ChatModel(db);
        const contactModel = new ContactModel(db);
        const notificationModel = new NotificationModel(db);
        const authSessionModel = new AuthSessionModel(db);
        await authSessionModel.ensureIndexes();

        const revokedSessionCutoff = new Date(
            Date.now() - REVOKED_SESSION_RETENTION_DAYS * 24 * 60 * 60 * 1000
        );
        await authSessionModel.deleteRevokedOlderThan(revokedSessionCutoff);

        const historyService = new HistoryService({ historyModel });
        const authService = new AuthService({
            userModel,
            historyService,
            authSessionModel,
            jwtSecret: JWT_SECRET,
            tokenExpiresIn: JWT_EXPIRES_IN,
            refreshSecret: REFRESH_TOKEN_SECRET,
            refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRES_IN,
            maxActiveSessionsPerUser: MAX_ACTIVE_SESSIONS_PER_USER,
        });
        const dataService = new DataService({
            db,
            historyService,
            toObjectId: databaseManager.toObjectId.bind(databaseManager),
        });
        const chatService = new ChatService({ chatModel, contactModel, notificationModel });

        const authController = new AuthController({ authService });
        const dataController = new DataController({ dataService });
        const chatController = new ChatController({ chatService });
        const authMiddleware = buildAuthMiddleware({ authService });
        const rateLimiters = buildRateLimiters({
            apiWindowMs: API_RATE_LIMIT_WINDOW_MS,
            apiMaxRequests: API_RATE_LIMIT_MAX,
            authWindowMs: AUTH_RATE_LIMIT_WINDOW_MS,
            authMaxRequests: AUTH_RATE_LIMIT_MAX,
            apiMessage: MESSAGES.GENERAL.API_RATE_LIMIT_EXCEEDED,
            authMessage: MESSAGES.GENERAL.AUTH_RATE_LIMIT_EXCEEDED,
        });

        setDependencies({
            authController,
            dataController,
            chatController,
            authMiddleware,
            rateLimiters,
        });

        const authRoutes = buildAuthRoutes();
        const dataRoutes = buildDataRoutes();
        const chatRoutes = buildChatRoutes();

        const app = buildApp({ authRoutes, dataRoutes, chatRoutes, rateLimiters });
        const httpServer = createServer(app);

        const io = new Server(httpServer, {
            cors: {
                origin: CORS_ORIGIN,
                methods: ["GET", "POST"],
            },
        });

        io.use(authMiddleware.requireSocketAuth);

        chatService.bindSocket(io);

        httpServer.listen(PORT, () => {
            // Server started
        });
    } catch (error) {
        console.error("Failed to start backend:", error);
        process.exit(1);
    }
};

start();
