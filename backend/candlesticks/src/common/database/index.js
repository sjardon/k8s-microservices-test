const typeorm = require('typeorm');
const { db } = require('../config/index') 

const CandlestickStream = require('../../domain/candlesticks-streams/entities/candlestick-stream.entity')


var postgres = new typeorm.DataSource({
    type: "postgres",
    host: db.postgres.host,
    port: db.postgres.port,
    username: db.postgres.user,
    password: db.postgres.password,
    database: db.postgres.db,
    synchronize: true,
    entities: [CandlestickStream],
});

module.exports = { postgres }

