import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    updateUserState: (state, action) => (state = action.payload),
  },
});

export const { updateUserState } = userSlice.actions;
export default userSlice.reducer;
