import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { Button } from "antd";
import "./App.css";
import { useEffect } from "react";

function Hello() {
	useEffect(() => {
		window.api.onPong((data: ReturnType<Window["api"]["onPong"]>) => {
			console.log("answer is:", data);
		});
	}, []);

	return (
		<div className="flex w-screen h-screen flex-col justify-center gap-1 items-center">
			<h1 className="text-green-500 font-bold">Hello World!</h1>

			<Button
				onClick={() => window.api.sendPing("My message to Main process!")}
				className="bg-[#1677ff]"
				type="primary"
			>
				send ping
			</Button>
			<br></br>
			<Button onClick={() => window.api.removePong()} className="bg-[#1677ff]" type="primary">
				remove all ping listeners
			</Button>
		</div>
	);
}

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Hello />} />
			</Routes>
		</Router>
	);
}
