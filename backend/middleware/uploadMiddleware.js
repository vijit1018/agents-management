const multer = require('multer');

// Storage configuration
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
            cb(null, true);
        } else {
            cb(new Error('Only CSV files are allowed'), false);
        }
            }
});

module.exports = upload;