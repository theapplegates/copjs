import classNames from 'classnames';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme type definition
type Theme = 'light' | 'dark';

// The props for the theme context
interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Create a context for the default value
const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {}
});

type Props = {
  children: React.ReactNode;
};

// The theme provider
const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>('light'); // Set the default theme

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme'); // Get the theme from local storage

    if (storedTheme) {
      setTheme(storedTheme as any); // Set the theme from local storage if it exists
    }
  }, []);

  // Toggle the theme
  const toggleTheme = () => {
    const mode = theme === 'light' ? 'dark' : 'light'; // Get the opposite theme from the current theme

    setTheme(mode); // Update the theme
    localStorage.setItem('theme', mode); // Store the theme
  };

  // Return the provider
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={classNames('h-full w-full', theme)}>{children}</div>
    </ThemeContext.Provider>
  );
};

// Get the theme context
const useTheme = (): ThemeContextProps => useContext(ThemeContext);

// Export the theme provider and the theme context
export { ThemeProvider, useTheme };
