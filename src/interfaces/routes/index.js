'use strict';

import express from "express";
import BaseRoute from "./v1/BaseRoute.js";

const router = express.Router();

router.use('/v1', BaseRoute);

export default router;