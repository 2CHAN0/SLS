module.exports = class BasicError extends Error{
    constructor(message, status) {
        super(message || 'InternalServerError')
        this.type = 'InternalServerError'
        this.statusCode = status || 500
    }
}