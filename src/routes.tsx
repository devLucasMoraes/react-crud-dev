import { Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/users'>
        <Route path='/users' element={<>Users</>} />
        <Route path='/users/new' element={<>New user</>} />
        <Route path='/users/:id' element={<>Edit user</>} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;