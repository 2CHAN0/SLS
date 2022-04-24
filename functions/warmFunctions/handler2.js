module.exports.warm2 = async (event, context, callback) => {
    console.log('warm2 is called!')
    return {
    statusCode: 200,
    body: 'Warm2 lambda is called with json return object!'
    }
};
