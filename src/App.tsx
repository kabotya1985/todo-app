import React from "react";
import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Todo from "./components/Todo";

const App = () => {
  const [text, setText] = useState("");
  return (
    <div className="App">
      <>
        <Todo />
      </>
    </div>
  );
};

export default App;
