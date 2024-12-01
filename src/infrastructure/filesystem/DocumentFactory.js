"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentFactory = void 0;
var fs = require("fs/promises");
var fsSync = require("fs");
var path = require("path");
var errors_1 = require("../../core/errors");
var type_1 = require("../../types/type");
exports.DocumentFactory = {
    VERSION: "1.0.0",
    /**
     * Gets the type of a file system entry
     * @param filePath - The path to check
     * @returns The type of the file system entry (File or Directory)
     * @throws {FileNotFoundError} If the path doesn't exist
     * @throws {DocumentError} For other file system errors
     */
    type: function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var stats, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.stat(filePath)];
                    case 1:
                        stats = _a.sent();
                        return [2 /*return*/, stats.isDirectory() ? type_1.FileType.Directory : type_1.FileType.File];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1.code === "ENOENT") {
                            throw new errors_1.FileNotFoundError(filePath);
                        }
                        throw new errors_1.DocumentError(String(error_1), filePath);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Gets file size in bytes
     * @param filePath - The path to the file
     * @returns The size of the file in bytes
     * @throws {FileNotFoundError} If the file doesn't exist
     * @throws {DocumentError} For other file system errors or if path is a directory
     */
    size: function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var isDirectory, stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.type(filePath)];
                    case 1:
                        isDirectory = (_a.sent()) === type_1.FileType.Directory;
                        if (isDirectory) {
                            throw new errors_1.DocumentError("Path is a directory", filePath);
                        }
                        return [4 /*yield*/, this.getStats(filePath)];
                    case 2:
                        stats = _a.sent();
                        return [2 /*return*/, stats.size];
                }
            });
        });
    },
    /**
     * Resolves a path to an absolute path
     * @param filePath - The path to resolve
     * @returns The absolute path
     */
    resolve: function (filePath) {
        return path.resolve(filePath);
    },
    /**
     * Gets detailed file statistics
     * @param filePath - The path to get stats for
     * @returns Detailed file statistics including size, dates, and permissions
     * @throws {FileNotFoundError} If the path doesn't exist
     * @throws {DocumentError} For other file system errors
     */
    getStats: function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var stats, accessFlags, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fs.stat(filePath)];
                    case 1:
                        stats = _a.sent();
                        return [4 /*yield*/, this.checkAccess(filePath)];
                    case 2:
                        accessFlags = _a.sent();
                        return [2 /*return*/, {
                                size: stats.size,
                                created: stats.birthtime,
                                modified: stats.mtime,
                                accessed: stats.atime,
                                isDirectory: stats.isDirectory(),
                                isFile: stats.isFile(),
                                permissions: {
                                    readable: accessFlags.readable,
                                    writable: accessFlags.writable,
                                    executable: accessFlags.executable,
                                },
                            }];
                    case 3:
                        error_2 = _a.sent();
                        if (error_2.code === "ENOENT") {
                            throw new errors_1.FileNotFoundError(filePath);
                        }
                        throw new errors_1.DocumentError(String(error_2), filePath);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Checks various access flags for a path
     * @private
     * @param filePath - The path to check access for
     * @returns An object containing readable, writable, and executable permission flags
     */
    checkAccess: function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var check;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        check = function (mode) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, fs.access(filePath, mode)];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/, true];
                                    case 2:
                                        _a = _b.sent();
                                        return [2 /*return*/, false];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); };
                        _a = {};
                        return [4 /*yield*/, check(fs.constants.R_OK)];
                    case 1:
                        _a.readable = _b.sent();
                        return [4 /*yield*/, check(fs.constants.W_OK)];
                    case 2:
                        _a.writable = _b.sent();
                        return [4 /*yield*/, check(fs.constants.X_OK)];
                    case 3: return [2 /*return*/, (_a.executable = _b.sent(),
                            _a)];
                }
            });
        });
    },
    /**
     * Reads the entire contents of a file synchronously
     * @param filePath - The path to the file
     * @param options - The options for the read operation
     * @returns The contents of the file as a string
     * @throws {Error} If the file cannot be read
     */
    readFileSync: function (filePath, options) {
        var _a;
        if (options === void 0) { options = {}; }
        return fsSync.readFileSync(filePath, {
            encoding: (_a = options.encoding) !== null && _a !== void 0 ? _a : "utf-8",
            flag: options.flag,
        });
    },
    readJsonSync: function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var absolutePath, fileContents, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        absolutePath = this.resolve(filePath);
                        // Check if file exists first
                        if (!this.exists(absolutePath)) {
                            throw new Error("File not found: ".concat(absolutePath));
                        }
                        return [4 /*yield*/, fs.readFile(absolutePath, "utf-8")];
                    case 1:
                        fileContents = _a.sent();
                        if (!fileContents) {
                            throw new Error("File is empty: ".concat(absolutePath));
                        }
                        try {
                            return [2 /*return*/, JSON.parse(fileContents)];
                        }
                        catch (parseError) {
                            throw new Error("Invalid JSON in file ".concat(absolutePath, ": ").concat(String(parseError)));
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw new errors_1.DocumentError(String(error_3), filePath);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Reads the entire contents of a file
     * @param filePath - The path to the file
     * @param options - The options for the read operation
     * @returns The contents of the file as a string
     * @throws {FileNotFoundError} If the file doesn't exist
     * @throws {DocumentError} For other file system errors
     */
    readFile: function (filePath_1) {
        return __awaiter(this, arguments, void 0, function (filePath, options) {
            var error_4;
            var _a;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.readFile(filePath, {
                                encoding: (_a = options.encoding) !== null && _a !== void 0 ? _a : "utf-8",
                                flag: options.flag,
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        error_4 = _b.sent();
                        if (error_4.code === "ENOENT") {
                            throw new errors_1.FileNotFoundError(filePath);
                        }
                        throw new errors_1.DocumentError(String(error_4), filePath);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Writes data to a file, replacing the file if it already exists
     * @param filePath - The path to the file
     * @param data - The data to write
     * @param options - The options for the write operation
     * @throws {DocumentError} For file system errors
     */
    writeFile: function (filePath_1, data_1) {
        return __awaiter(this, arguments, void 0, function (filePath, data, options) {
            var error_5;
            var _a;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.writeFile(filePath, data, {
                                encoding: (_a = options.encoding) !== null && _a !== void 0 ? _a : "utf-8",
                                mode: options.mode,
                                flag: options.flag,
                            })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        throw new errors_1.DocumentError(String(error_5), filePath);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Appends data to a file
     * @param filePath - The path to the file
     * @param content - The content to append
     * @param options - The options for the write operation
     * @throws {DocumentError} For file system errors
     */
    appendFile: function (filePath_1, content_1) {
        return __awaiter(this, arguments, void 0, function (filePath, content, options) {
            var error_6;
            var _a;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.appendFile(filePath, content, {
                                encoding: (_a = options.encoding) !== null && _a !== void 0 ? _a : "utf-8",
                                mode: options.mode,
                                flag: options.flag,
                            })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _b.sent();
                        throw new errors_1.DocumentError(String(error_6), filePath);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Reads the contents of a directory
     * @param dirPath - The path to the directory
     * @param options - The options for the read operation
     * @returns An array of file and directory names in the directory
     * @throws {Error} If the directory cannot be read
     */
    readDir: function (dirPath, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.readdir(dirPath, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    /**
     * Creates a directory if it doesn't exist
     * @param dirPath - The path where to create the directory
     * @param recursive - Whether to create parent directories if they don't exist
     * @throws {DocumentError} For file system errors
     */
    createDir: function (dirPath_1) {
        return __awaiter(this, arguments, void 0, function (dirPath, recursive) {
            if (recursive === void 0) { recursive = true; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.mkdir(dirPath, { recursive: recursive })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Gets the base name of a file
     * @param filePath - The path to the file
     * @returns The base name of the file (last portion of the path)
     */
    baseName: function (filePath) {
        return path.basename(filePath);
    },
    /**
     * Gets the extension of a file
     * @param filePath - The path to the file
     * @returns The extension of the file including the dot (e.g., '.txt')
     */
    extension: function (filePath) {
        return path.extname(filePath);
    },
    /**
     * Checks if a file or directory exists
     * @param filePath - The path to check
     * @returns True if the file or directory exists, false otherwise
     */
    exists: function (filePath) {
        try {
            fsSync.accessSync(filePath);
            return true;
        }
        catch (_a) {
            return false;
        }
    },
    /**
     * Checks if a path is absolute
     * @param filePath - The path to check
     * @returns True if the path is absolute, false otherwise
     */
    isAbsolute: function (filePath) {
        return path.isAbsolute(filePath);
    },
    /**
     * Gets directory contents with type information
     * @param dirPath - The path to the directory
     * @returns An array of objects containing name and type information for each entry
     * @throws {DocumentError} If path is not a directory or other errors occur
     */
    readDirectory: function (dirPath) {
        return __awaiter(this, void 0, void 0, function () {
            var entries, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.readdir(dirPath, { withFileTypes: true })];
                    case 1:
                        entries = _a.sent();
                        return [2 /*return*/, entries.map(function (entry) { return ({
                                name: entry.name,
                                type: entry.isDirectory() ? type_1.FileType.Directory : type_1.FileType.File,
                            }); })];
                    case 2:
                        error_7 = _a.sent();
                        throw new errors_1.DocumentError(String(error_7), dirPath);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Creates a directory if it doesn't exist
     * @param dirPath - The path where to create the directory
     * @param options - Options for directory creation including recursive and mode
     * @throws {DocumentError} For file system errors
     */
    ensureDirectory: function (dirPath_1) {
        return __awaiter(this, arguments, void 0, function (dirPath, options) {
            var error_8;
            var _a;
            if (options === void 0) { options = {}; }
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        if (!!this.exists(dirPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs.mkdir(dirPath, {
                                recursive: (_a = options.recursive) !== null && _a !== void 0 ? _a : true,
                                mode: options.mode,
                            })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        error_8 = _b.sent();
                        throw new errors_1.DocumentError(String(error_8), dirPath);
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Removes a file or directory
     * @param filePath - The path to remove
     * @throws {DocumentError} For file system errors
     */
    remove: function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.stat(filePath)];
                    case 1:
                        stats = _a.sent();
                        if (!stats.isDirectory()) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs.rm(filePath, { recursive: true, force: true })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, fs.unlink(filePath)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Copies a file or directory
     * @param src - The source path
     * @param dest - The destination path
     * @throws {DocumentError} For file system errors
     */
    copy: function (src, dest) {
        return __awaiter(this, void 0, void 0, function () {
            var stats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.stat(src)];
                    case 1:
                        stats = _a.sent();
                        if (!stats.isDirectory()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.copyDir(src, dest)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, fs.copyFile(src, dest)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Copies a directory recursively
     * @private
     * @param src - The source directory path
     * @param dest - The destination directory path
     * @throws {DocumentError} For file system errors
     */
    copyDir: function (src, dest) {
        return __awaiter(this, void 0, void 0, function () {
            var entries, _i, entries_1, entry, srcPath, destPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ensureDirectory(dest)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fs.readdir(src, { withFileTypes: true })];
                    case 2:
                        entries = _a.sent();
                        _i = 0, entries_1 = entries;
                        _a.label = 3;
                    case 3:
                        if (!(_i < entries_1.length)) return [3 /*break*/, 8];
                        entry = entries_1[_i];
                        srcPath = path.join(src, entry.name);
                        destPath = path.join(dest, entry.name);
                        if (!entry.isDirectory()) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.copyDir(srcPath, destPath)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, fs.copyFile(srcPath, destPath)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 3];
                    case 8: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Joins an array of paths into a single path
     * @param paths - The paths to join
     * @returns The joined path
     */
    join: function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return path.join.apply(path, paths);
    },
};
