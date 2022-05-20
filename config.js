

let enviroments={}

enviroments.staging = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envname': "staging"

}

enviroments.production={
    "httpPort":8000,
    "httpsPort":8001,
    "envName":'production'

}


let currentEnviroment = typeof( process.env.NODE_ENV) == "string" ?  process.env.NODE_ENV.toLocaleLowerCase():'';


let enviromentsToExport = typeof(enviroments[currentEnviroment ])=="object" ? enviroments[currentEnviroment]: enviroments.staging;


module.exports = enviromentsToExport ;