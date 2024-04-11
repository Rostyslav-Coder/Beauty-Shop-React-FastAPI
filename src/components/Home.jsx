// ============ HOME PAGE COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import { ParallaxBanner, ParallaxBannerLayer, Parallax } from 'react-scroll-parallax';

import homeBG from '../assets/home/home-bg.jpg';
import goddess from '../assets/home/goddess.webp'
import threeGoddesses from '../assets/home/three-goddesses.webp'
import '../styles/Home.css';


const Home = () => {
	const [screenOrientation, setScreenOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
	const [goddessStyle, setGoddessStyle] = useState({});

	useEffect(() => {
		const timer = setTimeout(() => {
			setGoddessStyle({
				transition: '2s',
				transitionProperty: 'opacity, transform',
				opacity: '1',
				transformOrigin: 'bottom',
				transform: 'scale(1.2)',
			});
		}, 1500);

		const handleResize = () => {
			setScreenOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
		};

		window.addEventListener('resize', handleResize);

		return () => {
			clearTimeout(timer);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const imgSrc = (screenOrientation === 'landscape' ? threeGoddesses : goddess);

	return (
		<ParallaxBanner className='home'>
			<ParallaxBannerLayer
				className='home__bg'
				image={homeBG}
				speed={-25}
			/>
			<div className='home__img-wwrapper'>
				<img className='home__img' src={imgSrc} alt='goddesses' style={goddessStyle} />
			</div>
			<div className='home__title-block'>
				<h1 className='home__title'>
					Welcome to<br />
					<span>&quot;BEAUTY SHOP&quot;</span><br />
					&mdash; Your Sanctuary of Beauty and Well-being!
				</h1>
				<h2 className='home__subTitle'>
					Discover a place where harmony fills every corner, and each service is a masterpiece.
				</h2>
			</div>
			<Parallax speed={10}>
				<p className='home__text'>
					<strong>An Exclusive Experience </strong>
					&mdash; Our salon offers more than just beauty treatments; we provide a holistic approach to self-care. We create an ambiance where every client feels special and valued.
				</p>
				<p className='home__text'>
					<strong>Personalized Care </strong>
					&mdash; Your satisfaction is our top priority. We listen attentively to your wishes and aim to exceed expectations, offering services that are perfectly suited to you.
				</p>
				<p className='home__text'>
					<strong>Health and Eco-Friendliness </strong>
					&mdash; The health of our clients and the planet is at the heart of everything we do. By using top-quality products, we ensure the safety and effectiveness of our procedures.
				</p>
				<p className='home__text'>
					<strong>Expertise and Innovation </strong>
					&mdash; Our talented professionals continuously refine their skills and stay abreast of the latest beauty trends to offer you the most modern and effective solutions.
				</p>
				<p className='home__text'>
					<strong>Events and Promotions </strong>
					&mdash; We regularly host events and promotions so that every client can indulge in extra pleasures.
				</p>
				<p className='home__text'>
					<strong>Community and Connection </strong>
					&mdash; <span>BEAUTY SHOP</span> is not just about services; it&apos;s a community where everyone can find new friends, share their stories, and receive support.
				</p>
				<p className='home__text'>
					Come and let us take care of you, for every day is an opportunity to become even more beautiful. <strong>BEAUTY SHOP</strong> awaits you to create beauty stories together that will inspire you and those around you.
				</p>
			</Parallax>
		</ParallaxBanner>
	);
};

export default Home;
