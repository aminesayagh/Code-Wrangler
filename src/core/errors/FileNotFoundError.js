"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotFoundError = void 0;
var DocumentError_1 = require("./DocumentError");
var FileNotFoundError = /** @class */ (function (_super) {
    __extends(FileNotFoundError, _super);
    function FileNotFoundError(path) {
        var _this = _super.call(this, "File not found", path) || this;
        _this.name = "FileNotFoundError";
        return _this;
    }
    return FileNotFoundError;
}(DocumentError_1.DocumentError));
exports.FileNotFoundError = FileNotFoundError;
