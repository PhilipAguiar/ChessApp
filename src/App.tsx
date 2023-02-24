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
import { useEffect, useState } from "react";

function App() {
  const { currentUser } = useAuth();

  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    if (currentUser) {
      isAdmin(currentUser.uid).then((res: any) => {
        console.log(res);
        setIsUserAdmin(res);
      });
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/challenge" element={<ChallengePage />} />

          {isUserAdmin && <Route path="/admin" element={<AdminPage />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
