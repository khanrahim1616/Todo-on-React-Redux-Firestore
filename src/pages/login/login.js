import React from 'react'
import { useState } from 'react'
import "../signup/signup.css"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';

const Login = () => {
    const [data, SetData] = useState({})
    const navigate = useNavigate();
    const auth = getAuth()
    const getData = (e) => {
        let input = { [e.target.name]: e.target.value }
        SetData({ ...data, ...input })
    }

    let { email, password } = data

    const signinuser = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                navigate("/Home")
            })
            .catch((error) => {
                alert(error)
            });
    }
    
    return (
        <div >
            <form className='signup' onSubmit={signinuser}>
                <h1 className='p'>Log in</h1>
                <input required type="email" placeholder='email' name='email' onChange={(e) => getData(e)} />
                <input required type="password" placeholder='password' name='password' onChange={(e) => getData(e)} />
                <p className='p'>If you dont have account
                    <span className='signuplink'>
                        <Link to="/signup" >Sign Up</Link>
                    </span>
                </p>
                <button type="submit" className="signupbtn">Log in</button>
            </form>
        </div>
    )
}
export default Login 