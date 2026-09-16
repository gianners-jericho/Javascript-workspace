module.exports = {

    port: process.env.PORT,

    session: {
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true
    },

    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    }
}