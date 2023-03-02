const fs = require('fs');
const path = require('path');

const lib = {};

lib.basedir = path.join(__dirname, './../database/');

lib.create = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);

            fs.writeFile(fileDescriptor, stringData, (err3) => {
                if (!err3) {
                    fs.close(fileDescriptor, (error) => {
                        if (!error) {
                            callback(false);
                        } else {
                            callback('Error closing the new file!');
                        }
                    });
                } else {
                    callback('Error Writing file!');
                }
            });
        } else {
            callback('Could not create new file, it exists!');
        }
    });
};

lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            const stringData = JSON.stringify(data);

            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback('Error closing file!');
                                }
                            });
                        } else {
                            callback('Error writing to file!');
                        }
                    });
                } else {
                    console.log('Error truncating fil');
                }
            });
        } else {
            console.log('Error updaing, file may not exists');
        }
    });
};

lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('Error Deleting file');
        }
    });
};

module.exports = lib;
