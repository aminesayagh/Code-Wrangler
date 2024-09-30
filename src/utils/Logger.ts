import chalk from "chalk";

export const LogLevel = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3
} as const;

type LogLevel = typeof LogLevel[keyof typeof LogLevel];
export type LogLevelString = keyof typeof LogLevel;
export const LOG_VALUES = Object.keys(LogLevel) as LogLevelString[];

export class Logger {
    private static instance: Logger;
    private loglevel: LogLevel;

    private constructor(loglevel: LogLevel = LogLevel.INFO) {
        this.loglevel = loglevel;
    }
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    public setLogLevel(logLevel: LogLevel) {
        this.loglevel = logLevel;
    }
    public error(message: string) {
        if (this.loglevel >= LogLevel.ERROR) {
            console.log(chalk.red(`[${LogLevel.ERROR}] ${message}`));
        }
    }
    public warn(message: string) {
        if (this.loglevel >= LogLevel.WARN) {
            console.log(chalk.yellow(`[${LogLevel.WARN}] ${message}`));
        }
    }
    public info(message: string) {
        if (this.loglevel >= LogLevel.INFO) {
            console.log(chalk.blue(`[${LogLevel.INFO}] ${message}`));
        }
    }
    public debug(message: string) {
        if (this.loglevel >= LogLevel.DEBUG) {
            console.log(chalk.gray(`[${LogLevel.DEBUG}] ${message}`));
        }
    }
    public success(message: string) {
        console.log(chalk.green(message));
    }
    public log(message: string) {
        console.log(message);
    }
}

export const logger = Logger.getInstance();