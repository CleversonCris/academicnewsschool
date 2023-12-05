import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import CreateNotice from './pages/CreateNotice'
import InsertStudent from './pages/InsertStudent'
import { useContext } from 'react'
import Administrators from './pages/Administrators'
import Login from './pages/Login'
import { Context } from './context/SchoolContext'
import ManageAccounts from './pages/manage-accounts/ManageAccounts'
import Usuarios from './pages/Usuarios'
function App() {
  const {authenticated} = useContext(Context)
  console.log(authenticated)
  return (
    <Router>
      <Routes>
        <Route element={authenticated ? <Home/> : <Login/>} path='/'/>
        <Route element={authenticated ? <CreateNotice/> : <Navigate to='/'/>} path='/createnotice'/>
        <Route element={authenticated ? <InsertStudent/> : <Navigate to='/'/>} path='/insertstudent'/>
        <Route element={authenticated ? <Administrators/> : <Navigate to='/'/>} path='/createaccount'/>
        <Route element={!authenticated ? <Login/> : <Navigate to='/'/>} path='/login'/>
        <Route element={!authenticated ? <Login/> : <ManageAccounts/>} path='/manage-accounts'/>
      </Routes>
    </Router>

  )
}

export default App
