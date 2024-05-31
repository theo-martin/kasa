import Home from "./Pages/Home";
import Logement from "./Data/Logements";
import Notfound from "./Pages/Notfound";
import { Routes, Route } from "react-router-dom";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Logement/:id" element={<Logement />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}
export default AppRouter;
