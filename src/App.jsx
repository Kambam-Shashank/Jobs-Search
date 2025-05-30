import { BrowserRouter, Route, Routes } from "react-router";

// import LoginForm from "./Components/LoginForm";
import Home from "./Components/Home";
import Jobs from "./Components/Jobs";
import LoginForm from "./Components/LoginForm";
import ProtectedCard from "./Components/ProtectedCard";
import EachJob from "./Components/EachJob";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedCard>
              <Home />
            </ProtectedCard>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedCard>
              <Jobs />
            </ProtectedCard>
          }
        />
        <Route
          path="jobs/:id"
          element={
            <ProtectedCard>
              <EachJob />
            </ProtectedCard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
