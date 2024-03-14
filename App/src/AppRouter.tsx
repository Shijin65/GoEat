
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'

function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Layout><HomePage/></Layout>}/>
        <Route path='/profile' element={<span>Profile</span>}/>
        <Route path='*' element={<Navigate to={"/"}/>}/>
    </Routes>
  )
}

export default AppRouter