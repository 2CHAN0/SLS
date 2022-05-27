const BasicError = require('./basicError');

module.exports = {
    CreatedResponse: class CreatedResponse extends BasicError{
        constructor(message) {
            super(message, 201);
        }
    },

    NoContentResponse: class NoContentResponse extends BasicError{
        constructor(message) {
            super(message, 204);
        }
    },

    NoModifiedError: class NoModifiedError extends BasicError{
        constructor(message) {
            super(message, 304);
        }
    },

    BadRequestError: class BadRequestError extends BasicError{
        constructor(message) {
            super(message || 'BAD_REQUEST', 400);
        }
    },

    RequiredValueError: class RequiredValueError extends BasicError{
        constructor(message) {
            super(!message ? 'RequiredValueError': 'required: [ '+message+' ]', 400);
        }
    },

    UnAuthorizedError: class UnAuthorizedError extends BasicError{
        constructor(message) {
            super(message || 'UNAUTHORIZED', 401);
        }
    },

    ForbiddenError: class ForbiddenError extends BasicError{
        constructor(message) {
            super(message || 'FORBIDDEN', 403);
        }
    },

    NotFoundError: class NotFoundError extends BasicError{
        constructor(message) {
            super(message || 'NOT_FOUND', 404);
        }
    },

    ConflictError: class ConflictError extends BasicError{
        constructor(message) {
            super(message || 'CONFLICT', 409);
        }
    },

    InternalServerError: class InternalServerError extends BasicError{
        constructor(message) {
            super(message, 500);
        }
    },

    ConflictError: class ConflictError extends BasicError{
        constructor(message) {
            super(message || 'CONFLICT', 409);
        }
    },

    ExpiredTokenError: class ExpiredTokenError extends BasicError{
        constructor(message) {
            super(message || 'Token is expired.', 401);
        }
    },
}