"use strict";

import path from "node:path";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";
import session from "express-session";
import {createClient} from "redis";
import RedisStore from "connect-redis";
import favicon from "serve-favicon";

import database from "./domain/models/index.cjs";
import apiRouter from "./interfaces/routes/index.js";
import mainConfig from "./infrastructure/configs/mainConfigs.js";

class Application {
    #app = express();
    #PORT;
    #HOSTNAME;

    constructor(PORT, HOSTNAME) {
        this.#PORT = PORT;
        this.#HOSTNAME = HOSTNAME;
        this.rootDir = mainConfig.rootDir;
    }

    async boot() {
        await this.initGlobals();
        await this.initRedis();
        await this.configApplication();
        await this.createRoutes();
        await this.createServer();
    }

    async initGlobals() {
        global.database = database;
        global.cacheDatabase = await this.initRedis();
    }

    async initRedis() {
        const redisHost = process.env.REDIS_HOST;
        const redisPort = process.env.REDIS_PORT;
        return (await createClient({
            url: `redis://${redisHost}:${redisPort}`
        }).connect());
    }

    async configApplication() {
        this.#app.set("view engine", "ejs");
        this.#app.set("views", path.join(this.rootDir, "src", "interfaces", "views"));
        this.#app.set("layout", "layouts/layout");
        this.#app.use(expressLayouts);
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: false}));
        this.#app.use(cookieParser(process.env.SECRET_COOKIE_KEY));
        this.#app.use(session({
            secret: process.env.SECRET_COOKIE_KEY,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000,
                httpOnly: true,
                sameSite: "lax",
                secure: false
            },
            store: new RedisStore({
                client: await this.initRedis(),
                prefix: "sst: "
            }),
            unset: "destroy"
        }));
        this.#app.use("/public", express.static(path.join(this.rootDir, "public")));
        this.#app.use(favicon(path.join(this.rootDir, "public", "favicon.ico")));
    }

    async createRoutes() {
        this.#app.use("/api", apiRouter);
    }

    async createServer() {
        this.#app.listen(this.#PORT, this.#HOSTNAME, () => {
            console.log(`Express server is running on ${this.#HOSTNAME}:${this.#PORT}`);
        });
    }
}

export default Application;


