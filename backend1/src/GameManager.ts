import {WebSocket} from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./Messages"

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
       //stop the game as the user left
    }

    private addHandler(socket: WebSocket) {
       socket.on('message', (data) => {
        const message = JSON.parse(data.toString());

        if(message.type === INIT_GAME)
        {if(this.pendingUser) {
         // connect to the pending user and start the game
         const game = new Game(this.pendingUser, socket);
         this.pendingUser = null;
         this.games.push(game);
        }else{
         this.pendingUser = socket;
        }
       }


       if(message.type === MOVE)
       {
        const game = this.games.find((game) => game.getPlayer1() == socket || game.getPlayer2() == socket);
        
        if(game) {
            game.makeMove(socket, message.move);
        }

       }

     })
    }
}