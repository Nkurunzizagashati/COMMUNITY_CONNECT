import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import useFetchServices from './redux/actions';
import Home from './pages/Home';
import ProfilePage from './pages/Profile';
import CreateService from './pages/CreateService';
import ReviewPage from './pages/Reviews';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'register',
				element: <Signup />,
			},
			{
				path: '/profile',
				element: <ProfilePage />,
			},
			{
				path: 'reviews/:id',
				element: <ReviewPage />,
			},
			{
				path: '/create-service',
				element: <CreateService />,
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
