import { createContext, useEffect, useState } from "react";

type ContextType = {
  theme: string;
  themeSwitcher: Function;
  pieceSet: string;
  pieceSwitcher: Function;
};

const ThemeContext = createContext<ContextType>({
  theme: "default",
  themeSwitcher: Function,
  pieceSet: "default",
  pieceSwitcher: Function,
});

const ThemeProvider = (props: any) => {
  const [theme, setTheme] = useState<string>("default");

  const themeSwitcher = (themeName: string) => {
    setTheme(themeName);
  };

  const [pieceSet, setPieceSet] = useState<string>("default");

  const pieceSwitcher = (pieceSetName: string) => {
    setPieceSet(pieceSetName);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const pieceSet = localStorage.getItem("pieceSet");

    if (theme) {
      setTheme(theme);
    }

    if (pieceSet) {
      setPieceSet(pieceSet);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("pieceSet", pieceSet);
  }, [pieceSet]);
  return (
    <>
      <ThemeContext.Provider value={{ theme, themeSwitcher, pieceSet, pieceSwitcher }}>{props.children}</ThemeContext.Provider>
    </>
  );
};

export { ThemeContext, ThemeProvider };
