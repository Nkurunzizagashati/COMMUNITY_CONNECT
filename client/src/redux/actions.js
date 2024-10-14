import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setPending, setServices, setError } from './serviceSlice';

const useFetchServices = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchServices = async () => {
			try {
				dispatch(setPending());

				const response = await axios.get(
					'http://localhost:3001/api/services'
				);

				if (response.status === 200) {
					dispatch(setServices(response.data));
					console.log(response.data);
				} else {
					dispatch(
						setError(
							`Unexpected response status: ${response.status}`
						)
					);
				}
			} catch (error) {
				dispatch(setError(error.message));
			}
		};

		fetchServices();
	}, [dispatch]);
};

export default useFetchServices;
