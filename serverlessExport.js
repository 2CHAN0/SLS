const fs = require('fs');
const YAML = require('yamljs');

module.exports.functions = function(){
    let files = fs.readdirSync('./config')
        .filter(file => file.endsWith('yml'))
        .map(file => `./config/${file}`);

    //서비스별 람다 설정 읽어오기(cylee-service-serverless.yml)
    let result = files.map(path => fs.readFileSync(path, 'utf8'))
        .map(raw => YAML.parse(raw).functions)
        .reduce((result, functions) => {
            return Object.assign((result, functions));
        }, {});
    // console.log('==================yml에서 functions 긁은 결과==================', result);

    //1.functions config 포함한 넘겨서 warmer 파일 만들기
    // fuctions 샘플
    // const functions = [
    // {
    //     "name": "cylee-service-app-dev-warm",
    //     "config":{
    //         "concurrency": 3,
    //         "payload": "{\"source\":\"serverless-plugin-warmup\"}"
    //     }
    // }]
    // //2. warmer 파일에 대한 serverless 설정 만들어주기. result에 return 해주기.

    //객체를 Object.entries로 만들면, 배열로 바뀜,
    //key는 string으로 잡히고, child 오브젝트도 배열 요소로 바뀜.
    //...는 spread operator 혹은 rest로 사용됨
    //*중요, 여기서 ...는 spread 로 accum 기존 객체를 append 하는 것
    //reduce의 파라미터 앞부분은 누적객체의 형태, 뒷부분은 각 객체의 형태
    //*중요, reduce return 내용은 accum을 어떻게 할 건가에 대한 부분.
    //[warmerName]이 아니라 warmerName으로 하면 String으로 인식해서 같은 객체로 업데이트해서 결과가 하나만 나오게됨
    // const rst = Object.entries(result).reduce(
    //     (warmers, [warmerName, warmerConfig]) => ({
    //         ...warmers,  [warmerName]:warmerConfig
    //     })
    //     ,{}
    // );
    // console.log(rst)

    return result;
};