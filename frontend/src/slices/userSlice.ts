import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Friend {
  friend: {
    id: number;
    username: string;
  };
}

interface FriendRequest {
  id: number;
  sender: {
    username: string;
  };
}

interface UserState {
  id: number | null;
  isRegistered: boolean;
  monsters: { id: number; name: string }[];
  friends: Friend[];
  friendRequests: FriendRequest[];
}

const initialState: UserState = {
  id: localStorage.getItem('id') ? parseInt(localStorage.getItem('id') as string, 10) : null,
  isRegistered: false,
  monsters: [],
  friends: [],
  friendRequests: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      localStorage.setItem('id', action.payload.id ? action.payload.id.toString() : '');
      return { ...state, ...action.payload };
    },
    logout(state) {
      localStorage.removeItem('id');
      return { ...initialState, id: null };
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
