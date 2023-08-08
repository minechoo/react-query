import { useUserQuery } from './hooks/useUsers';

function UserAddress() {
	const { data, isSuccess } = useUserQuery(1);
	return <>{isSuccess && <h2>Address: {data.address.street}</h2>}</>;
}

export default UserAddress;
