export const addUser = (form) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_USER",
      payload: form,
    });
  };
};
export const editUser = (form) => {
  return (dispatch) => {
    dispatch({
      type: "EDIT_USER",
      payload: form,
    });
  };
};

export const removeUser = (index) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_USER",
      payload: index,
    });
  };
};
