import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import NewToDo from "./NewToDo/NewToDo";
import AllToDos from "./AllToDos/AllToDos";

function App() {
  const [count, setCount] = useState(0);
  const [buttonDel, setButtonDel] = useState(false);

  return (
    <>
      <AllToDos setButtonDel={setButtonDel} />
    </>
  );
}

export default App;
