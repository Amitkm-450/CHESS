"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moveSchema = new mongoose_1.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    player: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const gameSchema = new mongoose_1.Schema({
    player1SocketId: { type: String, required: true },
    player2SocketId: { type: String, required: true },
    moves: [moveSchema],
    createdAt: { type: Date, default: Date.now }
});
const GameModel = (0, mongoose_1.model)('GameDB', gameSchema);
exports.default = GameModel;
