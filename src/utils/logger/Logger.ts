/* eslint-disable no-console */
import colors from "colors";
import { Config } from "../config/Config";

export const LogLevel = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
} as const;

type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];
export type LogLevelString = keyof typeof LogLevel;
export const LOG_VALUES = Object.keys(LogLevel) as LogLevelString[];

export class Logger {
  private static instance: Logger;
  private config: Config | null = null;

  private constructor() {}
  public static load(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }
  public setConfig(config: Config): Logger {
    this.config = config;
    return this;
  }
  public setLogLevel(logLevel: LogLevelString): Logger {
    if (this.config) {
      this.config.set("logLevel", logLevel);
    }
    return this;
  }

  private get logLevel(): LogLevel {
    const configLogLevel = this.config?.get("logLevel") as
      | LogLevelString
      | undefined;
    return configLogLevel ? LogLevel[configLogLevel] : LogLevel.ERROR;
  }

  public error(message: string, error?: Error, ...other: unknown[]): void {
    if (this.logLevel >= LogLevel.ERROR) {
      console.log(colors.red(`[ERROR] ${message}`), ...other);
      if (error instanceof Error && error.stack) {
        console.log(colors.red(error.stack));
      }
    }
  }

  public warn(message: string): void {
    if (this.logLevel >= LogLevel.WARN) {
      console.log(colors.yellow(`[WARN] ${message}`));
    }
  }

  public info(message: string): void {
    if (this.logLevel >= LogLevel.INFO) {
      console.log(colors.blue(`[INFO] ${message}`));
    }
  }

  public debug(message: string): void {
    if (this.logLevel >= LogLevel.DEBUG) {
      console.log(colors.gray(`[DEBUG] ${message}`));
    }
  }

  public success(message: string): void {
    console.log(colors.green(message));
  }

  public log(message: string): void {
    console.log(message);
  }
}

export const logger = Logger.load();
