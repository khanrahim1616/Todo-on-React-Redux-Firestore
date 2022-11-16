import React from 'react'
import RoutesFile from './Routes'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { useDispatch, } from 'react-redux'
import { getUser } from "./actions/"
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseconfig"
import { USER_ID } from './actions/types';

const App = () => {
  const dispatch = useDispatch()
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {

        const docRef = doc(db, "user", user?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(getUser({ ...docSnap.data(), id: user?.uid }))
        } else {
          dispatch({ type: USER_ID, payload: false })
          console.log("No such document!");
        }
      }
      else { dispatch({ type: USER_ID, payload: false }) }
    })
  }, [])

  return (
    <div><RoutesFile /></div>
  )
}

export default App