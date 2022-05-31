const winston = require('winston');
const ecsFormat = require('@elastic/ecs-winston-format');

global.logger =  winston.createLogger({
    level: 'info',
    format: ecsFormat(),
    transports: [
        new winston.transports.Console()
    ]
})

module.exports = () => {
    const logMiddlewareBefore = async ({event, context}) => {
        logger.info(JSON.stringify({
            transactionId: context.awsRequestId,
            type: 'request',
            functionName: context.functionName,
            context: event.requestContext.httpMethod + " " +event.path,
            body: event.body,
            headers: event.headers,
            apiGatewayRequestId: event.requestContext.requestId,
        }));
    }
    const logMiddlewareAfter = async ({response, context}) => {
        logger.info(JSON.stringify({
            transactionId: context.awsRequestId,
            type: 'response',
            functionName: context.functionName,
            context: 'statusCode: ' + response.statusCode,
            body: response.body,
            headers: response.headers
        }));
    };
    const logMiddlewareError = async ({response, error, context}) => {
        logger.error(JSON.stringify({
            transactionId: context.awsRequestId,
            type: 'error',
            functionName: context.functionName,
            context: 'statusCode: '+ response.statusCode,
            body: response.body,
            headers: response.headers
        }));
    }

    return {
        before: logMiddlewareBefore,
        after: logMiddlewareAfter,
        onError: logMiddlewareError
    }
}