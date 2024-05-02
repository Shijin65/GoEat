import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import AuthCallbackPage from './pages/AuthCallbackPage'
import UserProfilePage from './pages/UserProfilePage'
import ProtectedRoute from './Auth/ProtectedRoute'
import ManageRestaurantPage from './pages/ManageRestaurantPage'
import SearchPage from './pages/SearchPage'
import DetailPage from './pages/DetailPage'
import OrderStatuspage from './pages/OrderStatuspage'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Layout hero><HomePage/></Layout>}/>
        <Route path='/auth-callback' element={<AuthCallbackPage/>}/>
        <Route path='/search/:city' element={<Layout><SearchPage/></Layout>}/>
        <Route path='/details/:restaurantId' element={<Layout><DetailPage/></Layout>}/>
        <Route element={<ProtectedRoute/>}><Route path='/user-profile' element={<Layout><UserProfilePage/></Layout>}/></Route>
        <Route element={<ProtectedRoute/>}><Route path='/order-status' element={<Layout><OrderStatuspage/></Layout>}/></Route>
        <Route element={<ProtectedRoute/>}><Route path='/manage-restaurant' element={<Layout><ManageRestaurantPage/></Layout>}/></Route>
        <Route path='*' element={<Navigate to={"/"}/>}/>
    </Routes>
  )
}

export default AppRouter