"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Messages_1 = require("./Messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    getPlayer1() {
        return this.player1;
    }
    getPlayer2() {
        return this.player2;
    }
    makeMove(socket, move) {
        if (this.board.history().length % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.board.history().length % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            console.log(move);
            this.board.move(move);
        }
        catch (error) {
            console.log("Error as invalid move");
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "BLACK" : "WHITE"
                }
            }));
            this.player2.send(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "BLACK" : "WHITE"
                }
            }));
        }
        if (this.board.history().length % 2 !== 0) {
            this.player2.send(JSON.stringify({
                type: Messages_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: Messages_1.MOVE,
                payload: move
            }));
        }
    }
}
exports.Game = Game;
