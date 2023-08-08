//useUserQuery라는 커스텀 훅을 import
import { useUserQuery } from './hooks/useUsers';

function UserAddress() {
	//해당 컴포넌트가 마운트되자마다 useUserQuery 커스텀훅 호출 이때 1이라는 숫자값을 인수로 전달하면 해당 인수값은 커스텀훅 안쪽에 있는 useQuery함수의 첫번째 인수값인 배열형태의 쿼리키의 두번째 값을 전달이 됨
	//그렇게 만들어진 배열값은 다시 두번째인수인 fetching함수의 queryKey라는 property에 담겨서 전달
	//fetching함수 내부적으로 쿼리키 배열의 두번째 인수값을 요청 url에 쿼리 스트링 형태로 붙여서 비동기 데이터 요청 시작
	//해당 데이터 요청이 들어가고 pending상태이면 isSuccess값은 실시간으로 false, pending이 끝나고 fullfiled되면 true값 담김, pending이 끝나고 데이터호출에 실패하면 isError라는 propety에 에러객체가 담김, 데이터가 fullfiled되서 요청에 성공하면 data라는 property로 반환값이 담김
	//결국 아래 커스텀훅 호출구문에서 데이터 반환에 성공하면 data에 비구조화할당으로 반환값이 담기고, 데이터가 동기적으로 담겨야지만 isSuccess값이 true가 됨
	const { data, isSuccess } = useUserQuery(1);
	//아래 코드는 동기적으로 데이터 응답에 성공해야지만 (isSuccess값이 true여야지만 data로 받은 내용을 화면에 출력)
	//이때 data에 optional chaining을 쓰는 이유는 isSuccess값이 true로 바뀌기 전까지는 data값이 초기화되지 않은 undefind이므로 리턴문 오류가 나므로 해당 충돌을 피하기 위함
	return <>{isSuccess && <h2>Address: {data.address.street}</h2>}</>;
}

export default UserAddress;
