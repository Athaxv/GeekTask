import { Link, useNavigate } from "react-router-dom"
import imgright from '../assets/Animation 2.png'
import { useState } from "react"
import { handleError, handleSuccess } from "../../Utility"
import { ToastContainer } from "react-toastify"
import google from "../assets/google.png"
import insta from "../assets/instagram (2).png"
import twitter from "../assets/twitter (1).png"
import facebook from "../assets/facebook (1).png"

const Signup = () => {
    
    const [ signup, Setsignup ] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [isChecked, setIsChecked] = useState(false);
      
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };
  

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignup = {...signup};
        copySignup[name] = value;
        Setsignup(copySignup);
    }
    console.log('signup ->', signup)


    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signup;
        if (!name || !email || !password ){
            return handleError("All Fields are Required")
        }
        else if (password.length < 4){
            return handleError("Password length must be atleast 4 characters long")
        }
        else if (!isChecked){
            return handleError("Please review the Terms & conditions")
        }
        try {
            const url = "http://localhost:3000/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signup)
            });
            const result = await response.json();
            const {success, message} = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() =>{
                    navigate('/login')
                }, 2000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success){
                handleError(message);
            }
            console.log(result)
        } catch (err) {
            handleError(err);
        }
    }

     

    return (
    <div className="p-20 flex justify-center items-center  first-cnt    h-screen w-screen">
    <div className="flex justify-between box-cnt-2  gap-20 items-center">
    <div className="si-div ml-8 items-start">
        <div className="sign-p mt-5  ">
            <h1 className="text-5xl font-bold">Register Yourself</h1>
            <p className="mt-2">Begin your journey with us today</p>
        </div>
        <form onSubmit={handleSignup} className="mt-10 form-form">
            <div className="flex flex-col ">
                <label htmlFor="name" className="mt-1">Name</label>
                <input
                    onChange={handleChange}
                    className="input-style mt-1 " 
                    type="text"
                    name="name"
                    autoFocus
                    value={signup.name}
                    />
            </div>
            <div className="flex flex-col">
                <label htmlFor="email" className="mt-1">Email</label>
                <input 
                    onChange={handleChange}
                    className="input-style mt-1"
                    type="email"
                    name="email"
                    value={signup.email}
                    />
            </div>
            <div className="flex flex-col">
                <label htmlFor="password" className="mt-1">Password</label>
                <input 
                    onChange={handleChange}
                    className="input-style mt-1"
                    type="password"
                    name="password"
                    value={signup.password}
                    />
            </div>
            <div className="flex items-center mt-2 ">
                <input type="checkbox"  checked={isChecked} onChange={handleCheckboxChange} className="mr-1 input-check" name=""  id="" />  I accept the <span className="ml-1 font-medium"> Terms & Conditions</span>
            </div>
            <div className="flex flex-col">
            <button  className="btn-btn mt-2 h-[60px] font-bold ">Sign up</button>
            <span className="justify-center flex mt-5">OR SIGN UP WITH</span>
            <div className="social-media-icons  justify-stretch  gap-20  mt-3 flex">
                <img src={insta} alt="" />
                <img src={facebook} alt="" />
                <img src={google} alt="" />
                <img src={twitter} alt="" />
              </div>
            <span className="mt-3 mb-5 container">Already signed up? <Link to="/login" className="font-bold">Click Here</Link> </span>
            </div>
        </form>
        <ToastContainer/>
    </div>
    <div className="img-su h-[640px] pr-20  flex justify-center items-center">
        <img className=" h-[500px] img-img" src={imgright} alt="kyu" />
    </div>
    </div>
    </div>
  )
}

export default Signup
