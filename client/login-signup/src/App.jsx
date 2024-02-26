import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar'
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';

axios.defaults.baseURL = "http://localhost:8001";
function App() {

  return (
    <UserContextProvider>
    <Navbar/>
    <Toaster position ='bottom-right' toastOptions = {{duration: 2000}}/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        
        
    </Routes>
    </UserContextProvider>
  )
}

export default App
