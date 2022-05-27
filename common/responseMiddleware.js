const COMMON_HEADERS = {
    "access-control-allow-origin": "*",
    "content-type": "application/json"
}

module.exports = (opt={}) => {
    const responseMiddlewareAfter = async (handler) => {
        const response = handler.response
        const statusCode = response ? response.statusCode || 200 : 200

        if ( response && response.isFile ){
            const headers = response.headers
            const body = response.body

            handler.response = {headers, statusCode, body, isBase64Encoded: true}
        } else {
            const headers = response ? {...response.headers, ...COMMON_HEADERS }: COMMON_HEADERS
            const body = JSON.stringify(response)

            handler.response = {headers, statusCode, body}
        }
    }

    const errorMiddlewareOnError = async (handler) => {
        let error = handler.error
        handler.response = {
            headers: COMMON_HEADERS,
            statusCode: error.statusCode,
            body: JSON.stringify(error.message)
        }

    }
    return {
        after: responseMiddlewareAfter,
        onError: errorMiddlewareOnError
    }
}