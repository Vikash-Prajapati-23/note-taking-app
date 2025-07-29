import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Account from "./components/Account/Account";
import Note from "./components/Note/Note";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Account />} />
          <Route path="/Note" element={<Note />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
