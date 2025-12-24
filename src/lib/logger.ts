import winston from 'winston';

let loggerInstance: winston.Logger | undefined;

const getLogger = () => {
  if (!loggerInstance) {
    loggerInstance = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [new winston.transports.Console()],
    });
  }
  return loggerInstance;
};

const logger = new Proxy({} as winston.Logger, {
  get: (_target, prop) => {
    return getLogger()[prop as keyof winston.Logger];
  },
});

export default logger;
