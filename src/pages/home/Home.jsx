import React, { useState } from 'react'
import { USER_ID } from '../../actions/types';
import { useDispatch, useSelector } from 'react-redux'
import { addtodo, deletetodo, removetodo, updateTodo } from '../../actions'
import { getAuth, signOut } from "firebase/auth";
import './todo.css'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebaseconfig';
import { useNavigate } from 'react-router';


const Todo = () => {
    const navigate = useNavigate()
    const [inputData, SetInputDdata] = useState('')
    const dispatch = useDispatch()
    const auth = getAuth()
    const state = useSelector(state => state)
    const username = state.user.username
    const [index, setIndex] = useState('')
    const [toggle, setToggle] = useState(true)

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(db, "user", state.user.id), { list: [...state.list, inputData] });
        dispatch(addtodo(inputData));

        SetInputDdata('')
    }

    const update = async (e) => {
        let updatedData = [...state.list]
        updatedData[index] = inputData
        e.preventDefault();
        await updateDoc(doc(db, "user", state.user.id), { list: updatedData });
        dispatch(updateTodo(inputData, index));
        setToggle(true); SetInputDdata("")
        setIndex('')
    }

    const edit = (e, i) => { SetInputDdata(e); setIndex(i); setToggle(false) }

    const cancel = () => {
        setToggle(true); SetInputDdata("")
    }

    const deletes = async (i) => {
        const deleteIndex = state.list.filter((e, index) => i !== index)
        await updateDoc(doc(db, "user", state.user.id), { list: deleteIndex });
        dispatch(deletetodo(i))
    }

    const remove = async () => {
        await updateDoc(doc(db, "user", state.user.id), { list: [] });

    }

    const signOutUser = () => {
        signOut(auth).then(() => {
            alert("are you sure?")
            dispatch({ type: USER_ID, payload: false })
            navigate("/")
        }).catch((error) => {
            alert(" An error happened.")
        });
    }

    return (
        <div className='main-div'>
            <div className='child-div'>
                <div className='logout'>
                    <h1 className='username'>Hi! {username}</h1>
                    <button className='logout1' onClick={signOutUser} >LogOut</button>
                </div>
                <h1>
                    Add Your List Here <i className="fa-solid fa-solid fa-hand-peace add" />
                </h1>
                <div className='addItems'>
                    <form onSubmit={toggle ? onSubmit : update}>
                        <input type="text"
                            maxLength={80}
                            value={inputData}
                            onChange={(event) => SetInputDdata(event.target.value)}
                        />
                        {
                            toggle ?
                                <div>
                                    <button className='addbtn' disabled={!inputData?.trim()}>
                                        ADD
                                    </button>
                                </div>
                                :
                                <div>
                                    <button disabled={!inputData?.trim()} className='addbtn' >
                                        Update
                                    </button>
                                    <button className='addbtn' onClick={cancel}>Cancel</button>
                                </div>
                        }
                    </form>
                </div>
                <div className='completeData'>
                    {
                        state?.list.map((e, i) => {
                            return (
                                <div key={i} className='list' >
                                    <div className='data'>
                                        <p>
                                            {e}
                                        </p>
                                    </div>
                                    <div className='btns'>
                                        <button onClick={() => { edit(e, i) }} className='add1'>
                                            <i className="fa-sharp fa-solid fa-pen-to-square"
                                            ></i>
                                        </button>
                                        <button onClick={() => deletes(i)} disabled={!toggle} className='add1'>
                                            <i className="fa-solid fa-trash-can"
                                            ></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    <div>
                        {state?.list.length > 0 ?
                            <button className='remove' disabled={!toggle}
                                onClick={() => { dispatch(removetodo()); remove() }}>Remove-All</button> : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo 