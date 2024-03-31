// ============ ADMIN-PROFESSION-MANAGER COMPONENT MODULE  ============ //

import { useState } from 'react';
import axios from 'axios';


const AdminProfessionManager = () => {
	const [profession, setProfession] = useState('');
	const [description, setDescription] = useState('');
	const [professionData, setProfessionData] = useState(null);

	const handleInputChangeProfession = (e) => {
		setProfession(e.target.value);
	};

	const handleInputChangeDescription = (e) => {
		setDescription(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const token = localStorage.getItem('token');
		const shema = {
			profession: profession,
			description: description,
		}

		try {
			const response = await axios({
				method: 'post',
				url: 'http://127.0.0.1:8000/profession/add',
				data: shema,
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				}
			})
			setProfessionData(response.data.result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2>Add New Profession</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor='profession'>
					Add new profession:
					<input
						id='profession'
						type='text'
						value={profession}
						onChange={handleInputChangeProfession}
						required
					/>
				</label>
				<label htmlFor='description'>
					Add profession description:
					<input
						id='description'
						type='text'
						value={description}
						onChange={handleInputChangeDescription}
					/>
				</label>
				<button type='submit'>Create Profession</button>
			</form>
			{professionData && (
				<div>
					<h2>Created Profession Data:</h2>
					{professionData.profession && (
						<p>New Profession: {professionData.profession}</p>
					)}
					{professionData.description && (
						<p>Profession description: {professionData.description}</p>
					)}
				</div>
			)}
		</div>
	)
};

export default AdminProfessionManager;
