import { useNavigate } from "react-router-dom"


const Home = () => {
  const navigator = useNavigate()
  return (
    
      
   <div className="mt-2">
     <div className="flex flex-row items-center gap-3">
        <div>
          <img src="https://www.chess.com/bundles/web/images/offline-play/standardboard.1d6f9426.png" alt="chess_img" />
        </div>
        <div className="flex flex-col">
          <h2>Lets play the chess.</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded" onClick={() => navigator('/game')}>
            Join Game
          </button>
        </div>
     </div>
   </div>
  )
}

export default Home