"use strict";

class ReturnMiddleware {
    return(data, req, res, next) {
        res.status(200).json(data);
        next();
    }

    render(data, req, res, next) {
        let {data: values, template, layout} = data;
        res.render(template, {layout, values});
        next();
    }
}

export default new ReturnMiddleware();