import React from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = (e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout')
    setTimeout(() => {
        navigate('/login');
    }, 1000);
  }
  return (
    <div className='bg-gray-800 w-100vw h-[10vh] flex justify-around items-center'>
      <div className='font-bold'>
        <span className='text-green-800 text-2xl'>&lt;</span>
        <a className='text-2xl text-amber-100'>PassOP</a>
        <span className='text-green-800 text-2xl'>/&gt;</span>
        </div>
        <div className='gap-x-5 flex'>

      <button className='bg-green-800 text-white rounded-lg w-20 h-10'>Github</button>
      <button onClick={handleLogout} className='bg-green-800 text-white rounded-lg w-20 h-10'>Log Out</button>
        </div>
    </div>
  )
}
export default Navbar
