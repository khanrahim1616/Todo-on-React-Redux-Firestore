import React, { useState } from 'react'
import './todo.css'
import { useDispatch, useSelector } from 'react-redux'
import { addtodo, deletetodo, removetodo, updateTodo } from '../actions'


const Todo = () => {
    const [inputData, SetInputDdata] = useState('')
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [index, setIndex] = useState('')
    const [toggle, setToggle] = useState(true)
    const onSubmit = (e) => { e.preventDefault(); dispatch(addtodo(inputData)); SetInputDdata('') }
    const update = (e) => {
        e.preventDefault(); dispatch(updateTodo(inputData, index));
        setToggle(true); SetInputDdata("")
        setIndex('')
    }
    const edit = (e, i) => { SetInputDdata(e); setIndex(i); setToggle(false) }
    const cancel = () => {
        setToggle(true); SetInputDdata("")
    }

    return (
        <div className='main-div'>
            <div className='child-div'>
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
                                <div className='list' >
                                    <div className='data'>
                                        <p>
                                            {e}
                                        </p>
                                    </div>
                                    <div className='btns'>
                                        <button onClick={() => { edit(e, i) }} className='add1'>
                                            <i class="fa-sharp fa-solid fa-pen-to-square"
                                            ></i>
                                        </button>
                                        <button onClick={() => dispatch(deletetodo(i))} disabled={!toggle} className='add1'>
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
                            <button className='remove'
                                onClick={() => dispatch(removetodo())}>Remove-All</button> : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo