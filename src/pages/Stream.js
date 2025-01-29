import ReactHlsPlayer from 'react-hls-player/dist';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Stream.css';

const Stream = () => {
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
