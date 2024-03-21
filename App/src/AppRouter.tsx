import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import UserProfilePage from './pages/UserProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import ManageRestaurantPage from './pages/ManageRestaurantPage'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Layout hero><HomePage/></Layout>}/>
        <Route path='/auth-callback' element={<AuthCallbackPage/>}/>
        <Route element={<ProtectedRoute/>}><Route path='/user-profile' element={<Layout><UserProfilePage/></Layout>}/></Route>
        <Route path='/manage-restaurant' element={<Layout><ManageRestaurantPage/></Layout>}/>
        <Route path='*' element={<Navigate to={"/"}/>}/>
    </Routes>
  )
}

export default AppRouter