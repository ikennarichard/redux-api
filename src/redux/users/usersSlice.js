import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoading: false,
  error: undefined,
}

//action creator
export const fetchUsers = createAsyncThunk('users/fetchUsers', 
async (rejectWithValue) => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=1');
    const data = await response.json()
    return data

  } catch(e) {
   return rejectWithValue(e.response.data)
  }
}
)

export const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending,(state) => {
      state.isLoading = true;
    })

    builder.addCase(fetchUsers.fulfilled,(state, action) => {
      state.isLoading = false;
      state.users.push(action.payload.results[0].name)
    })

    builder.addCase(fetchUsers.rejected,(state) => {
      state.isLoading = false;
      state.error = 'Error loading users'

    })
  }
});

export default userSlice.reducer;