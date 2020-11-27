"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDateTime() {
    const date = new Date();
    const response = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return response;
}
/** Temp logging, should override form adapter's log */
class InternalLog {
    debug(...args) {
        console.log([`[debug] ${getDateTime()}: `, ...args]);
    }
    info(...args) {
        console.log([`[info] ${getDateTime()}: `, ...args]);
    }
    warning(...args) {
        console.warn([`[warning] ${getDateTime()}: `, ...args]);
    }
    warn(...args) {
        return this.warning(...args);
    }
    error(...args) {
        console.error([`[error] ${getDateTime()}: `, ...args]);
    }
}
let logger = new InternalLog();
exports.logger = logger;
function replaceLog(externalLog) {
    exports.logger = logger = externalLog;
}
exports.replaceLog = replaceLog;
function silence() {
    replaceLog({
        debug: () => null,
        info: () => null,
        warn: () => null,
        warning: () => null,
        error: () => null
    });
}
exports.silence = silence;
//# sourceMappingURL=log.js.map