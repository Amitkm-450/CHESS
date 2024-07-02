import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./screen/Landing";
import Game from "./screen/Game";


export default function App() {
  return (
	<div className="h-screen w-screen bg-slate-900">
      <BrowserRouter>
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/game" element={<Game />} />
		</Routes>
	  </BrowserRouter>
	</div>
    
  );
}