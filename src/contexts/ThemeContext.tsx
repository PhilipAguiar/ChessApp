import { createContext, useState } from "react";

type ContextType = {
  theme: string;
  themeSwitcher: Function;
};

const ThemeContext = createContext<ContextType>({
  theme: "default",
  themeSwitcher: Function,
});

const ThemeProvider = (props: any) => {
  const [theme, setTheme] = useState<string>("default");

  const themeSwitcher = (themeName: string) => {
    setTheme(themeName);
  };

  return (
    <>
      <ThemeContext.Provider value={{ theme, themeSwitcher }}>{props.children}</ThemeContext.Provider>
    </>
  );
};

export { ThemeContext, ThemeProvider };
