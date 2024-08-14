import { useRef, useEffect, useState, useCallback } from "react";
import "./AllToDos.css";
import NewToDo from "../NewToDo/NewToDo";

const initToDos = () => {
  const toDosArray = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(JSON.parse(localStorage.getItem(key)));
    toDosArray.push({
      ...JSON.parse(localStorage.getItem(key)),
      toDosKey: key,
    });
    // toDosArray[i].toDosKey = key;
  }
  return toDosArray;
};

export default function AllToDos({ setButtonDel }) {
  const [toDos, setToDos] = useState([]);
  const init = useRef(true);
  const firstInitToDos = () => setToDos(initToDos);
  // const delToDo = (index) =>
  //   setToDos((array) => {
  //     array.splice(index, 1);
  //     return array;
  //   });
  // useEffect(() => {
  if (init.current) {
    init.current = false;
    console.log("inside useEffect - init.current");
    firstInitToDos();
  }
  //   } else {
  //   }
  // }, []);

  const [formSubmit, setFormSubmit] = useState(false);
  // const [buttonDel, setButtonDel] = useState(false);

  const handleButtonDel = useCallback((key) => {
    // localStorage.removeItem(localStorage.key(index));
    console.log(key);
    localStorage.removeItem(key);
    // delToDo(index);
    firstInitToDos();
    setButtonDel((bDel) => !bDel);
  }, []);
  console.log("before todos");
  console.log("todos", toDos);
  //   useEffect(() => {}, [buttonDel]);

  return (
    <>
      <ul className="to-do__list">
        {toDos.map((toDo, index) => {
          return (
            <li key={index} className="to-do__li">
              <h2 className="to-do__heading">{toDo.heading}</h2>
              <h2>{index}</h2>
              <p className="to-do__description">{toDo.description}</p>
              <p className="to-do__date">{toDo.formDate}</p>
              <button onClick={() => handleButtonDel(toDo.toDosKey)}>
                Del
              </button>
            </li>
          );
        })}
      </ul>
      <NewToDo
        setToDos={setToDos}
        formSubmit={formSubmit}
        setFormSubmit={setFormSubmit}
      />
    </>
  );
}
