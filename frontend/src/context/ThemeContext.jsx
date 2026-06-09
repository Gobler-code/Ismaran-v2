import { createContext, useContext, useState } from 'react'

// 1. Create the context
const ThemeContext = createContext()

// 2. Provider component — holds the darkMode state
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);
  // return ThemeContext.Provider with value
  return <ThemeContext.Provider value={{darkMode, setDarkMode}}>{children}</ThemeContext.Provider>
}

// 3. Custom hook to use the context
export function useTheme() {
  return useContext(ThemeContext)
}