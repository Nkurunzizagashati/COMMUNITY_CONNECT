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

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: 'login',
		element: <Login />,
	},
	{
		path: 'register',
		element: <Signup />,
	},
]);

createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);
