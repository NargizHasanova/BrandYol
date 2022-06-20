import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Axios } from '../servicesAPI';

export const fetchUsersData = createAsyncThunk("users/fetchUsers",
    async () => {
        const { data } = await Axios.get("/brandyol-users.json")
        console.log('getData',data);
        return data
    }
)

export const postUsersData = createAsyncThunk("users/postUsers",
    async () => {
        const { data } = await Axios.post("/brandyol-users.json")
        console.log('postData',data);
        return data
    }
)

export const userSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        pendingGet: false,
        pendingPost: false,
        errorGet: false, 
        errorPost: false, 
    },
    reducers: {
        checkUser: () => {
            console.log("checkuser");
        }
    },
    extraReducers: {
        [fetchUsersData.pending]: (state) => {
            state.pendingGet = true
            state.errorGet = false
        },
        [fetchUsersData.fulfilled]: (state, { payload }) => {
            console.log('fulfilled');
            state.pendingGet = false
            // burda datamiz object seklinde gelir bunu []-ye cevirmeliyik
            state.data = payload
        },
        [fetchUsersData.rejected]: (state, action) => {
            console.log('rejected');
            state.errorGet = action.error.message
            state.pendingGet = false
        },
        [postUsersData.pending]: (state) => {
            state.pendingPost = true
            state.errorPost = false
        },
        [postUsersData.fulfilled]: (state) => {
            console.log('fulfilled');
            state.pendingPost = false
        },
        [postUsersData.rejected]: (state, action) => {
            console.log('rejected');
            state.errorPost = action.error.message
            state.pendingPost = false
        },
    }
})


export const { checkUser } = userSlice.actions
export default userSlice.reducer