enum LogLevel {
    DEBUG,
    INFO,
    WARN,
    ERROR,
    NONE,
}

const LOG_LEVEL: LogLevel = {
    DEBUG: LogLevel.DEBUG,
    INFO:  LogLevel.INFO,
    WARN:  LogLevel.WARN,
    ERROR: LogLevel.ERROR,
    NONE:  LogLevel.NONE,
}[process.env.LOG_LEVEL] ?? LogLevel.NONE;
// can't use Config.ts or else cyclic import

const debug = (...msg: any[]): void => {
    if (LOG_LEVEL <= LogLevel.DEBUG) {
        console.debug(`<🐞> ${new Date().toLocaleString()}:`, ...msg);
    }
};

const info = (...msg: any[]): void => {
    if (LOG_LEVEL <= LogLevel.INFO) {
        console.info(`<ℹ> ${new Date().toLocaleString()}:`, ...msg);
    }
};

const warn = (...msg: any[]): void => {
    if (LOG_LEVEL <= LogLevel.WARN) {
        console.warn(`<⚠️> ${new Date().toLocaleString()}:`, ...msg);
    }
};

const error = (...msg: any[]): void => {
    if (LOG_LEVEL <= LogLevel.ERROR) {
        console.error(`<❌> ${new Date().toLocaleString()}:`, ...msg);
    }
};

export default {debug, info, warn, error};
