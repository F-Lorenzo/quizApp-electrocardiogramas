import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../common/models/user.model";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    updateUser: (state, action) => (state = action.payload),
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
