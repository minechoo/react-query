import { useUserQuery } from './hooks/useUsers';
import { useUserMutaion } from './hooks/useUsers';
import { useState } from 'react';

function UserForm() {
	const { data } = useUserQuery(1);
	const [UserName, setUserName] = useState(data?.name);

	const userMutation = useUserMutaion();

	const handleSubmit = (e) => {
		e.preventDefault();
		userMutation.mutate([UserName, 1]);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' value={UserName || ''} onChange={(e) => setUserName(e.target.value)} />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default UserForm;
