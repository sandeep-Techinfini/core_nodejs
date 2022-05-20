const fs = require('fs');
const path = require('path');

let lib = {}



lib.baseDir = path.join(__dirname,"/../.data/")


lib.createDir = (dirName,callback)=>{
    let dir = path.join(lib.baseDir,'/',dirName)
    

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
    callback('directory created ')
}else{
    callback('directory already axist')
}
}


lib.create=(dir,file,data,callback)=>{
    console.log("++"+lib.baseDir+dir+"/"+file);
 fs.open(lib.baseDir+dir+"/"+file+".json",'w',(error,fileDescriptor)=>{
     if(!error && fileDescriptor){
        let stringData = JSON.stringify(data)
        console.log('::',fileDescriptor)
        fs.watchFile(fileDescriptor,stringData,(error)=>{
            if(!error){
                
                fs.close(fileDescriptor,()=>{
                    if(!error){
                    callback(false);
                    }else{
                     callback("error closing new file") ;
                    }
                })
              
            }
        else {
            callback("error creating to new file")

                }
            
        })
     }else{
         callback('could not create new file , it may already exist')
     }
 })


}

module.exports = lib;