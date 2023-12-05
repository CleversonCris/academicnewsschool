import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const [message, setMessage] = useState("")
  const login = async(e) => {
    e.preventDefault()
    const response = await axios.post('http://localhost:3001/login', {
        email,
        password
    })

    if(response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
        setError(false)
        setMessage(response.data.msg)
    }
    if(response.data.error){
        setError(true)
        setMessage(response.data.msg)
    }
  }

  return (
    <section className='flex h-[calc(100vh-64px)] justify-center items-center'>
        <form className='flex flex-col gap-2 p-2 border-2 border-purple-500' onSubmit={login}>
            <label htmlFor="" className='flex flex-col'>
                <span>Email:</span>
                <input type="email" className=' border-purple-500 border-2'
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </label>
            <label htmlFor="" className='flex flex-col'>
                <span>Senha:</span>
                <input type="password" className=' border-purple-500 border-2'
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </label>
            <button className='bg-purple-500 text-white h-10'>Enviar</button>
            {error !== null && error === true &&<button className='bg-red-500 h-10 text-white'>{message}</button>}
            {error !== null && error === false && <button className='bg-green-500 h-10 text-white'>{message}</button>}
            {error !== null && error === false && <button className='h-10' onClick={()=>{
                window.location.reload()
            }}>Voltar para a Home</button>}
        </form>
    </section>
  )
}
