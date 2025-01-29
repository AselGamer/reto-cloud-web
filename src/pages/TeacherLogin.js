import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './TeacherLogin.css';
import { useNavigate } from 'react-router-dom';

const TeacherLogin = () => {

	const navigation = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Login attempted');

		navigation('/absences');
	};

	return (
		<div className="teacher-login-container">
			<Header />

			<section className="login-section">
				<div className="login-card">
					<div className="login-header">
						<h1 className="login-title">Login Profesores</h1>
						<p className="login-subtitle">Introduce tus credenciales</p>
					</div>

					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<input
								type="text"
								id="email"
								className="form-input"
								placeholder="Introduce tu email"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="form-label">
								Contraseña
							</label>
							<input
								type="password"
								id="password"
								className="form-input"
								placeholder="Introduce tu contraseña"
							/>
						</div>

						<a href="/forgot-password" className="forgot-password">
							Reestablecer contraseña?
						</a>

						<button type="submit" className="login-button">
							Iniciar Sesión
						</button>
					</form>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default TeacherLogin;
