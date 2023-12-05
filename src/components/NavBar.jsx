import { Link } from "react-router-dom"
import { RiLogoutCircleLine } from "react-icons/ri";
import { useContext } from "react";
import { Context } from "../context/SchoolContext";
export default function NavBar() {

  const {logout} = useContext(Context)

  return (
    <nav className="flex border-b-2 px-20 border-black justify-between items-center h-12">
        <ul className="flex gap-4">
            <li>
                <Link to='/createaccount'>Criar Conta</Link>
            </li>
            <li>
                <Link to='/manage-accounts'>Usuários</Link>
            </li>
        </ul>
        <button onClick={logout} className="text-2xl text-red-500">
            <RiLogoutCircleLine/>
        </button>
    </nav>
  )
}
