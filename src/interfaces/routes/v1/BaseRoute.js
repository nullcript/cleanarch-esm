'use strict';

import express from "express";

import TestRoutes from "./TestRoutes.js";

const router = express.Router();

router.use("/test", TestRoutes);

export default router;