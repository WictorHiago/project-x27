const path = require('path');

module.exports = {
    port: process.env.PORT || 3000,
    viewsPath: path.join(__dirname, '../../frontend/views'),
    publicPath: path.join(__dirname, '../../frontend/public'),
    stylesPath: path.join(__dirname, '../../frontend/styles'),
    database: {
        path: path.join(__dirname, '../database')
    },
    logs: {
        path: path.join(__dirname, '../logs')
    }
};
