import React, { useEffect, useState } from 'react'
import { IoMdNotifications } from 'react-icons/io'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function NavBar() {

  const [nameSchool, setNameSchool] = useState("")

  useEffect(() => {
    axios.post('http://localhost:3001/getprofile', {
      token: localStorage.getItem('auth_token')
    }).then(response => {
        setNameSchool(response.data.name)
    })
  }, [])


  return (
<nav className='flex items-center h-20 justify-between px-20 border-b-2 border-green-500'>
    <div className='flex items-center gap-4'>
        <div className="accounts gap-6 flex items-center">
            <Link to='/'><button>Voltar</button></Link>
            <MdKeyboardArrowDown className='text-4xl'/>
            <p className='text-xl'>{nameSchool}</p>
        </div>
        <span className="separator w-[2px] h-12 bg-green-500"></span>
        <IoMdNotifications className='text-3xl text-green-500'/>
    </div>
    <h1>Sair</h1>
</nav>
  )
}
