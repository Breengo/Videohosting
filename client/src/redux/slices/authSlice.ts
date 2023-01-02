import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

const fetchIsAuth = createAsyncThunk('user/fetchIsAuthStatus', async (token: string) => {
  const response = await axios.get('/user/auth', {
    headers: {
      authorization: token,
    },
  });
  return response.data;
});

interface UserData {
  name: string;
  email: string;
  image: string;
  id: number;
}

interface isAuthState {
  data: UserData | null;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  data: null,
  status: 'idle',
} as isAuthState;

const authSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    userQuit: (state) => {
      state.status = 'idle';
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIsAuth.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(fetchIsAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchIsAuth.rejected, (state, action) => {
      state.status = 'failed';
      state.data = null;
    });
  },
});

export { fetchIsAuth };
export const { userQuit } = authSlice.actions;

export default authSlice.reducer;
