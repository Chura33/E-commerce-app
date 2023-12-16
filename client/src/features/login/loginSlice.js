import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    token: localStorage.getItem("token"),
    user:{},
    errors:[],
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        SUCCESSFUL_LOGIN: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.isAuthenticated = true;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { SUCCESSFUL_LOGIN} = loginSlice.actions;
// {type: "counter/increment"}
  
  export default loginSlice.reducer