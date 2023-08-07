import { useQuery } from '@tanstack/react-query';

const fectchUser = async ({ queryKey }) => {
	console.log(queryKey[1]);
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
	return await response.json();
};

export const useUserQuery = () =>
	useQuery(['user', 2], fectchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		staleTime: 1000 * 5, //디폴트 : 0초
		cacheTime: 1000 * 5, //캐쉬데이터 유지시키는 시간 디폴트 5분 해당 시간 뒤에 GC에 의해 메모리에서 값 제거
	});
