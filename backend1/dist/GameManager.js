"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const Messages_1 = require("./Messages");
class GameManager {
    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter((user) => user !== socket);
        //stop the game as the user left
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === Messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    // connect to the pending user and start the game
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.pendingUser = null;
                    this.games.push(game);
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === Messages_1.MOVE) {
                const game = this.games.find((game) => game.getPlayer1() == socket || game.getPlayer2() == socket);
                if (game) {
                    game.makeMove(socket, message.payload.move);
                }
                else {
                    console.log("You are not connected to anyone");
                }
            }
            if (message.type === Messages_1.GAME_OVER) {
                console.log("Gaem over");
            }
        });
    }
}
exports.GameManager = GameManager;
