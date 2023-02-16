import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/FirebaseContext";
import "./Nav.scss";

function Nav() {
  const { currentUser, signOut } = useAuth();
  console.log(currentUser);
  return (
    <div className="nav">
      <div className="nav__wrapper">
        <Link className="nav__item" to={"/"}>
          Home
        </Link>

        {<Link to={"/challenge"}>Challenge Me</Link>}
      </div>
      {!currentUser ? (
        <Link className="nav__list-item" to={"/signup"}>
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