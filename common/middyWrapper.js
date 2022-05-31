const middy = require('@middy/core')
const httpJsonBodyParse = require('@middy/http-json-body-parser');
const logMiddleware = require('../common/logsMiddleware')
const responseMiddleware = require('../common/responseMiddleware')

module.exports = (handler) => {
    const middyHandler = middy(handler)
        .use(httpJsonBodyParse())
        .use(logMiddleware())
        .use(responseMiddleware())

    return middyHandler;
}