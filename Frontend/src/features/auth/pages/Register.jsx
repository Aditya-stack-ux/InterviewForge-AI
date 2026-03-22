import {React, useState} from 'react'
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { ClipLoader } from 'react-spinners';

const Register = () => {

  const {loading, handleRegister} = useAuth()
  const navigate = useNavigate()
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async(e)=>{
        e.preventDefault();
        await handleRegister({username, email, password})
        navigate("/dashboard")
    }

    if(loading) {
    return(
        <main>
            <ClipLoader color="#f33939" size={40} />
        </main>
    )
}

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                    onChange={(e)=>{setUsername(e.target.value)}}
                     type="text" name='username' id='username' placeholder="Enter username"/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e)=>{setEmail(e.target.value)}} 
                    type="text" name='email' id='email' placeholder="Enter email address"/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                    onChange={(e)=>{setPassword(e.target.value)}} 
                    type="text" name='password' id='password' placeholder="Enter password"/>
                </div>
                <button className='button primary-button'>Register</button>
            </form>
            <p>already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register
