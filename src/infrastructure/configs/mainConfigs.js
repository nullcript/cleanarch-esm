'use strict';
import path from 'node:path';
import {fileURLToPath} from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    appName: "express web application",
    version: "1.0.0",
    rootDir: path.join(dirname, "..", "..", "..")
};
