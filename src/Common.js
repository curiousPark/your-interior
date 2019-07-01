
  export const reducer = (state, action) => {
    return {
        ...state,
        [action.name]: action.value
    };
}

