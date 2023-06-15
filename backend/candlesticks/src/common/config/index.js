const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    ...require('./app.config'),
    ...require('./db.config')
}