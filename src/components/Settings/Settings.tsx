import "./Settings.scss";
import { useContext, useRef, useState } from "react";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import { ThemeContext } from "../../contexts/ThemeContext";

type Props = {
  setFlipBoard: Function;
  setSettingsActive: Function;
};

function Settings({ setFlipBoard, setSettingsActive }: Props) {
  const { theme, themeSwitcher, pieceSet, pieceSwitcher } = useContext(ThemeContext);
  const { darkMode, toggleMode } = useContext(DarkModeContext);
  const optionRef = useRef<HTMLDivElement>(null);
  return (
    <div className={`settings ${darkMode && "settings--dark"}`}>
      <h1>Settings:</h1>
      <button
        className="settings__close"
        onClick={() => {
          setSettingsActive(false);
        }}
      >
        X
      </button>
      <div ref={optionRef} className="settings__options">
        <button
          onClick={() => {
            setFlipBoard((prevValue: boolean) => !prevValue);
          }}
        >
          Flip Board
        </button>

        <div className="settings__wrapper">
          <div className="settings__button-container">
            <p className="settings__text">{darkMode ? "Light Mode:" : "Dark Mode:"} </p>
            <button
              className={`settings__button ${darkMode && "settings__button--dark"}`}
              onClick={() => {
                toggleMode();
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
          <div className="settings__select-container">
            <p className="settings__text">Board Theme: </p>
            <select
              className="settings__select"
              name=""
              id=""
              onChange={(e) => {
                themeSwitcher(e.target.value);
              }}
              defaultValue={theme}
            >
              <option value="default">Default</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
            </select>
          </div>

          <div className="settings__select-container">
            <p className="settings__text">Piece Set: </p>
            <select
              className="settings__select"
              name=""
              id=""
              onChange={(e) => {
                pieceSwitcher(e.target.value);
              }}
              defaultValue={pieceSet}
            >
              <option value="default">Default</option>
              <option value="default-shadows">Default w/Shadows</option>
              <option value="cartoon">Cartoon</option>
              <option value="pixel">Pixel</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;
