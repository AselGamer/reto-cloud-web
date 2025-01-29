import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {

	const handleEndSesion = () => {
		localStorage.removeItem('token');
	};

	return (
		<nav className="nav">
			<div className="nav-content">
				<Link to='/' className='link'>
					<div className="logo">
						<span className="logo-icon">📚</span>
						<span className="logo-text">AlmiPortal</span>
					</div>
				</Link>

				<Link to='/' onClick={handleEndSesion} className='link'>
					<b>
						Cerrar Sesion
					</b>
				</Link>
			</div>
		</nav>
	);
}

export default Header;
