
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import AuthCallbackPage from './pages/AuthCallbackPage'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Layout><HomePage/></Layout>}/>
        <Route path='/auth-callback' element={<AuthCallbackPage/>}/>
        <Route path='/profile' element={<span>Profile</span>}/>
        <Route path='*' element={<Navigate to={"/"}/>}/>
    </Routes>
  )
}

export default AppRouter