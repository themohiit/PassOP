import React , {useState} from "react";
import {Link,  useNavigate} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { handleError,handleSuccess } from "../utils";


function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const handleChange = (e)=>{
            const {name,value} = e.target;
            const copySignupInfo = {...signupInfo};
            copySignupInfo[name]= value;
            setSignupInfo(copySignupInfo);
    }
    const handleSignup = async (e)=>{
            e.preventDefault();

            const {name,email,password}=signupInfo;
            if(!name || !email || !password){
                return handleError('name, email and password are required')
            }
            try {const url = 'https://pass-op-api.vercel.app/auth/signup';
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            console.log(signupInfo)
            const result = await response.json();
            const {success,message,error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message);
            }
            console.log(result);
            }
        catch(err){
            handleError(err);
        }
        
        }


  return (
    <div className="bg-slate-600 h-[100vh] flex items-center justify-center">
        <div className="form bg-white  w-[40vw] h-[60vh] flex flex-col items-center text-center rounded-2xl">
            <h1 className="text-4xl font-bold mb-16">Sign up </h1>
            <form onSubmit={handleSignup} >
                <div>
                    <label htmlFor="name">Name</label>
                    <input className="m-2.5 p-2 rounded-2xl border" type="text"
                            onChange={handleChange}
                            name='name'
                            autoFocus
                            placeholder="Enter your name"
                            value={signupInfo.name} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input className="m-2.5 p-2 rounded-2xl border" type="email"
                            onChange={handleChange}
                            name = 'email'
                          
                            placeholder="Enter your email"
                            value={signupInfo.email} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input className="m-2.5 p-2 rounded-2xl border" type="password"
                            onChange={handleChange}
                            name='password'
                            
                            placeholder="Enter your password"
                            value={signupInfo.password} />
                </div>
                <button className="bg-blue-900 font-bold mb-5 text-white rounded-2xl p-2 " type='submit'>Signup</button>
                <div>Already have an account ?
                     <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Signup
