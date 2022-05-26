import winston from 'winston';

const logger = winston.createLogger({
    level: 'silly',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        new winston.transports.Console()
    ],
});


export default logger;