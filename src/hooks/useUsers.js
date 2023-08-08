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
//해당 함수는 useUserMutaion커스텀 훅에서 사용되는 서버데이터를 변경하는 비동기 호출 함수로 배열값을 비구조할당해서 내부로 전달
export const updateUserName = async ([userName, num]) => {
	//파라미터로 받은 두번째 값을 요청URL의 쿼리형태로 담아줌
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${num}`, {
		//fetch매서드의 두번째 옵션값을로 객체리터럴을 지정함으로써 데이터를 가져오는 것 뿐만이 아닌 Rest방식 데이터 요청 가능
		//Get(쿼리) Delete(쿼리) put(body객체에 담아서 전달) post(body 객체에 담아서 전달)
		method: 'PATCH',
		//서버쪽으로 전달할 데이터를 문자화해서 보냄, 서버쪽에서는 해당데이터를 다시 body-parser 로 파싱한 뒤 동일한 name에 해당하는 다큐먼트 찾은 뒤 같이 전달된 userName값으로 해당 다큐먼트의 서버데이터 변경
		body: JSON.stringify({
			id: 1,
			name: userName,
		}),
		//데이터 요청시 header객체에도 같이 전달
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});

	const result = await response.json();
	return result;
};
//기존 서버데이터를 변경요청하는 커스텀 훅
//위의 비동기 데이터 변경 함수를 활용해서 서버데이터를 변경한뒤 캐싱처리해주는 커스텀 훅 생성
export const useUserMutaion = () => {
	//기존 생성한 QueryClient인스턴스를 호출하는 함수
	//해당 QueryClient인스턴스에서 prototype에 등록되어 있는 setQueryData라는 서버데이터 변경요청함수를 호출하기 위함
	const queryClient = useQueryClient();
	//useQueryClient로부터 객체값을 반환뒤
	//useMutation(비동기함수, 옵션설정 객체{onSuccess: mutate요청이 성공적으로 들어가면 연결된 핸들러함수 호출})
	return useMutation(updateUserName, {
		//mutation요청이 성공적으로 들어가면 파라미터값을 기존 쿼리키에 추가해서 데이터변경처리하는 setQueryData함수 호출
		//mutate요청이 성공시 연결된 핸들러 함수 호출 (args) 실제 해당훅을 호출시 생성되는 객체의 mutate라는 property에 해당 핸들러 함수가 등록됨 (args: 변경할 데이터를 전달)
		onSuccess: (args) => {
			//위에서 가져온 인스턴스 객체의 setQueryData함수호출 setQueryData(쿼리키, 변경할 데이터)
			queryClient.setQueryData(['user', args.id], args);
		},
	});
};
