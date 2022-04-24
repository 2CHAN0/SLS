module.exports.cold = async (event, context, callback) => {
    callback(null, 'Hello cold Lambda!')
};
