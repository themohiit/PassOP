import React, { useState } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';
function Login() {
    const [loginInfo ,setloginInfo] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleChange =(e)=>{
        const {name,value} = e.target;
        const copyloginInfo = {...loginInfo};
        copyloginInfo[name] = value;
        setloginInfo(copyloginInfo);
    }
    const handlelogin= async (e)=>{
        e.preventDefault();
        const {email, password} =loginInfo;
        if(!email || !password){
            return handleError("Please fill your details")
        }
        try {
            const url = 'https://pass-op-api.vercel.app/auth/login'
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body : JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const {success, message, jwtToken, name , error,id} = result; 
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                
               
                setTimeout(() => {
                    
                    navigate('/home')
                }, 1000);
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message);
            }
        } catch (error) {
             handleError(error);
        }
    }


  return (
    <div>
        <div className="bg-slate-600 h-[100vh] flex items-center justify-center">
                <div className="form bg-white  w-[40vw] h-[60vh] flex flex-col items-center text-center rounded-2xl">
                    <h1 className="text-4xl font-bold mb-16">Login</h1>
                    <form 
                    onSubmit={handlelogin} 
                    >
                        <div>
                            <label htmlFor="email">Email</label>
                            <input className="m-2.5 p-2 rounded-3xl border" type="email"
                                    onChange={handleChange}
                                    name = 'email'
                                    autoFocus
                                    placeholder="Enter your email"
                                    value={loginInfo.email} />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input className="m-2.5 p-2 rounded-3xl border" type="password"
                                    onChange={handleChange}
                                    name='password'
                                    
                                    placeholder="Enter your password"
                                    value={loginInfo.password} />
                        </div>
                        <button className="bg-blue-900 font-bold mb-5 text-white rounded-3xl w-30 p-2 " type='submit'>login</button>
                        <div>Don't have an account ?
                             <Link to="/signup">SignUp</Link>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
                
            </div>
    </div>
  )
}

export default Login
