import axios from "axios";
import React, {createContext, useEffect, useState} from "react";

const Context = createContext();

function AuthProvider({children}) {

  const [authenticated, setAuthenticate] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState("")

  const logout = () => {
    localStorage.removeItem('auth_token')
    setAuthenticate(false)
  }
  const token = localStorage.getItem('auth_token')
  const handleAuthenticated = async() => {
    const response = await axios.post('http://localhost:3001/authenticate', {
      token
    })

    if(response.data.authenticate){
      setAuthenticate(response.data.authenticate)
      setLoading(false)
      setUserName(response.data.userName)
    } else {
      setAuthenticate(false)
      setLoading(false)
    }
    setLoading(false)

  }

  useEffect(() =>{
    
    handleAuthenticated()
    setLoading(false)
  }, [authenticated, loading])



  if(loading) {
    return <h1>Carregando</h1>
  }

  return(
    <Context.Provider value={{authenticated, handleAuthenticated, logout, userName} }>
      {children}
    </Context.Provider>
  )
}

export {Context, AuthProvider}