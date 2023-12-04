const AWS = require('aws-sdk');

exports.uploadToS3 = (data, fileName) => {
    const BUCKET_NAME = process.env.BUCKET_NAME
    const IAM_USER_KEY = process.env.IAM_USER_KEY
    const IAM_USER_SECRET_KEY = process.env.IAM_USER_SECRET_KEY

    // initialize S3 bucket of AWS for storing data by creating its instance
    let s3BucketInstance = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET_KEY,
    })
    // create configuration to used for previously created bucket in S3 to store data in it
    let params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: "public-read"
    }

    return new Promise((resolve, reject) => {
        s3BucketInstance.upload(params, (err, s3Response) => {
            if (err) {
                reject(err);
            } else {
                resolve(s3Response.Location)
            }
        })
    })
}