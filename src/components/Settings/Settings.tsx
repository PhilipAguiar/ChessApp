import "./Settings.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import { ThemeContext } from "../../contexts/ThemeContext";

type Props = {
  setFlipBoard: Function;
};

function Settings({ setFlipBoard }: Props) {
  const { themeSwitcher, pieceSwitcher } = useContext(ThemeContext);
  const { darkMode, toggleMode } = useContext(DarkModeContext);

  return (
    <div className={`settings ${darkMode && "settings--dark"}`}>
      <h1>Settings:</h1>

      <button
        onClick={() => {
          setFlipBoard((prevValue: boolean) => !prevValue);
        }}
      >
        Flip Board
      </button>

      <div className="settings__wrapper">
        <div className="settings__button-container">
          <p className="settings__text">Dark Mode: </p>
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
          >
            <option value="default">Default</option>
            <option value="red">Red</option>
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
          >
            <option value="default">Default</option>
            <option value="default-shadows">Default w/Shadows</option>
            <option value="cartoon">Cartoon</option>
            <option value="pixel">Pixel</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default Settings;
