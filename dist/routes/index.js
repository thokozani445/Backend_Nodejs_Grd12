"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Health check route
router.get("/health", (_, res) => {
    res.json({ status: "ok", uptime: process.uptime() });
});
exports.default = router;
