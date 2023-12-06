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

    debug(...args) {
        this.logger.debug(args);
    }

    info(...args) {
        this.logger.info(args);
    }

    error(...args) {
        this.logger.error(args);
    }

    warn(...args) {
        this.logger.warn(args);
    }
}

module.exports = new Log();