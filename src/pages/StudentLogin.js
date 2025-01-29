import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './StudentLogin.css';
import { useNavigate } from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';

const LOGIN_MUTATION = gql`
	mutation Mutation($email: String!, $password: String!) {
  		iniciarSesion(email: $email, password: $password) {
			token
			student {
			  id
			  email
			  name
			}
		  }
	}`;

const SESION_CHECK_QUERY = gql`
	query Query {
	  comprobarSesion
	}
`;

const StudentLogin = () => {

	const navigation = useNavigate();

	const [sessionCheck] = useLazyQuery(SESION_CHECK_QUERY, {
		onCompleted: (data) => {
			navigation('/stream');
		},
		onError: (error) => {
			localStorage.removeItem('token');
		},
	});

	useEffect(() => {
		const checkAuth = () => {
			// Check if user is already logged in
			const token = localStorage.getItem('token');

			if (token) {
				// User is already logged in, redirect to dashboard
				sessionCheck({
					context: {
						headers: {
							authorization: `Bearer ${token}`
						}
					}
				});
			}
		};

		checkAuth();
	}, [navigation, sessionCheck]);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [login] = useMutation(LOGIN_MUTATION, {
		onCompleted: (data) => {
			const { token } = data.iniciarSesion;
			localStorage.setItem('token', token);
			navigation('/stream');
		},
		onError: (error) => {
			console.log(error.message);
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Login attempted');

		try {
			await login({
				variables: {
					email,
					password
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="student-login-container">
			<Header />

			<section className="login-section">
				<div className="login-card">
					<div className="login-header">
						<h1 className="login-title">Login Estudiantes</h1>
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
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="form-input"
								placeholder="Introduce tu email"
								required
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="form-label">
								Contraseña
							</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="form-input"
								placeholder="Introduce tu contraseña"
								required
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

export default StudentLogin;
