// ============ SERVICES PAGE COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ParallaxBanner, Parallax } from 'react-scroll-parallax';

import simpleRequest from '../request/simpleRequest';
import '../styles/Services.css';


const Services = () => {
	const [professions, setProfessions] = useState([]);
	const [services, setServices] = useState([]);

	useEffect(() => {
		const PROFESSION_URL = '/professions/all';
		const SERVICES_URL = '/services/all_by_profesion';

		const fetchData = async () => {
			const professionResult = await simpleRequest(PROFESSION_URL);
			if (professionResult.error) {
				setProfessions([]);
			} else {
				setProfessions(professionResult.result);
				professionResult.result.forEach(async (profession) => {
					const serviceResult = await simpleRequest(SERVICES_URL, { profession_id: profession.id });
					if (serviceResult.error) {
						setServices(prevServices => ({ ...prevServices, [profession.id]: [] }));
					} else {
						setServices(prevService => ({ ...prevService, [profession.id]: serviceResult.result }));
					}
				})
			}
		}

		fetchData();
	}, []);

	return (
		<ParallaxBanner className='services'>
			<div className='services__title-block'>
				<h1 className='services__title'>
					Create Your Perfect Look.
				</h1>
				<h2 className='services__subTitle'>
					From manicures to massages, we&apos;ll help you look unparalleled.
				</h2>
			</div>
			{professions.map(profession => (
				<Parallax
					key={profession.id}
					className='services__card'
					speed={10}
					translateX={[20, -20]}
				>
					<h2>{profession.name} SERVICES:</h2>
					{services[profession.id]?.map(service => (
						<div key={service.id} className='services__service'>
							<h3>{service.name}</h3>
							<p>{service.description}</p>
							<p>Minimal price: $ {service.minPrice}</p>
							<Link
								className='services__button'
								to={'/offers'}
								state={{ serviceId: service.id }}
							>
								BOOK NOW
							</Link>
						</div>
					))}
				</Parallax>
			))}
			{/* <Routes>
				<Route
					path='offers'
					element={<Offers />}
					loader={async () => await Offers.fetchData()}
				/>
			</Routes> */}
		</ParallaxBanner>
	);
};

export default Services;
