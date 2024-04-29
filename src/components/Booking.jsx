// ============ BOOKING COMPONENT MODULE  ============ //

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import simpleRequest from '../request/simpleRequest';
import sendRequest from '../request/request';
import '../styles/Booking.css';


// ! Validated Component
const Booking = () => {
	const [booking, setBooking] = useState(null);
	const [freeSlots, setFreeSlots] = useState([]);
	const [error, setError] = useState(null);
	const offerId = useLocation().state.offerId;
	const navigate = useNavigate();

	useEffect(() => {
		const REQUEST_URL = '/bookings/free_slots';
		const data = { offer_id: offerId };

		const fetchData = async () => {
			const result = await simpleRequest(REQUEST_URL, data);
			if (result.error) {
				setError(result.error);
			} else {
				setFreeSlots(result.result);
				setError(null);
			}
		};

		fetchData();
	}, [offerId]);

	const freeSlotsByDate = freeSlots.reduce((acc, freeSlot) => {
		const date = new Date(freeSlot);
		const day = date.toISOString().split('T')[0];
		const time = date.toTimeString().split(' ')[0].substring(0, 5);
		if (!acc[day]) {
			acc[day] = [];
		}
		acc[day].push({ time, original: freeSlot });
		return acc;
	}, {});

	const handleUnAuthorized = () => {
		navigate('/registration');
	}

	const handleSubmit = async (e, originalTime) => {
		console.log('Handling submit Submit', originalTime);
		e.preventDefault();

		const REQUEST_URL = '/bookings/create';
		const data = {
			offer_id: offerId,
			start_time: originalTime,
		}

		try {
			const result = await sendRequest('post', REQUEST_URL, data, handleUnAuthorized);
			if (result.error) {
				setError(result.error);
			} else {
				console.log('Booking created successfully:', result.result);
				setBooking(result.result);
				setError(null);
			}
		} catch (error) {
			console.log('Error creating booking:', error);
			setError(error);
		}
	}

	return (
		<div className='booking'>
			{Object.entries(freeSlotsByDate).map(([date, times], index) => (
				<form
					className='booking__freeSlot'
					key={index}
					onSubmit={(e) => handleSubmit(e, e.target.value)}
				>
					<h3 className='freeSlot__title'>Free times on: {date}</h3>
					<div className='freeSlot__buttonsBox'>
						{times.map(({ time, original }, index) => (
							<button
								className='freeSlot__button'
								key={index}
								value={original}
								onClick={(e) => handleSubmit(e, original)}
							>
								{time}
							</button>
						))}
					</div>
					<button className='freeSlot__button' onClick={() => navigate(-1)}>Back to offers</button>
				</form>
			))}
			{!freeSlots && (
				<div className='booking__freeSlot'>
					<h3 className='booking__title'>No Free Times on this day.</h3>
					<p className='booking__text'>Try another specialist or another day.</p>
					<button className='freeSlot__button' onClick={() => navigate(-1)}>Back to offers</button>
				</div>
			)}
			{booking && (
				<div className='booking__success'>
					<h3>Booking created successfully</h3>
					<p>Start time: {booking.startTime}</p>
					<p>End time: {booking.endTime}</p>
				</div>
			)}
			{error && <p className='booking__error'>{error}</p>}
		</div>
	);

};

export default Booking;
