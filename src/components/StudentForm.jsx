import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function StudentForm({insertOtherUser, backOption}) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [RA, setRA] = useState("")
  const [messageFront, setMessageFront] = useState(null)
  const [messageBack, setMessageBack] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(password !== confirmPassword){
        setMessageFront('Senhas não coincidem')
    }
    if(email === '' || password === '' || RA === '' || name === ''){
        setMessageFront('Preencha todos dados campos')
        return
    }
    await axios.post('http://localhost:3001/createstudent', {
        name,
        email,
        password,
        confirmPassword,
        RA,
        token: localStorage.getItem('auth_token')
    }).then(response => {
        if(response.data.msg){
            setMessageFront(null)
            setMessageBack(response.data.msg)
        }
        console.log(response)
    })
  }

  return (
    <section className='h-[calc(100vh-64px)] gap-4 flex-col flex justify-center items-center'>
        <form action="" onSubmit={handleSubmit} className='grid grid-cols-2 p-4 border-2 border-black gap-6'>
            <label htmlFor="" className='flex flex-col gap-2'>
                <label htmlFor="">Nome:</label>
                <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                type="text" className='border-2'/>
            </label>
            <label htmlFor="" className='flex flex-col gap-2'>
                <label htmlFor="">Email:</label>
                <input
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email" className='border-2'/>
            </label>
            <label htmlFor="" className='flex flex-col gap-2'>
                <label htmlFor="">Senha:</label>
                <input
                required
                value={password}
                onChange={e => setPassword(e.target.value)}               
                type="password" className='border-2'/>
            </label>
            <label htmlFor="" className='flex flex-col gap-2'>
                <label htmlFor="">Confirme a Senha:</label>
                <input
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                type="password" className='border-2'/>
            </label>
            <label htmlFor="" className='flex flex-col gap-2'>
                <label htmlFor="">RA:</label>
                <input
                required
                value={RA}
                onChange={e => setRA(e.target.value)}
                type="text" className='border-2'/>
            </label>
             <div className='flex items-end'>
                <button className='bg-black w-full text-white h-10'>Enviar</button>
             </div>
        </form>
        <div className='flex justify-center'>
             {messageFront !== null && <button className='bg-red-500 text-white p-4 py-2'>{messageFront}</button>}
        </div>
        <div className='flex justify-center items-center flex-col gap-4'>
             {messageBack !== null && <button className='bg-green-500 text-white p-4 py-2'>{messageBack}</button>}
             {messageBack !== null && <button onClick={insertOtherUser} className=' border-2 border-black p-4 py-2 w-60'>Inserir outro usuário</button>}
        </div>
        <button onClick={backOption}>Voltar</button>
    </section>
  )
}
