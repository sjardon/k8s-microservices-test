const app = require('./app');
const config = require('./common/config');
const database = require('./common/database');

database.postgres.initialize().then(() => {
    console.log(`DB ready!`);
    const server = app.listen(config.app.port, () => {
        // logger.info(`Listening to port ${config.app.port}`);
        console.log(`Listening to port ${config.app.port}`)
    });
}).catch((error) => {
    console.log(`Could not connect to the DB!`);
    console.log(`Error: ${error.message}`);
});
