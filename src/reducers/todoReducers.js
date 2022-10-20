const initialData = {
    list: []
}

// const getlocalstorage = () => {
//     let list = localStorage.getItem('list')
//     console.log(list);
//     if (list) {
//         return JSON.parse(localStorage.getItem('list'))
//     } else {
//         return []
//     }
// }

export const todoReducers = (state = initialData, action) => {

    switch (action.type) {

        case "ADD_TODO":

            const { data } = action.payload;
            return {
                ...state, list: [
                    ...state.list,
                    data,
                ]
            }
        case "DELETE_TODO":

            const newList = state.list.filter((e, index) => index !== action.index)
            return {
                ...state,
                list: newList,
            }

        case "REMOVE_TODO":

            return {
                ...state,
                list: []
            }

        case "EDIT_TODO":
            const array = [...state.list]
            array[action.index] = action.data
            return {
                ...state,
                list: array,



            }

        default: return state
    }
}