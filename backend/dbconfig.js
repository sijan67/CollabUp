const config = {
    user: 'sa',
    password: 'collab',
    server: 'localhost\\SQLEXPRESS',
    database: 'collabUp',
    options: {
        trustServerCertificate: true,
        enableArithAbort: true
    },
    port: 1433
}

 module.exports = config;