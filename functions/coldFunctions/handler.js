const {UnAuthorizedError, RequiredValueError} = require("../../common/errors/customError");
module.exports.coldHandler = async (event, context) => {
    throw new RequiredValueError('customId')
    return { result: 'Hello cold Lam bda!'}
};
