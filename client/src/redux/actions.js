import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setPending, setServices, setError } from './serviceSlice';
import { loginStart, loginSuccess, loginFailure } from './authSlice';

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

const LoginUser = async (credentials) => {
	const dispatch = useDispatch();

	dispatch(loginStart());

	// Check if logging in as provider
	if (credentials.logginAs === 'provider') {
		try {
			const response = await axios.post(
				'http://localhost:3001/api/providers/login',
				credentials
			);
			if (response.status === 200) {
				dispatch(
					loginSuccess({
						user: response.data.user,
						token: response.data.accessToken,
					})
				);
			} else {
				dispatch(loginFailure('Invalid credentials'));
			}
		} catch (error) {
			dispatch(loginFailure(error.message));
		}
		return;
	}

	// Otherwise, try to log in as consumer
	try {
		const response = await axios.post(
			'http://localhost:3001/api/consumers/login',
			credentials
		);

		if (response.status === 200) {
			dispatch(
				loginSuccess({
					user: response.data.user,
					token: response.data.accessToken,
				})
			);
		} else {
			dispatch(loginFailure('Invalid credentials'));
		}
	} catch (error) {
		dispatch(loginFailure(error.message));
	}
};

export { LoginUser };

export default useFetchServices;
