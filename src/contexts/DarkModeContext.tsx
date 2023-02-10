import { createContext, useState } from "react";

type ContextType = {
  darkMode: boolean;
  toggleMode: () => void;
};

const DarkModeContext = createContext<ContextType>({
  darkMode: false,
  toggleMode: () => {},
});

const DarkModeProvider = (props: any) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleMode = () => {
    setDarkMode((prevValue) => (prevValue === false ? true : false));
  };

  return (
    <>
      <DarkModeContext.Provider value={{ darkMode, toggleMode }}>{props.children}</DarkModeContext.Provider>
    </>
  );
};

export { DarkModeContext, DarkModeProvider };
