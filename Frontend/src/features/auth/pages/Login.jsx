import {React, useState} from 'react'
import {useNavigate, Link } from 'react-router'
import "../auth.forms.scss"
import { useAuth } from '../hooks/useAuth'
import { ClipLoader } from "react-spinners"

const Login = () => {

    const navigate = useNavigate()
    const {loading, handleLogin} = useAuth()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault()
        await handleLogin({email, password})
        navigate("/dashboard")
    }
     
 
  if(loading){
    return (
     <main className="loading-container">
       <ClipLoader color="#fa1867" size={40} />
       <p className="loading-text">
         please waitt...
       </p>
     </main>
   );
  }

  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input 
                    onChange={(e)=> setEmail(e.target.value)}
                    type="text" name='email' id='email' required  placeholder="Enter email address"/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                    onChange={(e)=> setPassword(e.target.value)}
                     type="password" name='password' id='password' placeholder="Enter password"/>
                </div>
                <button className='button primary-button'>login</button>
            </form>
            <p>dont have an account? <Link to={"/register"}>register</Link></p>
        </div>
    </main>
  )
}

export default Login
