import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import axios from 'axios';
export default function ManageAccounts() {

  const [accounts, setAccounts] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.post('http://localhost:3001/manage-accounts', {
        token: localStorage.getItem('auth_token')
    }).then(response => {
        setAccounts(response.data.accounts)
    })

  }, [])


  return (
    <>
        <NavBar/>
        <main className='py-20 px-20 flex flex-col gap-8'>
            <section className='flex justify-between'>
                <div className='flex gap-8 h-10'>
                    <Link to='/createaccount'>
                        <button className='bg-green-500 text-white py-2 w-60'>Criar usuário</button>                   
                    </Link>
                </div>
                <div>
                    <p>Pesquise por nome, email, ou tipo de usuário</p>
                    <div className='flex items-center relative'>
                        <input value={search} onChange={e => setSearch(e.target.value)} type="text" className='pl-5 border-2 border-green-500 outline-none'/>
                        <IoIosSearch className='absolute left-0 text-xl'/>
                    </div>
                </div>
            </section>
            <section>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Nome de usuário:
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Email:
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Tipo de Usuário:
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts && accounts.length > 0 && accounts.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()) || e.typeuser.toLowerCase().includes(search.toLowerCase())).map((e) => (
                                <tr class="bg-white dark:bg-gray-800">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {e.name}
                                    </th>
                                    <td class="px-6 py-4">
                                        {e.email}
                                    </td>
                                    <td class="px-6 py-4">
                                        {e.typeuser}
                                    </td>
                                </tr>  
                            ))}
                        </tbody>
                    </table>
                </div>                
            </section>
        </main>
    </>
  )
}
