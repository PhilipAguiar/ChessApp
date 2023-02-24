import { createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");

    setDarkMode(darkMode === "true" ? true : false);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      <DarkModeContext.Provider value={{ darkMode, toggleMode }}>{props.children}</DarkModeContext.Provider>
    </>
  );
};

export { DarkModeContext, DarkModeProvider };
