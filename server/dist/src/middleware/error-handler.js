"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const zod_1 = require("zod");
function errorHandler(err, req, res, next) {
    if (err instanceof zod_1.ZodError) {
        console.error(err);
        return res.status(400).json({
            message: "Validation Error",
            errors: err.issues
        });
    }
    if (err instanceof Error) {
        console.error(err);
        return res.status(500).json({
            message: err.message
        });
    }
    console.error(err);
    return res.status(500).json({
        message: "Internal Server Error"
    });
}
//# sourceMappingURL=error-handler.js.map