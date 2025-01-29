import './Absences.css';

import Footer from "../components/Footer";
import Header from "../components/Header";


const Absences = () => {

	const students = [
		{
			id: 1,
			name: "John",
			surname: "Morris"
		},
		{
			id: 1,
			name: "John",
			surname: "Morris"
		},
		{
			id: 1,
			name: "John",
			surname: "Morris"
		},
		{
			id: 1,
			name: "John",
			surname: "Morris"
		},
	];

	const absences = [
		{
			id: 1,
			student: "John",
			fecha: '2025-01-01'
		},
		{
			id: 1,
			student: "John",
			fecha: '2025-01-01'
		},
		{
			id: 1,
			student: "John",
			fecha: '2025-01-01'
		},
		{
			id: 1,
			student: "John",
			fecha: '2025-01-01'
		},
	];

	const renderAbsences = () => {
		if (absences.length > 0) {
			return absences.map((item, index) => (
				<div className='absence-card' id={`absence-${item.id}`}>
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
				<option value={item.id}>{item.name} {item.surname}</option>
			));
		} else return [];
	}

	const handleDelete = (absence_id) => {
		console.log(absence_id);
		// TODO: send id to apollo
	};

	const handleSubmit = () => {
		const form = document.querySelector('#absence-form');
		// TODO: send form to apollo
	};

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
						<select className='select-student' required>
							{renderStudents()}
						</select>
						<input className='add-absence-form-element absence-input'
							type='date'
							name='date' />
						<input className='add-absence-form-element absence-input'
							type='time'
							name='time' />
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
