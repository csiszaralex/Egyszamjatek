"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const Content_1 = tslib_1.__importDefault(require("./Content"));
class Program {
    constructor() {
        http_1.default.createServer(new Content_1.default().content).listen(process.env.PORT || 8080);
    }
}
new Program();
//# sourceMappingURL=App.js.map