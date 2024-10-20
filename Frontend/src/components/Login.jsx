import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/Animation.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import google from "../assets/google.png"
import insta from "../assets/instagram (2).png"
import twitter from "../assets/twitter (1).png"
import facebook from "../assets/facebook (1).png"
import { useState } from "react"
import { handleError, handleSuccess } from "../../Utility"



const Login = () => {
  
 

  const [ login, Setlogin ] = useState({
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
    const copyLogin = {...login};
    copyLogin[name] = value;
    Setlogin(copyLogin);
}
console.log('login ->', login)


const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    if ( !email || !password){
        return handleError("All Fields are Required")
    }
    else if (password.length < 4){
      return handleError("Password length must be atleast 4 characters long")
  }
  else if (!isChecked){
    return handleError("Please review the Terms & conditions")
}
    try {
        const url = "http://localhost:3000/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        });
        const result = await response.json();
        const {success, message} = result;
        if (success) {
            handleSuccess(message);
            setTimeout(() =>{
                navigate('/home')
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
    <div className="p-20 flex justify-center items-center   first-cnt    h-screen w-screen">
      <div className="flex justify-between gap-20  box-cnt-1 items-center">
        <div className="img-su-2  pr-20 img-su animated-container flex h-[600px]  justify-center items-center ">
          <img className=" h-[500px]" src={img} alt="kyu" />
        </div>
        <div className="si-div mr-6 items-start">
          <div className="sign-p ">
            <h1 className="text-5xl font-bold">Welcome Back</h1>
            <p className="mt-2">Sign in to continue your progress</p>
          </div>
          <form onSubmit={handleLogin} className="mt-10">
            {/* <div className="flex flex-col">
                <label htmlFor="name" className="mt-1">Name</label>
                <input
                    onChange={handleChange}
                    className="input-style mt-1" 
                    type="text"
                    name="name"
                    autoFocus
                    value={signup.name}
                    />
            </div> */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mt-1">
                Email
              </label>
              <input onChange={handleChange} value={login.email} className="input-style mt-1" type="email" name="email" />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="password" className="mt-1">
                Password
              </label>
              <input
                onChange={handleChange}
                className="input-style mt-1"
                type="password"
                name="password"
                value={login.password}
              />
            </div>
            <div className="flex items-center mt-2 ">
              <input
                 checked={isChecked} onChange={handleCheckboxChange}
                type="checkbox"
                className="mr-1 input-check"
                name=""
                id=""
              />{" "}
              I accept the{" "}
              <span className="ml-1 font-medium text-md"> Terms & Conditions</span>
            </div>
            <div className="flex flex-col">
              <button className="btn-btn mt-2 h-[60px] font-bold ">
                Sign up
              </button>
              <span className="justify-center flex mt-5">OR LOGIN WITH</span>
              <div className="social-media-icons justify-stretch  gap-16  mt-5 flex">
                <img src={insta} alt="" />
                <img src={facebook} alt="" />
                <img src={google} alt="" />
                <img src={twitter} alt="" />
              </div>
              <span className="mt-5">
                Don't have an account?{" "}
                <Link to="/signup" className="font-bold">
                  Register Here
                </Link>{" "}
              </span>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
