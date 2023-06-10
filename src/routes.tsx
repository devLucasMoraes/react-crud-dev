import { Route, Routes } from 'react-router-dom';

import UserList from './pages/Users/UserList';
import UserCreate from './pages/Users/UserCreate';
import UserEdit from './pages/Users/UserEdit';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/users'>
        <Route path='/users' element={<UserList />} />
        <Route path='/users/new' element={<UserCreate />} />
        <Route path='/users/:id' element={<UserEdit />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;