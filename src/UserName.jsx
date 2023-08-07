import { useUserQuery } from './hooks/useUsers';

function UserName() {
	const { data, isSuccess } = useUserQuery(1);
	return <div>{isSuccess && <h2>Name: {data.name}</h2>}</div>;
}

export default UserName;
