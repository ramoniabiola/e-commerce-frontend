import {createSlice} from "@reduxjs/toolkit";
import { fetchUserCartStart,fetchUserCartSuccess,fetchUserCartFailure } from "./cartRedux";
import { userRequest } from "../requestMethod";



const userSlice = createSlice({
    name: "user", 
    initialState: {
        currentUser: null,
        isFetching: false,
        error:  false,
    },
    reducers: {
        // LOGIN USER 
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        
        },

        // LOGOUT USER 
        logout: (state) => {
            state.isFetching = false;
            state.currentUser = null;
        },
        
        // CREATE A NEW USER ACTION
        addUserStart: (state) => {
            state.isFetching = true;
            state.error = false;
        }, 
        addUserSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        addUserFailure: (state) => {
            state.isFetching = false
            state.error = true
        } 
    },
});

    
// Thunk action creator to fetch user's cart items
export const fetchUserCartOnLogin = (userId) => async (dispatch) => {
    try {
        // Dispatch fetchUserCartStart action
        dispatch(fetchUserCartStart());

        // Perform API call to fetch user's cart items
        const response = await userRequest.get(`/carts/find/${userId}`);
        if (response.status >= 200 && response.status < 300) {

            // Dispatch fetchUserCartSuccess action with the fetched data
            dispatch(fetchUserCartSuccess(response.data));      
        } else {
            // If the response status is not in the success range, handle the error
            throw new Error(response.data.error);
        }
    } catch (error) {
        // Dispatch fetchUserCartFailure action if there's an error
        dispatch(fetchUserCartFailure(error.response.data.error));
    }
};

export const { loginStart, loginSuccess, loginFailure, addUserStart, addUserSuccess, addUserFailure, logout } = userSlice.actions;
export default userSlice.reducer;
 