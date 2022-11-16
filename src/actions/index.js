import * as types from "./types"

export const addtodo = (data) => {
    return {
        type: types.ADD_TODO,
        payload: {
            data: data,
        }
    }
}

export const deletetodo = (index) => {
    return {
        type: types.DELETE_TODO,
        index,
    }
}

export const updateTodo = (data, index) => {
    return {
        type: types.EDIT_TODO,
        data,
        index,
    }
}

export const removetodo = () => {
    return {
        type: types.REMOVE_TODO,
    }
}

export const getUser = (payload) => {
    return {
        type: types.USER_ID,
        payload,
    }
}