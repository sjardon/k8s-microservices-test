const { EntitySchema } = require("typeorm")

module.exports = new EntitySchema({
    name: "CandlestickStream",
    tableName: "candlesticks_streams",
    columns: {
        id: {
            primary: true,
            type: "varchar",
            generated: 'uuid',
        },
        symbol: {
            type: "varchar",
        },
        interval: {
            type: "varchar",
        },
        status: {
            type: "varchar",
        },
        createdAt: {
            createDate: true
        },
        updatedAt: {
            updateDate: true
        }
    },
})