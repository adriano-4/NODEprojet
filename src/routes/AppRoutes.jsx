import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "../pages/Acceuil";
import Etudiants from "../pages/Etudiants";
import Evaluations from "../pages/Evaluations";
import Statistiques from "../pages/Statistiques";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/etudiants" element={<Etudiants />} />
        <Route path="/evaluations" element={<Evaluations />} />
        <Route path="/statistiques" element={<Statistiques />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
