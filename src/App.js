import React from "react";
import { ResumeProvider } from "./context/ResumeContext";
import SplitScreen from "./components/Layout/SplitScreen";

function App() {
	return (
		<ResumeProvider>
			<div className="App min-h-screen">
				<SplitScreen />
			</div>
		</ResumeProvider>
	);
}

export default App;
