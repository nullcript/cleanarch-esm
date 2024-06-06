"use strict";

import BaseUseCase from "./BaseUseCase.js";

class TestUseCase extends BaseUseCase {
    constructor({testRepository}) {
        super();
        this.testRepository = testRepository;
    }

    async get(req, res) {
        try {
            let result = await this.testRepository.get(req, res);
            return this.responseWithMessage(result, this.value.prepared, true);
        } catch (error) {
            console.log(error);
            return this.responseWithMessage(error.name, this.value.error, false);
        }
    }
}

export default TestUseCase;