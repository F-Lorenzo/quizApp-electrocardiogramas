import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { id: "", firstName: "", lastName: "", email: "", pwd: "" },
  reducers: {},
});

export default userSlice.reducer;
