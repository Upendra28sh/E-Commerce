import multer from 'multer';
import uuid from 'uuid/v1';
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

let credentials = new AWS.SharedIniFileCredentials({
    profile: 'frnzy'
});
AWS.config.credentials = credentials;

var s3 = new AWS.S3();
export const uploadsToS3 = (file) => {
    return new Promise((resolve, reject) => {
        let temp = [];
        file.map((item) => {
            item.then((data) => {
                var params = {
                    Bucket: 'sellers.frnzy',
                    Key: uuid(),
                    Body: data.stream,
                    ACL: 'public-read'
                };
                s3.upload(params, function (err, data) {
                    if (err) {
                        console.log('error in callback');
                        reject(err);
                    }
                    console.log('success');
                    temp.push(data.Location);
                    if (temp.length == file.length) {
                        resolve(temp);
                    }

                });
            });

        });

    });


};

export const uploadToS3 = (filename, stream) => {
    var params = {
        Bucket: 'sellers.frnzy',
        Key: uuid(),
        Body: stream,
        ACL: 'public-read'
    };
    var url;
    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
            if (err) {
                console.log('error in callback');
                console.log(err);
                reject(err);
            }
            console.log('success');
            resolve(data.Location);
        });
    });


};

