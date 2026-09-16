module.exports = {

    port: 8000,

    session: {
        secret: 'mvcsecret',
        resave: false,
        saveUninitialized: true
    },

    database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mvc_users',
        port: 3306
    }
}
