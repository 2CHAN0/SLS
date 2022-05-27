const shelljs = require('shelljs')
const fs = require('fs')
const YAML = require('yamljs')

const command = process.env.npm_lifecycle_event;

function connect(command, port){
    let commandScript = [];
    if(command === "offline") {
        commandScript.push(`sls offline -v --config-file ./serverlessExport.js`)
    }

    for (let i = 0; i <commandScript.length; i++) {
        shelljs.exec(commandScript[i], function (code, stdout, stderr){
            if(stderr){
                console.log(stderr)
            } else {
                console.log(stdout)
            }
        })
    }
}

connect(command, 3000);