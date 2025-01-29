import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Home.css';

const Home = () => {

	const navigate = useNavigate();

	const handleStudentLogin = () => {
		navigate("/student-login");
		console.log('Student login clicked');
	};

	const handleTeacherLogin = () => {
		navigate("/teacher-login");
		console.log('Teacher login clicked');
	};

	return (
		<div className="container">
			<Header />

			<main className="main">
				<h1 className="title">
					Welcome to <span className="title-highlight">AlmiPortal</span>
				</h1>
				<p className="subtitle">
					Inicia sesión como alumno o como profesor
				</p>

				<div className="login-container">
					<button className="login-card" onClick={handleStudentLogin}>
						<div className="icon-container">👥</div>
						<h2 className="card-title">Estudiantes</h2>
					</button>

					<button className="login-card" onClick={handleTeacherLogin}>
						<div className="icon-container">👨‍🏫</div>
						<h2 className="card-title">Profesores</h2>
					</button>
				</div>
			</main>

			<Footer />
		</div>
	);
};

export default Home;
