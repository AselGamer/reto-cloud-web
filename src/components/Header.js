import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<nav className="nav">
			<div className="nav-content">
				<Link to='/' className='link'>
					<div className="logo">
						<span className="logo-icon">📚</span>
						<span className="logo-text">AlmiPortal</span>
					</div>
				</Link>
			</div>
		</nav>
	);
}

export default Header;
