import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layouts/Header.tsx";
import HomePage from "./pages/HomePage.tsx";
import OpportunityPage from "./pages/OpportunityPage.tsx";

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/opportunity" element={<OpportunityPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
