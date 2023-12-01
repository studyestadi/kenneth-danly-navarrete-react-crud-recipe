import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import Update from "./components/Update";
import Read from "./components/Read";
import ReadSpecial from "./components/ReadSpecial";
import UpdateSpecial from "./components/UpdateSpecial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/update/:uuid" element={<Update />}></Route>
        <Route path="/read/:uuid" element={<Read />}></Route>
        <Route path="/readspecial/:uuid" element={<ReadSpecial />}></Route>
        <Route path="/updatespecial/:uuid" element={<UpdateSpecial />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
