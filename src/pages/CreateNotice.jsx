import React from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
export default function CreateNotice() {

    const handleSubmit = () => {
        axios.post('http://localhost:3002/createnotice', {
            
        })
    }

  return (
    <>
        <NavBar/>
    </>
  )
}
