import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setPending, setServices, setError } from './serviceSlice';
import { loginStart, loginSuccess, loginFailure } from './authSlice';
import variables from '../config';
import { useLocation } from 'react-router-dom';
import { dontLoad } from './loadServicesSlice';

// Hook for fetching services
const useFetchServices = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const loadServices = useSelector(
		(state) => state.loadServices.loadServices
	);

	useEffect(() => {
		const fetchServices = async () => {
			try {
				dispatch(setPending());
				const BACKEND_URL = `${variables.backendUrl}/services`;

				const response = await axios.get(BACKEND_URL);

				if (response.status === 200) {
					dispatch(setServices(response.data));
					console.log(response.data);
					dispatch(dontLoad());
				} else {
					dispatch(
						setError(
							`Unexpected response status: ${response.status}`
						)
					);

					dispatch(dontLoad());
				}
			} catch (error) {
				dispatch(setError(error.message));
			}
		};

		fetchServices();
	}, [dispatch, loadServices && location]);
};

// Function to log in user
const LoginUser = async (credentials) => {
	const dispatch = useDispatch();
	dispatch(loginStart());

	// Log in as provider
	if (credentials.logginAs === 'provider') {
		try {
			const BACKEND_URL = `${variables.backendUrl}/providers/login`;
			const response = await axios.post(BACKEND_URL, credentials);

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

	// Log in as consumer
	try {
		const BACKEND_URL = `${variables.backendUrl}/consumers/login`;
		const response = await axios.post(BACKEND_URL, credentials);

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

// Hook to get token
const useGetToken = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const fetchToken = async () => {
			const backendUrl = `${variables.backendUrl}token`;
			try {
				const response = await axios.get(backendUrl, {
					withCredentials: true,
				});

				if (response.status === 200) {
					console.log(response.data.accessToken);
					dispatch(
						loginSuccess({
							user: response.data.user,
							token: response.data.accessToken,
						})
					);
				}
			} catch (error) {
				console.error('Error fetching token:', error);
			}
		};

		fetchToken();
	}, [dispatch]);
};

export { LoginUser, useGetToken };
export default useFetchServices;
