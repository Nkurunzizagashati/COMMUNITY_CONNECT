import { BrowserRouter, useRoutes } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/Users';
import Register from './pages/Register';

const RoutesComponent = () => {
	const routes = [
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/register',
			element: <Register />,
		},
		{
			path: '/users',
			element: <Users />,
		},
	];

	return useRoutes(routes);
};

const App = () => {
	return (
		<BrowserRouter>
			<RoutesComponent />
		</BrowserRouter>
	);
};
export default App;
