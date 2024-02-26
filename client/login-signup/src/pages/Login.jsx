import {React, useState}  from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();

  const[data, setData] = useState({
    email :"",
    password: ""
  })

  const loginUser = async (event) =>
  {
    event.preventDefault();
    const {email, password} =data
    try {
      const {data} = await axios.post('/login', {email, password})
      if(data.error){
        toast.error(data.error)
      }else {
        setData({})
        toast.success('Login Successful. Hello !!')
        navigate('/dashboard')
      }


    } catch (error) {
      
    }

  }
  return (
    <div>
      <form onSubmit= {loginUser}>
        <label>Email</label>
        <input type="text" placeholder= 'enter email...' value = {data.email} onChange = {(event) => setData( {...data, email : event.target.value})}/>
        <label>Password</label>
        <input type="text" placeholder= 'enter password...'value = {data.password} onChange = {(event) => setData( {...data, password: event.target.value})}/>
        <button type="submit">Submit</button>
        </form>
    </div>
  )
}
