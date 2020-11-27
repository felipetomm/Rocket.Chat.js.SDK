import { ILogger } from '../config/driverInterfaces'

function getDateTime (): string {
  const date = new Date()
  const response = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  return response
}

/** Temp logging, should override form adapter's log */
class InternalLog implements ILogger {
  debug (...args: any[]) {
    console.log(...args)
  }
  info (...args: any[]) {
    console.log(...args)
  }
  warning (...args: any[]) {
    console.warn(...args)
  }
  warn (...args: any[]) { // legacy method
    return this.warning(...args)
  }
  error (...args: any[]) {
    console.error(...args)
  }
}

let logger: ILogger = new InternalLog()

function replaceLog (externalLog: ILogger) {
  logger = externalLog
}

function silence () {
  replaceLog({
    debug: () => null,
    info: () => null,
    warn: () => null,
    warning: () => null,
    error: () => null
  })
}

export {
  logger,
  replaceLog,
  silence
}
