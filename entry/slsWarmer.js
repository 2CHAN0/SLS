const MiddyWrapper = require('../common/middyWrapper');
const {warmHandler} = require('../functions/warmFunctions/handler');
const {coldHandler} = require('../functions/coldFunctions/handler');
const {postHandler} = require('../functions/warmFunctions/postHandler');

module.exports = {
    warmHandler: MiddyWrapper(warmHandler),
    coldHandler: MiddyWrapper(coldHandler),
    postHandler: MiddyWrapper(postHandler)
}