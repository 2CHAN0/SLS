module.exports.warm = async (event, context, callback) => {
    console.log('warm is called!')
    return {
    statusCode: 200,
    body: 'Warm lambda is called with json return object!'
    }
};
