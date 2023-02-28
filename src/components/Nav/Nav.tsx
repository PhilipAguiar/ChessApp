import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/FirebaseContext";
import Settings from "../Settings/Settings";
import "./Nav.scss";

type Props = {
  setFlipBoard: Function;
};

function Nav({ setFlipBoard }: Props) {
  const { currentUser, signOut } = useAuth();
  const [settingsActive, setSettingsActive] = useState(false);

  return (
    <div className="nav">
      <div>
        <Link className="nav__item" to={"/"}>
          Home
        </Link>
        <Link className="nav__item" to={"/challenge"}>
          Challenge
        </Link>
      </div>
      <div className="nav__wrapper">
        <p
          className="nav__item"
          onClick={() => {
            setSettingsActive(!settingsActive);
          }}
        >
          Settings
        </p>

        {!currentUser ? (
          <Link className="nav__link" to={"/login"}>
            Login
          </Link>
        ) : (
          <a
            className="nav__link"
            onClick={() => {
              signOut();
            }}
          >
            Sign Out
          </a>
        )}
      </div>
      {settingsActive && <Settings setFlipBoard={setFlipBoard} setSettingsActive={setSettingsActive} />}
    </div>
  );
}
export default Nav;
