//useUserMutaion 이라는 서버데이터 변경하는 커스텀 훅 임포트
import { useUserQuery } from './hooks/useUsers';
import { useUserMutaion } from './hooks/useUsers';
//인풋에서 변경할 정보값을 실시간으로 담아주기 위한 state
import { useState } from 'react';

function UserForm() {
	//useUserQuery라는 커스텀훅을 이용해서 첫번째 사용자 데이터를 반환받음
	const { data } = useUserQuery(1);
	//반환된 사용자 데이터 객체에서 name값만 뽑아서 UseName state에 옮겨담음
	//이때 data에 optional chaining 릉 쓰는 이유는 해당 데이터가 반환되기 전까지는 usdefined 로 초기화되어 있지 않기 때문에
	//초기 마운트시 에러를 피하기 위함
	const [UserName, setUserName] = useState(data?.name);

	const userMutation = useUserMutaion();

	//전송버튼 클릭시 동작될 핸들러 함수
	const handleSubmit = (e) => {
		//가본 전송이벤트 막아주고
		e.preventDefault();
		//userMutation 객체에 등록되어 있는 mutate 함수 호출(커스텀훅 내부에 mutate요청 성공시 등록한 함수)
		//해당 인수에 배열을 인수로 전달[body-parser로 전달할 변경데이터, 요청 url에 붙일 쿼리값]
		userMutation.mutate([UserName, 1]);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{/* 간혼 input요소 작업시 콘설에 unconrtolled input이라는 에러문구 발생: 해당 value값이 없을때에 대한 대비챡이 없을때 뜨는 오류 문구 : 해결방법 : 값이 없을때 빈문자를 대신 적용*/}
				<input type='text' value={UserName || ''} onChange={(e) => setUserName(e.target.value)} />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default UserForm;
