import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

// The app runs behind Replit's shared reverse proxy, which sets X-Forwarded-For.
// Trust exactly one hop so express-rate-limit/req.ip reflect the real client IP
// instead of throwing/misidentifying users behind the proxy.
app.set("trust proxy", 1);

const allowedOrigins = [
  ...(process.env.REPLIT_DOMAINS?.split(",").map((d) => `https://${d.trim()}`) ?? []),
  ...(process.env.NODE_ENV !== "production"
    ? [/^http:\/\/localhost:\d+$/, /^https?:\/\/.*\.replit\.dev$/]
    : []),
];

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        // Same-origin/non-browser requests (curl, server-to-server) have no Origin header.
        callback(null, true);
        return;
      }
      const isAllowed = allowedOrigins.some((allowed) =>
        typeof allowed === "string" ? allowed === origin : allowed.test(origin),
      );
      callback(isAllowed ? null : new Error("Not allowed by CORS"), isAllowed);
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
