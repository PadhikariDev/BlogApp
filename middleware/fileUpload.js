
import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('public', 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
})

const upload = multer({ storage: storage });

export default upload;