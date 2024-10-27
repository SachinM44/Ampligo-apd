const {exec} = require('child_process')
const fs= require('fs')
const path = require('path')
const mime=require('mime-types')
const {S3Client , PutObjectAclCommand, S3Client, PutObjectCommand}= require('@aws-sdk/client-s3')
const S3Client =new S3Client({
    region:'',
    Credential:{
        accessKeyId:0,
        secretAccessKey:0,
    }
})
const PROJECT_ID=process.env.PROJECT_ID;

async function init() {
    console.log('executing script.js')
    const outDirPath = path.join(__dirname, 'output')
    const p=exec(`cd ${outDirPath} && npm install && npm run build`)

    p.stdout.on('data', function(data){
        console.log(data.toString())
    })
    //(9-10) will show the output(installation process) while the (7) line is executing

    p.stdout.on('error',function(error){
        console.log('Error',data.toString())
    })
    p.on('close',async function(){
        console.log('Build Complete ')
        const distFolderPath=path.join(__dirname, 'dist')
        const distFolderContents =fs.readdirSync(distFolderPath, {recuresive:true})

        for(const filePath of distFolderContents ){
            if(fs.lstatSync(filePath).isDirectory()) continue;
         
            const cammand=new PutObjectCommand({
                Bucket:'',
                Key:`__output/${PROJECT_ID}/${filePath}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            })
            await S3Client.send(cammand)
        }
        console.log('Done....')
    })
}