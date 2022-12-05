import React from 'react'
import { useState } from 'react'
import "../signup/signup.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebaseconfig';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";



const Signup = () => {
  const [data, SetData] = useState({})
  const navigate = useNavigate()
  const getData = (e) => {
    let input = { [e.target.name]: e.target.value }
    SetData({ ...data, ...input })
  }

  let { username, email, password } = data
  const signup = (e) => {
    e.preventDefault()
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        alert("Successfull")
        await setDoc(doc(db, "user", res.user.uid), {
          username: username,
          email: email,
          list: [],
        });
        navigate("/Home")
      })
      .catch((error) => {
        alert(error)
      });
  }
  return (
    <div >
      <form className='signup' onSubmit={signup}>
        <h1 className='p'>Sign up</h1>
        <input required type="text" maxLength={12} placeholder='username' name='username' onChange={(e) => getData(e)} />
        <input required type="email" placeholder='email' name='email' onChange={(e) => getData(e)} />
        <input required type="password" placeholder='password' name='password' onChange={(e) => getData(e)} />
        <button type="submit" className="signupbtn">Sign Up</button>
        <p className='signuplink'>
          Already have an account
          <span className='signuplink'>
            <Link to="/" >Log-in</Link>
          </span>
        </p>

      </form>
    </div>
  )
}

export default Signup 
