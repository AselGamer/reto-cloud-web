import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Absences from "./pages/Absences";

import Home from "./pages/Home";
import Stream from "./pages/Stream";
import StudentLogin from "./pages/StudentLogin";
import TeacherLogin from "./pages/TeacherLogin";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/student-login" element={<StudentLogin />} />
				<Route path="/teacher-login" element={<TeacherLogin />} />
				<Route path="/stream" element={<Stream />} />
				<Route path="/absences" element={<Absences />} />
			</Routes>
		</Router>
	);
}
