import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Stream from "./pages/Stream";
import StudentLogin from "./pages/StudentLogin";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/student-login" element={<StudentLogin />} />
				<Route path="/stream" element={<Stream />} />
			</Routes>
		</Router>
	);
}
