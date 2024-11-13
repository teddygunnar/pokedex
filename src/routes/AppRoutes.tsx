import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { List } from '../modules';

export const ListLayout = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<ListLayout />}>
                <Route path='*' element={<Navigate to='/list' />} />
                <Route path='list' element={<List />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes