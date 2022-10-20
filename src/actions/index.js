export const addtodo = (data) => {
    return {
        type: "ADD_TODO",
        payload: {
            data: data,
        }
    }
}

export const deletetodo = (index) => {
    return {
        type: "DELETE_TODO",
        index,
    }
}

export const updateTodo = (data, index) => {
    return {
        type: "EDIT_TODO",
        data,
        index,
    }
}

export const removetodo = () => {
    return {
        type: "REMOVE_TODO",
    }
}