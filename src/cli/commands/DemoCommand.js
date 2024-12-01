"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs/promises");
var path = require("path");
var DEFAULT_CONFIG = {
    pattern: /.*/,
    rootDir: process.cwd(),
    outputPath: "documentation.md",
    excludePatterns: ["node_modules/**", "**/dist/**", "**/*.test.ts"],
    maxFileSize: 1024 * 1024, // 1MB
    ignoreHidden: true,
};
// Tree visualization functions
var generateTreeSymbols = function (depth, isLast) {
    if (depth === 0)
        return "";
    return (isLast
        .slice(0, -1)
        .map(function (last) { return (last ? "    " : "│   "); })
        .join("") + (isLast[isLast.length - 1] ? "└── " : "├── "));
};
var createTreeNode = function (nodePath_1, config_1) {
    var args_1 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([nodePath_1, config_1], args_1, true), void 0, function (nodePath, config, relativePath) {
        var stats, name, entries, children, _a, entries_1, entry, childNode;
        if (relativePath === void 0) { relativePath = ""; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fs.stat(nodePath)];
                case 1:
                    stats = _b.sent();
                    name = path.basename(nodePath);
                    if (!shouldInclude(nodePath, config)) {
                        return [2 /*return*/, null];
                    }
                    if (!stats.isDirectory()) return [3 /*break*/, 7];
                    return [4 /*yield*/, fs.readdir(nodePath, { withFileTypes: true })];
                case 2:
                    entries = _b.sent();
                    children = [];
                    _a = 0, entries_1 = entries;
                    _b.label = 3;
                case 3:
                    if (!(_a < entries_1.length)) return [3 /*break*/, 6];
                    entry = entries_1[_a];
                    return [4 /*yield*/, createTreeNode(path.join(nodePath, entry.name), config, path.join(relativePath, name))];
                case 4:
                    childNode = _b.sent();
                    if (childNode)
                        children.push(childNode);
                    _b.label = 5;
                case 5:
                    _a++;
                    return [3 /*break*/, 3];
                case 6: return [2 /*return*/, {
                        name: name,
                        path: relativePath || name,
                        type: "directory",
                        children: children,
                    }];
                case 7:
                    if (isMatchingFile(nodePath, config)) {
                        return [2 /*return*/, {
                                name: name,
                                path: relativePath || name,
                                type: "file",
                                children: [],
                            }];
                    }
                    _b.label = 8;
                case 8: return [2 /*return*/, null];
            }
        });
    });
};
var renderTreeNode = function (node, isLast, result) {
    if (isLast === void 0) { isLast = []; }
    if (result === void 0) { result = []; }
    var prefix = generateTreeSymbols(isLast.length, isLast);
    result.push(prefix + node.name);
    if (node.type === "directory") {
        node.children.forEach(function (child, index) {
            renderTreeNode(child, __spreadArray(__spreadArray([], isLast, true), [index === node.children.length - 1], false), result);
        });
    }
    return result;
};
var isHidden = function (filePath) {
    var baseName = path.basename(filePath);
    return baseName.startsWith(".");
};
var shouldInclude = function (filePath, _a) {
    var excludePatterns = _a.excludePatterns, ignoreHidden = _a.ignoreHidden;
    // Check for hidden files if ignoreHidden is enabled
    if (ignoreHidden && isHidden(filePath)) {
        return false;
    }
    // Check against exclude patterns
    var isExcluded = excludePatterns.some(function (pattern) {
        return new RegExp(pattern.replace(/\*/g, ".*")).test(filePath);
    });
    return !isExcluded;
};
// Pure functions for file operations
var isMatchingFile = function (filePath, config) {
    if (!config.pattern) {
        throw new Error("Pattern is not defined in the config");
    }
    if (!shouldInclude(filePath, config)) {
        return false;
    }
    return config.pattern.test(filePath);
};
var formatSize = function (bytes) {
    var units = ["B", "KB", "MB", "GB"];
    var size = bytes;
    var unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return "".concat(size.toFixed(2), " ").concat(units[unitIndex]);
};
// Core file processing functions
function walkDirectory(dir) {
    return __asyncGenerator(this, arguments, function walkDirectory_1() {
        var entries, _i, entries_2, entry, fullPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __await(fs.readdir(dir, { withFileTypes: true }))];
                case 1:
                    entries = _a.sent();
                    _i = 0, entries_2 = entries;
                    _a.label = 2;
                case 2:
                    if (!(_i < entries_2.length)) return [3 /*break*/, 9];
                    entry = entries_2[_i];
                    fullPath = path.join(dir, entry.name);
                    if (!entry.isDirectory()) return [3 /*break*/, 5];
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(walkDirectory(fullPath))))];
                case 3: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 5: return [4 /*yield*/, __await(fullPath)];
                case 6: return [4 /*yield*/, _a.sent()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 2];
                case 9: return [2 /*return*/];
            }
        });
    });
}
var formatContentWithLineNumbers = function (content) {
    var lines = content.split("\n");
    var lineNumberWidth = lines.length.toString().length;
    return lines
        .map(function (line, index) {
        var lineNumber = (index + 1).toString().padStart(lineNumberWidth, " ");
        return "".concat(lineNumber, " | ").concat(line);
    })
        .join("\n");
};
// Markdown generation functions
var generateFileSection = function (file) { return "\n## File: ".concat(file.name, "\n- Path: `").concat(file.path, "`\n- Size: ").concat(formatSize(Number(file.size)), "\n- Extension: ").concat(file.ext, "\n- Lines of code: ").concat(file.lines, "\n- Content:\n\n```").concat(file.ext.slice(1) || "plaintext", "\n").concat(formatContentWithLineNumbers(file.content), "\n```\n\n---------------------------------------------------------------------------\n"); };
var generateMarkdownContent = function (files, treeContent) { return "\n# Code Documentation\nGenerated on: ".concat(new Date().toISOString(), "\nTotal files: ").concat(files.length, "\n\n## Project Structure\n\n```\n").concat(treeContent, "\n```\n\n").concat(files.map(generateFileSection).join("\n"), "\n"); };
// Main function
function generateDocumentation() {
    return __awaiter(this, arguments, void 0, function (userConfig) {
        var config, files, rootNode, treeContent, _a, _b, _c, filePath, stats, content, e_1_1, markdownContent, error_1;
        var _d, e_1, _e, _f;
        if (userConfig === void 0) { userConfig = {}; }
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 17, , 18]);
                    config = __assign(__assign({}, DEFAULT_CONFIG), userConfig);
                    files = [];
                    return [4 /*yield*/, createTreeNode(config.rootDir, config)];
                case 1:
                    rootNode = _g.sent();
                    treeContent = rootNode
                        ? renderTreeNode(rootNode).join("\n")
                        : "No matching files found";
                    _g.label = 2;
                case 2:
                    _g.trys.push([2, 9, 10, 15]);
                    _a = true, _b = __asyncValues(walkDirectory(config.rootDir));
                    _g.label = 3;
                case 3: return [4 /*yield*/, _b.next()];
                case 4:
                    if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                    _f = _c.value;
                    _a = false;
                    filePath = _f;
                    if (!isMatchingFile(filePath, config)) return [3 /*break*/, 7];
                    return [4 /*yield*/, fs.stat(filePath)];
                case 5:
                    stats = _g.sent();
                    if (!(stats.size <= config.maxFileSize)) return [3 /*break*/, 7];
                    return [4 /*yield*/, fs.readFile(filePath, "utf-8")];
                case 6:
                    content = _g.sent();
                    files.push({
                        name: path.basename(filePath),
                        path: filePath,
                        content: content,
                        ext: path.extname(filePath),
                        size: stats.size,
                        lines: content.split("\n").filter(function (line) { return line.trim() !== ""; })
                            .length,
                    });
                    _g.label = 7;
                case 7:
                    _a = true;
                    return [3 /*break*/, 3];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _g.trys.push([10, , 13, 14]);
                    if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _e.call(_b)];
                case 11:
                    _g.sent();
                    _g.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15:
                    markdownContent = generateMarkdownContent(files, treeContent);
                    return [4 /*yield*/, fs.writeFile(config.outputPath, markdownContent, "utf-8")];
                case 16:
                    _g.sent();
                    return [3 /*break*/, 18];
                case 17:
                    error_1 = _g.sent();
                    console.error("Error generating documentation", error_1);
                    throw error_1;
                case 18: return [2 /*return*/];
            }
        });
    });
}
if (require.main === module) {
    generateDocumentation({
        pattern: /\.ts$/,
        outputPath: "documentation.md",
        ignoreHidden: true,
        excludePatterns: [
            "node_modules/**",
            "**/dist/**",
            "coverage/**",
        ],
    }).catch(console.error);
}
