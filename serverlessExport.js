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

    return result
};
