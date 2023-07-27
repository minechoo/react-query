import { useQuery } from '@tanstack/react-query';

function UserInfo() {
	const fectchUser = async ({ queryKey }) => {
		const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
		return await response.json();
	};
	const { data, isLoading, isSuccess, isError } = useQuery(['user', 2], fectchUser);
	console.log(data);
	console.log(isLoading);
	console.log(isError);
	return (
		<div>
			<h1>UserInfo</h1>
			{isSuccess && <h2>Name: {data.name}</h2>}
		</div>
	);
}

export default UserInfo;
