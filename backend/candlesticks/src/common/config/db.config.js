module.exports = {
    db: {
        postgres: {
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            db: process.env.POSTGRES_DB,
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT
        }
    }
}