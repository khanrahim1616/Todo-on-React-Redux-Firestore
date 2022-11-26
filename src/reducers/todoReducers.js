import * as types from "../actions/types";

const initialData = {
  list: [],
  user: false,
  loading: true,
};

export const todoReducers = (state = initialData, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      const { data } = action.payload;
      return {
        ...state,
        list: [...state.list, data],
      };

    case types.DELETE_TODO:
      const newList = state.list.filter((e, index) => index !== action.index);
      return {
        ...state,
        list: newList,
      };

    case types.REMOVE_TODO:
      return {
        ...state,
        list: [],
      };

    case types.EDIT_TODO:
      const array = [...state.list];
      array[action.index] = action.data;
      return {
        ...state,
        list: array,
      };

    case types.USER_ID:
      return {
        ...state,
        user: action.payload,
        list: action.payload?.list,
        loading: false,
      };

    default:
      return state;
  }
};
