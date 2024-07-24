import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./Messages";

export class Game{
    private player1: WebSocket;
    private player2: WebSocket;
    public board: Chess;
    private startTime: Date;
    
    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
           type: INIT_GAME,
           payload: {
            color: "white"
           }
        }))

        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
             color: "black"
            }
         }))
    }

    getPlayer1(): WebSocket {
        return this.player1;
    }

    getPlayer2(): WebSocket {
        return this.player2;
    }

    makeMove(socket: WebSocket, move: {
        from: string,
        to: string
    }) {
       
       console.log(this.board.history().length);
       if(this.board.history().length % 2 === 0 && socket !== this.player1) {
        return;
       }
       
       if(this.board.history().length % 2 === 1 && socket !== this.player2) {
        return;
       }
       
       try {
         console.log(move)
         this.board.move(move);
       } catch (error) {
          console.log("Error as invalid move")
          return
       }
       
       if(this.board.isGameOver()) {
         this.player1.send(JSON.stringify({
            type: GAME_OVER,
            payload: {
                winner: this.board.turn() === "w" ? "BLACK" : "WHITE"
            }
         }));
         this.player2.send(JSON.stringify({
            type: GAME_OVER,
            payload: {
                winner: this.board.turn() === "w" ? "BLACK" : "WHITE"
            }
         }));
       }
       
       if(this.board.history().length % 2 !== 0) {
           this.player2.send(JSON.stringify({
            type: MOVE,
            payload: move
           }))
       }else{
           this.player1.send(JSON.stringify({
            type: MOVE,
            payload: move
           }))
       }
    }
}