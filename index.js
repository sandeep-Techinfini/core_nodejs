const http =require("http")
const https = require("https")
const url = require("url");
let config = require("./config")
let fs = require("fs")
const StringDecoder = require('string_decoder').StringDecoder;




const httpServer = http.createServer((req,res)=>{
unifiedServer(req,res);
 
});     

httpServer.listen(config.httpPort,()=>{
    console.log("working on "+config.httpPort);

})
let httpsServerOptions ={
    "key": fs.readFileSync("./https/key.pem"),
    "cert": fs.readFileSync("./https/cert.pem")
}
const httpsServer = https.createServer(httpsServerOptions,(req,res)=>{
unifiedServer(req,res);

 
}); 


httpsServer.listen(config.httpsPort,()=>(
    console.log("working on "+config.httpsPort)
    
))


let unifiedServer = (req,res)=>{

    const parseurl = url.parse(req.url,true);
    const header= req.headers
    const method = req.method
    const trimpath= parseurl.path.replace(/^\/+|\/+$/g,"")
    const decoder = new StringDecoder("utf-8")
    let buffer = "";
     req.on("data",(data)=>{
         buffer += decoder.write(data)
         
     })
     req.on("end",()=>{
         buffer += decoder.end();
     console.log("Buffer:",buffer)
    
    // url path
    
         let chosenHandler =typeof(router[trimpath]) !== "undefined" ?router[trimpath]:handler.notFound;
         let data = {
             "trimpath":trimpath,
             "header":header,
             "payload":buffer,
             "method":method
         }
    
    chosenHandler(data,(statusCode,payload)=>{
        statusCode = typeof(statusCode)=="number"?statusCode:200;
    
        payload = typeof(payload) == "object" ? payload : {}
        // ***********************************************************************************************
    let payloadstring = JSON.stringify(payload);
    res.setHeader("Content-Type","application/json");
    res.writeHead(statusCode)  
    res.end(payloadstring); 
    console.log("URL: ",payloadstring.payload,trimpath);
    
    })
    
     })

}




let handler ={}

handler.sample =(data,callback)=>{
callback(408,data)
}
handler.notFound =(data,callback)=>{
callback(404)
}
 
let router = {
    "sample":handler.sample
}