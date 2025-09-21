import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
// import { FaRegCopy } from "react-icons/fa";
import { MdOutlineContentCopy, MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';





function Manager() {

  const token = localStorage.getItem('token');
  const [form, setform] = useState({ username: "", website: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const fetchpassword = async () => {

    const url = "http://localhost:8080/auth/passwords";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })

      const data = await response.json();
      setpasswordArray(data);
    }
    catch (err) {
      toast.error(err);
    };

  }


  useEffect(() => {
    try {
      const password = fetchpassword();
      console.log(passwordArray);
    } catch (error) {
      console.error("Failed to parse passwords from localStorage", error);

    }
  }, []);


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
    // console.log(form)
  }

  const savePassword = async () => {
    if (form.website.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setpasswordArray([...passwordArray, { ...form, id2: uuidv4() }])
      const url = "http://localhost:8080/auth/passwords";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            website: form.website,
            username: form.username,
            password: form.password,
          }),
        })
        toast.success("Password Added Successfully");
      }
      catch (err) {
        toast.error(err);
      }

    }
    else {
      toast.error("All fields must be longer than 3 characters!");
    }
  }


  const copyText = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast("Copied to Clipboard")
      })
      .catch((e) => {
        toast.error("failed to copy")
        console.error(e)
      })
  }

  const deletePassword = async (id) => {
    const confirmDelete = window.confirm("Do you really want to delete this password?");
    if (!confirmDelete) return;
    const token = localStorage.getItem('token');
    try {
      // Call your backend delete API
      const response = await fetch(`http://localhost:8080/auth/passwords/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        // Update the frontend state
        setpasswordArray(passwordArray.filter(item => item._id !== id));
        toast.success("Password deleted successfully");
      } else {
        toast.error(result.message || "Failed to delete password");
      }
    } catch (error) {
      toast.error("Server error while deleting password");
      console.error(error);
    }
  };




  return (
    <div className='h-[90vh] bg-gradient-to-r from-gray-700 to-stone-600    '>
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} />
      <div className="flex flex-col justify-center items-center">

        <div className="flex gap-2 p-2 items-center justify-center">

          <input value={form.website} onChange={handleChange} className="bg-green-200  text-black w-[40vw] m-2 h-9 p-2 rounded-2xl" placeholder='Enter Site Name' type="text" name='website' />
          <input value={form.username} onChange={handleChange} className="bg-green-200 text-black w-[20vw] m-2 h-9 p-2 rounded-2xl" placeholder='Enter Your Username' type="text" name='username' />

        </div>
        <input value={form.password} onChange={handleChange} className="bg-green-200 text-black w-[50vw] m-2 h-9 p-2 rounded-2xl" placeholder='Password' type="password" name='password' />
        <button onClick={savePassword} className='bg-green-800 text-white rounded-2xl h-10 w-50'> Save Password</button>
      </div>


      <div className="passwords flex justify-center m-2 gap-10 items-center">
        <div className='bg-gray-800 h-[60vh] rounded-2xl'>


          <table className="table-auto w-[80vw] rounded-md overflow-hidden mb-10 mt-5 border-separate">
            <thead className=' text-white '>
              <tr>
                <th>Sites</th>
                <th>Username</th>
                <th>Passwords</th>
              </tr>
            </thead>
            <tbody className='text-center text-white mt-10 bg-gray-500'>
              {Array.isArray(passwordArray) && passwordArray.map((item, index) => {
                return <tr key={item._id}>

                  <td><div className='flex justify-center items-center gap-5 '>
                    {item.website}
                    <div className='cursor-pointer' onClick={() => { copyText(item.website) }}><MdOutlineContentCopy /></div>
                  </div>
                  </td>

                  <td>{item.username}</td>



                  <td ><div className='flex justify-center items-center gap-5 '>
                    {item.password} <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                      <MdOutlineContentCopy />

                    </div> <div className='cursor-pointer' onClick={() => { deletePassword(item._id) }}>
                      <MdDeleteOutline size={20} />
                    </div>
                  </div></td>
                </tr>

              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Manager
