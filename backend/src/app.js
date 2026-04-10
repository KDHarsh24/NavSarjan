import express from "express";
import cors from "cors";
import { requestLogger } from "./middlewares/requestLogger.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

export const buildApp = ({ authRoutes, dataRoutes, chatRoutes, rateLimiters }) => {
    const { apiLimiter } = rateLimiters;
    const app = express();

    app.use(cors());
    app.use(requestLogger);
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ limit: "10mb", extended: true }));

    app.use("/api", apiLimiter, authRoutes);
    app.use("/api", apiLimiter, dataRoutes);
    app.use("/home", apiLimiter, chatRoutes);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
};
