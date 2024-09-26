import React, { useRef, useState, useEffect } from 'react'
import { RiLockStarLine } from "react-icons/ri";
import { RiFileLockLine } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import {v4 as uuidv4} from 'uuid';

const Manager = () => {

    const [isPasswordVisible, setisPasswordVisible] = useState(false)
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const ref = useRef()

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        setisPasswordVisible(!isPasswordVisible)
        if (ref.current.type === "password") {
            ref.current.type = "text";
        } else {
            ref.current.type = "password";
        }

    }

    const savePassword = () => {
        if(form.site.length>3 && form.password.length>3 && form.username.length>3){

            setPasswordArray([...passwordArray, {...form, id:uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
            setform({site: "", username: "", password: "" })
            console.log([...passwordArray, form])
        }
        else{
            toast('Error: Not saved!', {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });  
        }
    }
    const deletePassword = (id) => {
        console.log("Delete", id);
        let c = confirm("Do you want to delete this?")
        if(c){

            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            
        }
        // console.log([...passwordArray, form])
    }

    const editPassword = (id) =>{
        console.log("Edit", id)
        setform(passwordArray.filter(item=>item.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    return (

        <>
        
        <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />


            <div className='flex flex-col justify-center items-center mx-auto text-white my-20 max-w-5xl px-4 sm:px-6 lg:px-8'>
  <div className="main-text flex flex-col justify-center items-center gap-2 my-3">
    <div className='text-center font-semibold text-2xl sm:text-3xl flex justify-center items-center'>
      <RiLockStarLine />
      <span>Pass</span><span className='text-gray-400'>HOLD</span>
    </div>
    <div><span className='text-sm sm:text-base text-gray-400 text-center'>Your Strong-Hold For Passwords</span></div>
  </div>

  <div className="inputs flex flex-col justify-center items-center gap-3 w-full">
    <div className="url w-full">
      <input onChange={handleChange} value={form.site} placeholder='Enter URL' className='rounded-full w-full text-black p-2 sm:p-3' type="text" name="site" />
    </div>
    <div className="up flex flex-col sm:flex-row gap-4 w-full">
      <div className='w-full'>
        <input onChange={handleChange} value={form.username} placeholder='Enter Username' className='w-full rounded-full text-black p-2 sm:p-3' type="text" name='username' />
      </div>
      <div className='w-full '>
        <div className='flex gap-2 justify-center items-center'>
        <input onChange={handleChange} value={form.password} placeholder='Enter Password' className='w-full rounded-full text-black p-2 sm:p-3' type={isPasswordVisible ? "text" : "password"} ref={ref} name='password' />
        <span className='bg-white rounded-[40%] px-1 py-1' onClick={showPassword}>
          {isPasswordVisible ? (<FaRegEyeSlash className=' text-gray-800 cursor-pointer' />) :
            (<FaRegEye className=' text-gray-800 cursor-pointer' />)}
        </span>
        </div>
      </div>
    </div>
  </div>

  <div>
    <button onClick={savePassword} className="save bg-gray-600 border my-6 py-1 px-5 mx-3 rounded-full flex justify-center gap-1 items-center text-sm sm:text-base">
      <RiFileLockLine />Save
    </button>
  </div>

  <div className="passwords w-full">
    <h2 className='py-3 font-semibold text-lg text-[#ced1d3]'>Your Passwords</h2>
    {passwordArray.length === 0 && <div>No passwords to show</div>}
    {passwordArray.length !== 0 && (
      <table className="table-auto w-full mt-2 rounded-md overflow-hidden">
        <thead className='bg-[#171722] text-white'>
          <tr>
            <th className='py-2 text-xs sm:text-base'>Site</th>
            <th className='py-2 text-xs sm:text-base'>Username</th>
            <th className='py-2 text-xs sm:text-base'>Password</th>
            <th className='py-2 text-xs sm:text-base'>Actions</th>
          </tr>
        </thead>
        <tbody className='bg-[#0A0A0A]'>
          {passwordArray.map((item, index) => (
            <tr key={index}>
              <td className='text-center py-2 border border-gray-800 text-xs sm:text-base overflow-hidden'>
                <div className='flex justify-center items-center gap-2'>
                  <a href={item.site} target="_blank">{item.site}</a>
                  <IoCopy onClick={() => { copyText(item.site) }} className='cursor-pointer' />
                </div>
              </td>
              <td className='text-center py-2 border border-gray-800 text-xs sm:text-base overflow-hidden'>
                <div className='flex justify-center items-center gap-2'>
                  {item.username}
                  <IoCopy onClick={() => { copyText(item.username) }} className='cursor-pointer' />
                </div>
              </td>
              <td className='text-center py-2 border border-gray-800 text-xs sm:text-base overflow-hidden'>
                <div className='flex justify-center items-center gap-2'>
                  {item.password}
                  <IoCopy onClick={() => { copyText(item.password) }} className='cursor-pointer' />
                </div>
              </td>
              <td className='text-center py-2 border border-gray-800'>
                <div className='flex justify-center items-center gap-4 sm:gap-6'>
                  <CiEdit onClick={() => { editPassword(item.id) }} className='cursor-pointer w-4 h-4 sm:w-5 sm:h-5' />
                  <MdDeleteOutline onClick={() => { deletePassword(item.id) }} className='cursor-pointer w-4 h-4 sm:w-5 sm:h-5' />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>

        </>
    )
}

export default Manager
