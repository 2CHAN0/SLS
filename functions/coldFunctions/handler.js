module.exports.cold = async (event) => {
  console.log('event.source?? => ', event.source);
  if(event.source === 'serverless-plugin-warmup'){
    console.log('Warm Up - cold: Lambda is warm!');
  }
  console.log('normal execution');
  return {};

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
