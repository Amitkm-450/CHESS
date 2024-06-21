import { Chess } from "chess.js";
import { WebSocket } from "ws";

export class Game{
    private player1: WebSocket;
    private player2: WebSocket;
    private board: Chess;
    // private moves: string[];
    private startTime: Date;
    
    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
    }

    getPlayer1(): WebSocket {
        return this.player1;
    }

    getPlayer2(): WebSocket {
        return this.player2;
    }

    makeMove(socket: WebSocket, move: string) {
       // validation of move
       //check if the move is of the user or not
       //make the move

       //update the board

       //send updaed board to both the users
    }
}