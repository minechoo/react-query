//mutation 으로 서버데이터 변경을 위한 폼요소가 있는 컴포넌트 임포트
import { useUserQuery } from './hooks/useUsers';
//해당 페이지에서 유저정보를 가져오기 위해서 useUserQuery커스텀훅 임포트
//기본적으로 react-query의 탄생 배경이 수시로 바뀌는 서버데이터를 정적인 상태로 전역관리하는게 잘못됐다라는 관점으로 시작된 개념
//컴포넌트가 마운트가 될때마다 같은 서버쪽에 데이터요청을 하더라도 최신데이터를 유지하기 위해서 매번 데이터 요청을 보냄
//동일한 데이터를 여러컴포넌트에서 계속 호출하면 비효율적이므로 쿼리키의 있는 고유문자값을 기준으로 해서 동일한 데이터인 경우 refetching할지를 결정

import UserForm from './UserForm';

function UserName() {
	//useUserQuery로 데이터 호출해서 데이터반환값과 동기적으로 데이터 성공유무를 비구조화할당으로 받고
	const { data, isSuccess } = useUserQuery(1);
	return (
		<div>
			{/* 화면에 데이터 출력 */}
			{isSuccess && <h2>Name: {data.name}</h2>}
			{/* 서버데이터 변경요청 테스트를 위한 input이 있는 컴포넌트 (mutation테스트를 할 컴포넌트) */}
			<UserForm />
		</div>
	);
}

export default UserName;
