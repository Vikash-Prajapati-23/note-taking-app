import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "./components/Signup/Signup";
// import Signin from "./components/Signin/Signin";
import Account from "./components/Account/Account.tsx";
import Note from "./components/Note/Note.tsx";


function App() {
  return (
    <>
      {/* <div> */}
      <Router>
        <Routes>
          <Route path="/" element={<Account />} />
          <Route path="/Note" element={<Note />} />
          {/* <Route path="/Signup" element={ <Signup /> } />
            <Route path="/Signin" element={ <Signin /> } /> */}
        </Routes>
      </Router>
      {/* </div> */}
    </>
  );
}

export default App;
