"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = exports.LOG_VALUES = exports.LogLevel = void 0;
/* eslint-disable no-console */
var colors_1 = require("colors");
exports.LogLevel = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
};
exports.LOG_VALUES = Object.keys(exports.LogLevel);
var Logger = /** @class */ (function () {
    function Logger() {
        this.config = null;
    }
    Logger.load = function () {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    };
    Logger.prototype.setConfig = function (config) {
        this.config = config;
        return this;
    };
    Logger.prototype.setLogLevel = function (logLevel) {
        if (this.config) {
            this.config.set("logLevel", logLevel);
        }
        return this;
    };
    Object.defineProperty(Logger.prototype, "logLevel", {
        get: function () {
            var _a;
            var configLogLevel = (_a = this.config) === null || _a === void 0 ? void 0 : _a.get("logLevel");
            return configLogLevel ? exports.LogLevel[configLogLevel] : exports.LogLevel.ERROR;
        },
        enumerable: false,
        configurable: true
    });
    Logger.prototype.error = function (message, error) {
        var other = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            other[_i - 2] = arguments[_i];
        }
        if (this.logLevel >= exports.LogLevel.ERROR) {
            console.log.apply(console, __spreadArray([colors_1.default.red("[ERROR] ".concat(message))], other, false));
            if (error instanceof Error && error.stack) {
                console.log(colors_1.default.red(error.stack));
            }
        }
    };
    Logger.prototype.warn = function (message) {
        if (this.logLevel >= exports.LogLevel.WARN) {
            console.log(colors_1.default.yellow("[WARN] ".concat(message)));
        }
    };
    Logger.prototype.info = function (message) {
        if (this.logLevel >= exports.LogLevel.INFO) {
            console.log(colors_1.default.blue("[INFO] ".concat(message)));
        }
    };
    Logger.prototype.debug = function (message) {
        if (this.logLevel >= exports.LogLevel.DEBUG) {
            console.log(colors_1.default.gray("[DEBUG] ".concat(message)));
        }
    };
    Logger.prototype.success = function (message) {
        console.log(colors_1.default.green(message));
    };
    Logger.prototype.log = function (message) {
        console.log(message);
    };
    return Logger;
}());
exports.Logger = Logger;
exports.logger = Logger.load();
