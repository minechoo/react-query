import { useUserQuery } from './hooks/useUsers';

function UserAddress() {
	const { data, isSuccess } = useUserQuery();
	return <div>{isSuccess && <h2>Address: {data.address.street}</h2>}</div>;
}

export default UserAddress;