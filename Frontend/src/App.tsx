import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";

function App() {
  return (
    <>
      <div className="h-screen flex justify-center items-center ">
        <Router>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/Signup" element={ <Signup /> } />
            <Route path="/Signin" element={ <Signin /> } />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
