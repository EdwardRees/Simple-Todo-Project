import React from "react";
import "./App.css";
import { Home, SpecificList, TodoLists, Error404 } from "./views";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/lists" element={<TodoLists />} />
        <Route path="/lists/:id" element={<SpecificList />} />
      </Routes>
    </Router>
  );
}

export default App;
