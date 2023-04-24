const http = require('http');
const app = require('./app');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    (database = process.env.DB_NAME),
    (username = process.env.DB_USER),
    (password = process.env.DB_PASS),
    (options = {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    })
);

// Syncing to MySQL Database
const db = require('./models');
db.sequelize
    .sync()
    .then(() => {
        console.log('Synced db.');
    })
    .catch((error) => {
        console.log('Failed to sync db: ' + error.message);
    });

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.BACKEND_PORT) || 3001;
app.set('port', port);

const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

sequelize
    .authenticate()
    .then(() => {
        const server = http.createServer(app);
        server.on('error', errorHandler);
        server.on('listening', () => {
            const address = server.address();
            const bind =
                typeof address === 'string'
                    ? 'pipe ' + address
                    : 'port ' + port;
            console.log('Listening on ' + bind);
        });
        server.listen(port);
        console.log('Connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
