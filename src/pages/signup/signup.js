import React from 'react'
import { useState } from 'react'
import "../signup/signup.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../firebaseconfig';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';



const Signup = () => {
  const [data, SetData] = useState({})
  const state = useSelector(state => state)
  const navigate = useNavigate()
  const getData = (e) => {
    let input = { [e.target.name]: e.target.value }
    SetData({ ...data, ...input })
  }

  let { email, password } = data

  const signup = (e) => {
    e.preventDefault()
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        alert("Successfull")
        await setDoc(doc(db, "user", res.user.uid), {
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
        <input type="email" placeholder='email' name='email' onChange={(e) => getData(e)} />
        <input type="password" placeholder='password' name='password' onChange={(e) => getData(e)} />
        <button type="submit" className="signupbtn">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup 