import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/FirebaseContext";
import "./Nav.scss";

function Nav() {
  const { currentUser, signOut } = useAuth();
  return (
    <div className="nav">
      <div className="nav__wrapper">
        <Link className="nav__item" to={"/"}>
          Home
        </Link>
      </div>
      {!currentUser ? (
        <Link className="nav__list-item" to={"/login"}>
          Login
        </Link>
      ) : (
        <a
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </a>
      )}
    </div>
  );
}
export default Nav;
