import { createContext, useState } from "react";

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

  return (
    <>
      <ThemeContext.Provider value={{ theme, themeSwitcher, pieceSet, pieceSwitcher }}>{props.children}</ThemeContext.Provider>
    </>
  );
};

export { ThemeContext, ThemeProvider };
