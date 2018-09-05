import multer from 'multer';
import uuid from 'uuid/v1' ;
import AWS from 'aws-sdk' ;
import multerS3 from 'multer-s3' ;

let credentials = new AWS.SharedIniFileCredentials({profile: 'frnzy'});
AWS.config.credentials = credentials;

var s3 = new AWS.S3();

let s3Storage = multerS3({
    s3: s3,
    bucket: 'iosd-uploads',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE ,
    metadata: function (req, file, cb) {
        console.log(file);
        cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
        // cb(null, Date.now().toString());
        console.log(file.originalname);
        let newFileName = uuid();
        let patt1 = /\.[0-9a-z]{1,5}$/i;
        let match = file.originalname.match(patt1);
        if (match) {
            newFileName += match;
        }
        cb(null, newFileName);

    }

});

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        console.log(file.originalname);
        let newFileName = uuid();
        let patt1 = /\.[0-9a-z]{1,5}$/i;
        let match = file.originalname.match(patt1);
        if (match) {
            newFileName += match;
        }
        callback(null, newFileName);
    }
});

const upload = multer({storage: s3Storage}).single('file');

export default upload;