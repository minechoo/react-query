import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

//데이터 가져오는 커스텀 훅
const fectchUser = async ({ queryKey }) => {
	//console.log(queryKey[1]);
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`);
	return await response.json();
};

export const useUserQuery = () =>
	useQuery(['user'], fectchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		staleTime: 1000 * 5, //디폴트 : 0초
		cacheTime: 1000 * 5, //캐쉬데이터 유지시키는 시간 디폴트 5분 해당 시간 뒤에 GC에 의해 메모리에서 값 제거
	});

//데이터 변경요청후 가져오는 커스텀 훅
export const updateUserName = async (userName) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`, {
		method: 'PUT',
		body: JSON.stringify({
			id: 1,
			name: userName,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});

	const result = await response.json();
	return result;
};
//기존 서버데이터를 변경요청하는 커스텀 훅
export const useUserMutaion = () => {
	const queryClient = useQueryClient();
	//useQueryClient로부터 객체값을 반환뒤
	return useMutation(updateUserName, {
		//mutation요청이 성공적으로 들어가면 파라미터값을 기존 쿼리키에 추가해서 데이터변경처리하는 setQueryData함수 호출
		onSuccess: (userName) => {
			queryClient.setQueryData(['user'], userName);
		},
	});
};
