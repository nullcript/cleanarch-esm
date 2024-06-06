"use strict";

import BaseController from "./BaseController.js";


class TestController extends BaseController {
    constructor(useCase) {
        super(useCase);
    }

    async get(req, res, next) {
        const result = await this.useCase.get(req, res);
        return next(result);
    }
}

export default TestController;