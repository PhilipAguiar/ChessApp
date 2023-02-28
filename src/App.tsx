import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import { useAuth } from "./contexts/FirebaseContext";
import AdminPage from "./pages/AdminPage/AdminPage";
import ChallengePage from "./pages/ChallengePage/ChallengePage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { isAdmin } from "./utils/databaseUtils/databaseUtils";
import "./App.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./contexts/DarkModeContext";

function App() {
  const { currentUser } = useAuth();
  const { darkMode } = useContext(DarkModeContext);

  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [flipBoard, setFlipBoard] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      isAdmin(currentUser.uid).then((res: any) => {
        console.log(res);
        setIsUserAdmin(res);
      });
    }
  }, []);

  return (
    <div className={`App ${darkMode ? "App--dark" : ""}`}>
      <BrowserRouter>
        <Nav setFlipBoard={setFlipBoard} />
        <Routes>
          <Route path="/" element={<HomePage flipBoard={flipBoard} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/challenge" element={<ChallengePage flipBoard={flipBoard} />} />

          {isUserAdmin && <Route path="/admin" element={<AdminPage flipBoard={flipBoard} />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
