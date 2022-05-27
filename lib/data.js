const { dir } = require('console');
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
 fs.open(lib.baseDir+dir+"/"+file+".json",'wx',(error,fileDescriptor)=>{
     if(!error && fileDescriptor){
        let stringData = JSON.stringify(data)
        console.log('::',fileDescriptor)
        fs.writeFile(fileDescriptor,stringData,(error)=>{
            if(!error){
                
                fs.close(fileDescriptor,(error)=>{
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
lib.read = (dir,file,callback)=>{
fs.readFile(lib.baseDir+dir+"/"+file+".json",'utf8',(error,data)=>{
callback(error,data);
})
}

lib.update=(dir,file,data,callback)=>{
    fs.open(lib.baseDir+dir+"/"+file+".json",'wx',(error,fileDescriptor)=>{
        if(!error && fileDescriptor){
           let stringData = JSON.stringify(data)


        }else{
            callback('could not Update thhe file , it may already exist')
        }
    });
    
}

module.exports = lib;