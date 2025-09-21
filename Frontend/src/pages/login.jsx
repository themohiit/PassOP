import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';
import { motion } from "framer-motion"
function Login() {
    const [loginInfo, setloginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyloginInfo = { ...loginInfo };
        copyloginInfo[name] = value;
        setloginInfo(copyloginInfo);
    }
    const handlelogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError("Please fill your details")
        }
        try {
<<<<<<< HEAD
            const url = 'http://localhost:8080/auth/login'
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
=======
            const url = 'https://passop-gsc4.onrender.com/auth/login'
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
>>>>>>> 981256d7659e531dfce8b1e67614d4d9dfeacd4c
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error, id } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);


                setTimeout(() => {

                    navigate('/home')
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            }
            else if (!success) {
                handleError(message);
            }
        } catch (error) {
            handleError(error);
        }
    }


    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black flex items-center justify-center px-4">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="bg-white/10 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-xl text-white"
  >
    <motion.h1
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-4xl font-extrabold mb-10 text-center"
    >
      Login
    </motion.h1>

    <form onSubmit={handlelogin} className="flex flex-col space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col text-left"
      >
        <label htmlFor="email" className="mb-1 text-sm font-medium">Email</label>
        <input
          className="p-3 rounded-xl border border-gray-600 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 hover:bg-white/30"
          type="email"
          onChange={handleChange}
          name="email"
          placeholder="Enter your email"
          value={loginInfo.email}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col text-left"
      >
        <label htmlFor="password" className="mb-1 text-sm font-medium">Password</label>
        <input
          className="p-3 rounded-xl border border-gray-600 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 hover:bg-white/30"
          type="password"
          onChange={handleChange}
          name="password"
          placeholder="Enter your password"
          value={loginInfo.password}
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 hover:bg-blue-700 transition font-bold text-white rounded-xl py-3 mt-4"
        type="submit"
      >
        Login
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-sm"
      >
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
          Sign Up
        </Link>
      </motion.div>
    </form>
  </motion.div>
  <ToastContainer />
</div>


    )
}

export default Login
