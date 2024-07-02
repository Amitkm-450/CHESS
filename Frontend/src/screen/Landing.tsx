import { useNavigate } from "react-router-dom"


const Landing = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-center">
              <img src={"/chess.png"} className="max-w-96 " alt="chess" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                Play chess game
              </h1>
              <p className="text-lg mt-2 text-white">Play chess with your friends</p>
              <div className="mt-4">
                <button className="bg-blue-400
                hover:bg-blue-700 text-white font-bold py-2 px-4
                 rounded" onClick={() => {navigate('/game')}}>
                 Play
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Landing