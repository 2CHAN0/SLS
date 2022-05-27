const MiddyWrapper = require('../common/middyWrapper');
const {warmHandler} = require('../functions/warmFunctions/handler');
const {coldHandler} = require('../functions/coldFunctions/handler');

module.exports = {
    warmHandler: MiddyWrapper(warmHandler),
    coldHandler: MiddyWrapper(coldHandler),
}