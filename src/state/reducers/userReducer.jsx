const userReducer = (list = [], action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...list, action.payload];
    case "EDIT_USER":
      let newArr = [...list];
      newArr[action.payload.id] = action.payload;
      return newArr;
    case "REMOVE_USER":
      let arr = [...list];
      arr.splice(action.payload, 1);
      return arr;
    default:
      return list;
  }
};
export default userReducer;
