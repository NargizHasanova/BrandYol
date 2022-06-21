import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Axios } from '../servicesAPI';

export const fetchUsersData = createAsyncThunk("users/fetchUsers",
    async () => {
        const { data } = await Axios.get("/brandyol-users.json")
        console.log('getData', data);
        return data
    }
)

export const postUsersData = createAsyncThunk("users/postUsers",
    async (signUpData) => {
        await Axios.post("/brandyol-users.json", signUpData)
    }
)

export const userSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        signedIn: false,
        signedInEmail: '',
        pendingGet: false,
        pendingPost: false,
        errorGet: false,
        errorPost: false,
    },
    reducers: {
        checkUser: (state, { payload }) => {
            state.data.map(item => {
                if (item.email === payload.email && item.password === payload.password) {
                    console.log('you signed In !!');
                    state.signedIn = true
                } else {
                    console.log("user does not exist!");
                }
                return item
            })
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
            for (let key in payload) {
                state.data = [...state.data, payload[key]]
            }
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
            state.signedIn = true
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