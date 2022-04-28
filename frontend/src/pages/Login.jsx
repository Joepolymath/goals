import Header from "../components/Header"
import { useState, useEffect } from "react"
import {FaSignInAlt} from 'react-icons/fa';

function Login() {
       const [formData, setFormData] = useState({
              email: '',
              password: '',
       })

       const {email, password} = formData;

       const handleChange = (e) => {
              setFormData((prevState)=>({
                     ...prevState,
                     [e.target.name]: e.target.value
              }))
       }
       const handleSubmit = (e) => {
              e.preventDefault();
       }
  return (
    <>
         <section className="heading">
                <h1>
                       <FaSignInAlt /> Login
                </h1>
                <p>Login and Set you Goals</p>
       </section>  

       <section className="form">
              <form onSubmit={handleSubmit}>

                     {/* email */}
                     <div className="form-group">
                            <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            name="email" 
                            value={email} 
                            placeholder="Enter Your Email" 
                            onChange={handleChange} 
                            />
                     </div>

                     {/* password */}
                     <div className="form-group">
                            <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            name="password" 
                            value={password} 
                            placeholder="Enter Your Password" 
                            onChange={handleChange} 
                            />
                     </div>


                     {/* button */}
                     <div className="form-group">
                            <button type="submit" className="btn btn-block">
                                   Submit
                            </button>
                     </div>
              </form>
       </section>
    </>
  )
}

export default Login;