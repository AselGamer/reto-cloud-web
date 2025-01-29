import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import ReactHlsPlayer from 'react-hls-player/dist';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Stream.css';

const SESION_CHECK_QUERY = gql`
	query Query {
	  comprobarSesion
	}
`;

const Stream = () => {

	const navigation = useNavigate();

	const [sessionCheck] = useLazyQuery(SESION_CHECK_QUERY, {
		onError: (error) => {
			localStorage.removeItem('token');
			navigation('/');
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
			} else {
				navigation('/');
			}
		};

		checkAuth();
	}, [navigation, sessionCheck]);

	return (
		<div className="video-container-page">
			<Header />
			<div className="video-wrapper">
				<h1 className="video-title">Streaming de clase</h1>
				<div className="video-frame">
					<ReactHlsPlayer
						src={`http://${process.env.REACT_APP_OWNCAST_SERVER_URL}/hls/stream.m3u8`}
						className='video-placeholder'
						autoPlay={true}>
					</ReactHlsPlayer>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Stream;
