import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import UserName from './UserName';
import UserAddress from './UserAddress';
import Menu from './Menu';

function App() {
	//quertClient 인스턴스를 생성
	const queryClient = new QueryClient();

	return (
		//QueryClientProvider라는 컴포넌트로 해당 인스턴스를 props로 전달
		//루트인 App전역에서 어떤 자식 컴포넌트에서든 리액트쿼리 활용가능
		<QueryClientProvider client={queryClient}>
			<div className='App'>
				<Menu />
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/name' element={<UserName />} />
					<Route path='/address' element={<UserAddress />} />
				</Routes>
				{/* <UserInfo /> */}
			</div>
			{/* 각 컴포넌트 마운트시 각각의 캐싱된 서버데이터를 확인할 수 있는 리액트 전용 개발툴 배포시에는 제거 */}
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
export default App;
