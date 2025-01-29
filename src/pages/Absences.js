import './Absences.css';

import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const STUDENTS_QUERY = gql`
	query Query {
		  obtenerAlumnos {
				  id
				  name
				  email
				  password
				  curso
				}
	}`;

const ABSENCES_QUERY = gql`
	query Query {
		  obtenerFaltas {
			  id
			  student
			  fecha
			}
	}
`;

const ADD_ABSENCE_MUTATION = gql`
	mutation Mutation($id: ID!, $fecha: String!) {
		  registrarFalta(studentId: $id, fecha: $fecha) {
				  fecha
				  id
				  studentid
				}
	}
`;

const DELETE_ABSENCE_MUTATION = gql`
	mutation Mutation($id: ID!){
	  eliminarFalta(id: $id)
	}
`;

const Absences = () => {

	const navigation = useNavigate();

	const [getStudents] = useLazyQuery(STUDENTS_QUERY, {
		onCompleted: (data) => {
			setStudents(data.obtenerAlumnos);
		},
		onError: (error) => {
			localStorage.removeItem('token');
			navigation('/');
		}
	});
	const [getAbsences] = useLazyQuery(ABSENCES_QUERY, {
		onCompleted: (data) => {
			setAbsences(data.obtenerFaltas);
		},
		onError: (error) => {
			console.log(error.message);
		}
	});

	const [date, setDate] = useState('');
	const [time, setTime] = useState('');

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const retrieveStudents = () => {
				getStudents({
					context: {
						headers: {
							authorization: `Bearer ${token}`
						}
					}
				});
			};

			const retrieveAbsences = () => {
				getAbsences({
					context: {
						headers: {
							authorization: `Bearer ${token}`
						}
					}
				});
			}
			retrieveStudents();
			retrieveAbsences();
		} else {
			navigation('/')
		}
	}, [navigation, getAbsences, getStudents]);

	const updateAbsences = () => {
		window.location.reload();
	}

	const [addAbsence] = useMutation(ADD_ABSENCE_MUTATION, {
		onCompleted: (data) => {
			window.location.reload();
		},
		onError: (error) => {
			console.log(error);
		}
	});
	const [deleteAbsence] = useMutation(DELETE_ABSENCE_MUTATION, {
		onCompleted: (data) => {
			updateAbsences();
		},
		onError: (error) => {
			console.log(error);
		}
	});

	const [students, setStudents] = useState([]);

	const [absences, setAbsences] = useState([]);

	const handleDelete = (absence_id) => {
		console.log(absence_id);
		// TODO: send id to apollo
		const token = localStorage.getItem('token');
		deleteAbsence({
			variables: {
				id: absence_id
			},
			context: {
				headers: {
					authorization: `Bearer ${token}`
				}
			}
		});
	};

	const handleSubmit = () => {
		// TODO: send form to apollo
		const token = localStorage.getItem('token');
		try {
			const fecha = date + (time !== '' ? 'T' + time + ':00' : '');
			const fecha_object = new Date(fecha);
			fecha_object.setTime(fecha_object.getTime() + (1 * 60 * 60 * 1000))
			const student_id = document.querySelector('.select-student').value;
			addAbsence({
				variables: {
					id: student_id,
					fecha: fecha_object.toISOString()
				},
				context: {
					headers: {
						authorization: `Bearer ${token}`
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	};

	const renderAbsences = () => {
		if (absences.length > 0) {
			return absences.map((item, index) => (
				<div key={index} className='absence-card' id={`absence-${item.id}`}>
					<span className='absence-field'>
						<b>Alumno:</b> {item.student}
					</span>
					<span className='absence-field'>
						<b>Fecha:</b> {item.fecha}
					</span>
					<span className='absence-field'>
						<button onClick={() => handleDelete(item.id)} className='delete-absence-button'>Eliminar</button>
					</span>
				</div>
			));
		} else return [];
	};

	const renderStudents = () => {
		if (students.length > 0) {
			return students.map((item, index) => (
				<option key={item.id} value={item.id}>{item.name} {item.surname}</option>
			));
		} else return [];
	}

	return (
		<div className='absences-page-container'>
			<Header />

			<section className='absences-section'>
				{renderAbsences()}
			</section>

			<section className='add-absence-section'>
				<div className='add-absence-card'>
					<h3 className='faltas-title'>Registrar Faltas</h3>
					<form className='add-absence-form add-absence-form-element' id='absence-form'>
						<select
							className='select-student'
							name='student_id'
							required>
							{renderStudents()}
						</select>
						<input className='add-absence-form-element absence-input'
							type='date'
							name='date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
						/>
						<input className='add-absence-form-element absence-input'
							type='time'
							name='time'
							value={time}
							onChange={(e) => setTime(e.target.value)}
							required
						/>
					</form>
					<div className='submit-button-wrapper'>
						<button
							className='submit-button'
							type='button'
							onClick={handleSubmit}>Registrar Falta</button>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
}

export default Absences;
