import winston from "winston";

export const loggerOptions = {
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.json()
};

export const logger = winston.createLogger(loggerOptions);
