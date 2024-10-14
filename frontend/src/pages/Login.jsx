import { Link } from 'react-router-dom';
import CustomButton from '../components/Button';
import CustomInput from '../components/Input';

const Login = () => {
	return (
		<div className="w-screen h-screen flex items-center content-center justify-center flex-col gap-8 bg-gray-400">
			<h1 className="text-center text-5xl font-bold">Login</h1>
			<div className="w-[40%] flex flex-col gap-3 border p-8 rounded-md">
				<form className="flex flex-col gap-2">
					<CustomInput
						name="email"
						type="email"
						placeholder="Enter your email"
					/>
					<CustomInput
						name="password"
						type="password"
						placeholder="Enter your password"
					/>
					<select name="loginAs">
						Login as:
						<option value="provider">Provider</option>
						<option value="provider">Consumer</option>
					</select>
					<CustomButton
						type="submit"
						displayText="LOGIN"
						className="bg-green-400"
					/>
				</form>
				<p className="text-center">
					Do not have an account?{' '}
					<Link to={'/register'}>Register</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
