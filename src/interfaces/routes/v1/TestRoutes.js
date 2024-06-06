"use strict";

import express from "express";
import {body} from "express-validator";
import ReturnMiddleware from "../../middlewares/ReturnMiddleware.js";
import ValidatorMiddleware from "../../middlewares/ValidatorMiddleware.js";
import TestController from "../../controllers/v1/TestController.js";

import {
    SequelizeTestRepository
} from "../../../infrastructure/database/repositories/index.js";

import {
    TestUseCase
} from "../../../application/usecases/index.js";


const testRepository = new SequelizeTestRepository("Test");
const testUseCase = new TestUseCase({testRepository});
const testController = new TestController(testUseCase);

const router = express.Router();

router.get("/get", testController.get.bind(testController), ReturnMiddleware.return);

export default router;