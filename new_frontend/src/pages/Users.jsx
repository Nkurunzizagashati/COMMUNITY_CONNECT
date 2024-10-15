import axios from 'axios';
import { useState } from 'react';
import styles from './Users.module.css';

const Users = () => {
	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		const response = await axios.get(
			'http://localhost:3001/api/consumers/'
		);

		if (response.status === 401) {
			alert('Not authorized');
			return;
		}

		const users = response.data;

		if (users.length > 0) return setUsers(users);

		alert('No users found');
	};
	return (
		<div>
			<h2>ALL USERS</h2>
			<button onClick={getUsers} className={styles.submitBtn}>
				GET USERS
			</button>

			{users &&
				users.map((user) => (
					<div key={user._id}>
						<h3>{user.name}</h3>
						<p>{user.email}</p>
					</div>
				))}
		</div>
	);
};

export default Users;
