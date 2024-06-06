"use strict";

import 'dotenv/config';
import Application from "./src/server.js";

const application = new Application(process.env.APP_PORT, process.env.APP_HOSTNAME);

// -----| BootTheApplication
await application.boot();
