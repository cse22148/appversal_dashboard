import { configureStore } from "@reduxjs/toolkit"
import membersReducer from "./slices/membersSlice"
import roleReducer from "./slices/roleSlice"
import themeReducer from "./slices/themeSlice"

export const store = configureStore({
  reducer: {
    members: membersReducer,
    role: roleReducer,
    theme: themeReducer,
  },
})
