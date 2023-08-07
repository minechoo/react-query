import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Route, Routes } from 'react-router-dom';
import Main from './Main';
import UserName from './UserName';
import UserAddress from './UserAddress';
import Menu from './Menu';

function App() {
	const queryClient = new QueryClient();

	return (
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
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
export default App;
