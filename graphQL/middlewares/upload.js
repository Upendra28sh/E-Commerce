import multer from 'multer';
import uuid from 'uuid/v1';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

let credentials = new AWS.SharedIniFileCredentials({
    profile: 'frnzy'
});
AWS.config.credentials = credentials;

var s3 = new AWS.S3();
const uploadToS3 = (filename, stream) => {
    var params = {
        Bucket: 'sellers.frnzy',
        Key: filename,
        Body: stream,
        ACL: 'public-read'
    };
    var url;
    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                reject(err);
            }
            console.log('success');
            resolve(data.Location);
        })
    });


}

export default uploadToS3;