// theme.js
import { useTheme } from './context/ThemeProvider';

const SomeComponent = () => {
  const { theme, setTheme } = useTheme(); // Ensure useTheme is used inside ThemeProvider

  return <div>Current theme: {theme}</div>;
};
