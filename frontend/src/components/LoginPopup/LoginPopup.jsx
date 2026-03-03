
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login");
    const {url,token,setToken} = useContext(StoreContext)
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler= (event) =>{
         const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandler = async (event) =>{
       event.preventDefault();
       let newUrl = url
       if (currState==="Login") {
        newUrl += "/api/user/login"
       } else {
        newUrl += "/api/user/register"
       }
       try {
        const response = await axios.post(newUrl,data)
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }else{
            alert(response.data.message)
        }
       } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
        console.log(error);
       }

    }

    return (
        <div className='fixed inset-0 z-1000 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-300'>
            
            <form
            onSubmit={onSubmitHandler}
            className="bg-white w-full max-w-112.5 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                
                {/* Header Section */}
                <div className="bg-[#fffaf5] px-8 py-8 flex justify-between items-center border-b border-gray-100">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">{currState}</h2>
                        <p className="text-gray-500 text-sm font-medium mt-1">Join the Urban Plates community</p>
                    </div>
                    <button 
                        type="button"
                        onClick={() => setShowLogin(false)}
                        className="p-2 hover:bg-gray-200/50 rounded-full transition-colors group"
                    >
                        <img src={assets.cross_icon} alt="Close" className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                    </button>
                </div>

                {/* Form Fields */}
                <div className="p-8 flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        {currState === "Sign Up" && (
                            <div className="relative">
                                <input 
                                    onChange={onChangeHandler}
                                    name='name'
                                    value={data.name}
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium placeholder:text-gray-400"
                                    type="text" 
                                    placeholder='Full Name' 
                                    required 
                                />
                            </div>
                        )}
                        <input 
                            onChange={onChangeHandler}
                            name='email'
                            value={data.email}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium placeholder:text-gray-400"
                            type="email" 
                            placeholder='Email address' 
                            required 
                        />
                        <input 
                            onChange={onChangeHandler}
                            name='password'
                            value={data.password}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#ff5a00] focus:ring-4 focus:ring-[#ff5a00]/10 transition-all text-gray-900 font-medium placeholder:text-gray-400"
                            type="password" 
                            placeholder='Password' 
                            required 
                        />
                    </div>
                    {/* Terms & Condition */}{currState==="Sign Up"&&(

                        <div className="flex items-start gap-3 mt-2">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-[#ff5a00] focus:ring-[#ff5a00]" required />
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">
                            I agree to the <span className="text-[#ff5a00] font-bold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-[#ff5a00] font-bold cursor-pointer hover:underline">Privacy Policy</span>.
                        </p>
                    </div>
                    )}

                    <button 
                        type="submit"
                        className="w-full py-4 bg-[#ff5a00] text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(255,90,0,0.3)] hover:bg-[#e65100] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                    >
                        {currState === "Sign Up" ? "Create Account" : "Login"}
                    </button>

                    {/* Google Auth Option */}
                    <div className="relative my-2">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-400 font-bold tracking-widest">Or continue with</span></div>
                    </div>

                    <button 
                        type="button"
                        className="w-full py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                    >
                        <img src={assets.google_icon} alt="" className="w-5" />
                        Google
                    </button>

                </div>

                {/* Footer Toggle */}
                <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                    {currState === "Sign Up" ? (
                        <p className="text-gray-600 font-medium">
                            Already have an account? 
                            <button 
                                type='button' 
                                onClick={() => setCurrState("Login")} 
                                className="ml-2 text-[#ff5a00] font-bold hover:underline transition-all"
                            >
                                Login here
                            </button>
                        </p>
                    ) : (
                        <p className="text-gray-600 font-medium">
                            New to Urban Plates? 
                            <button 
                                type='button' 
                                onClick={() => setCurrState("Sign Up")} 
                                className="ml-2 text-[#ff5a00] font-bold hover:underline transition-all"
                            >
                                Create an account
                            </button>
                        </p>
                    )}
                </div>
            </form>
        </div>
    )
}

export default LoginPopup