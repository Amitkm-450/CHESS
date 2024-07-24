import { useEffect, useState } from "react";
import Buttons from "../component/Buttons";
import ChessBoard from "../component/ChessBoard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";



const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board())
  const [started, setStarted] = useState(false)
  

  useEffect(() => {
    if(!socket) 
      return
    
    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(message);

      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true)
          console.log(INIT_GAME)
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    }
  }, [socket]);

  if(!socket) return  <div>Connecting....</div>
  return (
    <div className="flex justify-center ">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4
        w-full ">
          <div className="col-span-4 
          w-full flex justify-center">
            <ChessBoard chess={chess} setBoard={setBoard} board = {board} socket={socket}/>
          </div>
          <div className="col-span-2  flex justify-center items-center">
            {!started && (<Buttons onClick={() => {
              socket.send(JSON.stringify({
                type: INIT_GAME
              }))
            }}>
                Play
            </Buttons>)}
          </div>
        </div>
         
      </div>
      
    </div>
  )
}

export default Game