"use strict";

import BaseSequelizeRepository from "./BaseSequelizeRepository.js";

class SequelizeTestRepository extends BaseSequelizeRepository {
    constructor(entity) {
        super(entity);
    }

    async get(req, res) {
        return {
            msg: "welcome to my cleanArchitecture baseline in express.js",
            url: req.url,
            ip: req.ip,
            query: req.query,
            params: req.params,
            body: req.body,
            requestDate: new Date()
        };
    }
}

export default SequelizeTestRepository;