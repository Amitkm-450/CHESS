import {WebSocket} from "ws";
import { Game } from "./Game";
import { GAME_OVER, INIT_GAME, MOVE } from "./Messages"

export class GameManager{
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }

    addUser(socket: WebSocket) {
         this.users.push(socket);
         this.addHandler(socket);
    }

    removeUser(socket: WebSocket) {
        this.users = this.users.filter((user: WebSocket) => user !== socket);

        if (this.pendingUser === socket) {
            this.pendingUser = null;
        }

        const game = this.games.find(
            (g) => g.getPlayer1() === socket || g.getPlayer2() === socket
        );
        if (game) {
            const opponent =
                game.getPlayer1() === socket ? game.getPlayer2() : game.getPlayer1();
            const winner = game.getPlayer1() === socket ? "BLACK" : "WHITE";
            try {
                opponent.send(
                    JSON.stringify({ type: GAME_OVER, payload: { winner } })
                );
            } catch {
                console.log("Failed to notify opponent — socket likely closed");
            }
            this.games = this.games.filter((g) => g !== game);
        }
    }

    private addHandler(socket: WebSocket) {
       socket.on('message', (data) => {

        let message: any;
        try {
            message = JSON.parse(data.toString());
        } catch {
            console.warn("Dropped malformed JSON frame");
            return;
        }

        if (message.type === INIT_GAME) {
            if (this.pendingUser === socket) {
                console.log("Ignoring init_game: socket is already waiting");
                return;
            }
            const alreadyInGame = this.games.some(
                (g) => g.getPlayer1() === socket || g.getPlayer2() === socket
            );
            if (alreadyInGame) {
                console.log("Ignoring init_game: socket is already in a game");
                return;
            }

            if (this.pendingUser) {
                const game = new Game(this.pendingUser, socket);
                this.pendingUser = null;
                this.games.push(game);
            } else {
                this.pendingUser = socket;
            }
        }
        if (message.type === MOVE) {
            const game = this.games.find(
                (g) => g.getPlayer1() === socket || g.getPlayer2() === socket
            );

            if (game) {
                game.makeMove(socket, message.payload.move);
                if (game.board.isGameOver()) {
                    this.games = this.games.filter((g) => g !== game);
                }
            } else {
                console.log("You are not connected to anyone");
            }
        }

       if(message.type === GAME_OVER) {
        console.log("Gaem over")
       }
     })
    }
}