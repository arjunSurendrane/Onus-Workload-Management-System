import S3 from 'aws-sdk/clients/s3.js'
import fs from 'fs'


const credentials = () => {

    const bucketName = process.env.AWS_BUCKET_NAME
    const region = process.env.AWS_BUCKET_REGION
    const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY
    const secretAccessKey = process.env.AWS_BUCKET_SECRET_KEY
    const s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey
    })
    return { bucketName, s3 }
}

// upload file into aws s3
export const uploadFile = (file) => {
    const fileStream = fs.createReadStream(file.path);
    const { bucketName, s3 } = credentials()
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise()
}





// download data from aws s3