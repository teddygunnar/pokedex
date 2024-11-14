import { Routes, Route, Outlet } from 'react-router-dom'
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
                <Route path='*' element={<List />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes