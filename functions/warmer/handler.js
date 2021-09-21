const AWS = require('aws-sdk');
const lambda = new AWS.Lambda({
    apiVersion: '2015-03-31',
    region: 'ap-northeast-2',
    httpOptions: {
        connectTimeout: 1000,
    },
});
//functions 정보에 대한 read 필요 , 1.enabled 여부  2.concurrency 지정  3.warmer 종류 선택
//1.람다는 전체 읽어오되, enable 체크하기,
//2.concurrency는 전체 설정에서 읽어오기
//3.payload는 고정
// name은 service:stage 만약 alias 걷어내면 람다 invokde시 Qualifier 삭제

const functions = [
    {
        "name": "cylee-service-app-dev-warm",
        "config":{
            "concurrency": 3,
            "payload": "{\"source\":\"serverless-plugin-warmup\"}"
        }
    },
    {
        "name": "cylee-service-app-dev-cold",
        "config":{
            "concurrency": 3,
            "payload": "{\"source\":\"serverless-plugin-warmup\"}"
        }
    }
];

function getConcurrency(func){
    return parseInt(func.config.concurrency);
}

module.exports.warmer = async(event, context) => {
    console.log('warmer started!');
    const invokes = await Promise.all(functions.map(async (func) => {
        const concurrency = getConcurrency(func);
        const clientContext = func.config.clientContext !== undefined ?
            func.config.clientContext : func.config.payload;
        const params = {
            ClientContext: clientContext ? Buffer.from(`{"custom":${clientContext}}`).toString('base64') : undefined,
            FunctionName: func.name,
            InvocationType: 'RequestResponse',
            LogType: 'None',
            Payload: func.config.payload,
            // Qualifier: 'dev',
        };

      try {
        await Promise.all(Array(concurrency).fill(0).map(async () => await lambda.invoke(params).promise()));
        console.log('Warm Up Invoke Success: ', params.FunctionName);
        return true;
      } catch (e){
        console.log('Warm Up Invoke Success: ', params.FunctionName, e);
        return false;
      }

    })); //end of invokes

}