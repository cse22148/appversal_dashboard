import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  darkMode: false,
  isDarkMode: false, // mirror for components reading isDarkMode
  rtlMode: false,
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      state.isDarkMode = state.darkMode // keep in sync
    },
    toggleRtlMode: (state) => {
      state.rtlMode = !state.rtlMode
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
      state.isDarkMode = action.payload // keep in sync
    },
    setRtlMode: (state, action) => {
      state.rtlMode = action.payload
    },
  },
})

export const { toggleDarkMode, toggleRtlMode, setDarkMode, setRtlMode } = themeSlice.actions
export default themeSlice.reducer
