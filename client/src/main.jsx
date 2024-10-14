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
				path: '/about',
				element: <div>About</div>,
			},
		],
	},
]);

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
