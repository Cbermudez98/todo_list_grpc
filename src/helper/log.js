const pino = require("pino");

class Log {
    logger = null;
    constructor() {
        this.logger = pino({
            transport: {
              target: 'pino-pretty'
            },
        });
    }

    info(...args) {
        this.logger.info(args);
    }

    error(args) {
        this.logger.error(args);
    }

    warn(...args) {
        this.logger.warn(args);
    }
}

module.exports = new Log();