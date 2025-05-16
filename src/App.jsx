import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";

import Countries from "./components/Countries";
import PlanTrip from "./components/PlanTrip";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="countries" element={<Countries />} />
          <Route path="trip" element={<PlanTrip />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
