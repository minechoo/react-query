import { useUserQuery } from './hooks/useUsers';

function UserInfo() {
	const { data, isSuccess } = useUserQuery();

	return (
		<div>
			<h1>UserInfo</h1>
			{isSuccess && <h2>Name: {data.name}</h2>}
		</div>
	);
}

export default UserInfo;
