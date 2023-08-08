//커스텀 훅 : 리액트의 기본 훅을 활용해서 자주쓰는 기능들을 마치 플러그인처럼 하나의 패키지로 묶어서 재활용하는 형태
//조건 : 파일이름이 무조건 use 로 시작해야함 다른 리액트 hook 안쪽에서는 호출이 불가능 useEffect, 다른 핸들러함수

//useQuery: 문자열로 구성이 고유의 퀄리키라는 것을 이용해서 비동기를 데이터를 가져와서 관리하기 위한 함수
//useMutation: 데이터를 가져오는 것 뿐만아니라 서버의 데이터를 직접 변경요청할 수 있는 함수
//useQueryClient: 추가적인 인스턴스의 함수 호출하기 위한 객체
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

//리액트쿼리를 사용하기 위해서는 순수함수 형태로 데이터를 패칭해 주는 함수가 필요 해당함수는 useQuery 두번째 인수로 전달
//외부에선 인수값을 전달받는 비동기서버통신 함수 useQuery값을 비구조 할당해서 인수로 전달 (배열: useQuery 첫번째 인수로 전달되는 배열 쿼리키)
//데이터 가져오는 커스텀 훅
const fectchUser = async ({ queryKey }) => {
	//쿼리키 배열의 두번째 값이 패칭함수로 전달할 값이기 때문에 해당 값을 fetching Url에 탬플릿 리터럴로 연결후 데이터 호출
	//console.log(queryKey[1]);
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${queryKey[1]}`);
	//해당데이터가 받아지면 json형태로 동기적으로 parsing해서 데이터 리턴하는 순수함수
	return await response.json();
};

//아래 함수가 실제적으로 내보내서 활용할 커스텀훅
//해당 훅 안쪽에는 내부적으로 useQuery를 호출하는데 위에서 만들었던 fetching함수를 인수로 필요로함
//해당 훅을 호출할때 fetching 함수 안쪽에 옵션값을 전달하기때문에 opt라는 파라미터를 연결
export const useUserQuery = (opt) =>
	//useQuery(고유쿼리키(배열), 데이터 패칭함수, 리액트 뭐리 설정값(객체)): 비동기 데이터를 패칭해서 리액트쿼리 설정값에 따라 캐싱처리한 후 리턴
	//이때 쿼리키의 첫번째 배열값으로는 고유문자값, 리액트는 해당 문자값을 통해서 전체 앱 어플리케이션 안에서 어떤 컴포넌트에서든 여러번 호출이 되더라도 쿼리키의 고유값이 같으면 동일한 데이터로 인지를 해서 기존 stale, cashe카임을 공유하면서 다시 refectoring 처리 하지 않음
	//쿼리키의 두번째 배열값으로는 fetching함수 호출할때 필요한 커스텀 옵션값을 전달함으로써 각각의 데이터를 고유데이터로 인지시켜줌
	useQuery(['user', opt], fectchUser, {
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		staleTime: 1000 * 5, //디폴트 : 0초
		cacheTime: 1000 * 5, //캐쉬데이터 유지시키는 시간 디폴트 5분 해당 시간 뒤에 GC에 의해 메모리에서 값 제거
	});

//데이터 변경요청후 가져오는 커스텀 훅
export const updateUserName = async ([userName, num]) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`, {
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
		onSuccess: (args) => {
			queryClient.setQueryData(['user', args.id], args);
		},
	});
};
