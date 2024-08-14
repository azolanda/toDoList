import { useEffect, useRef, useState } from "react";
import "./NewToDo.css";

export default function NewList({ setToDos, formSubmit, setFormSubmit }) {
  const [formHeading, setFormHeading] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState("");

  // const [formSubmit, setFormSubmit] = useState(false);

  // localStorage.clear;
  // Date.getTime()
  // new Date().toJSON(),
  // const date = new Date().toLocaleString();
  const date = useRef(Date.now());
  const localStorageKey = "list_" + date;
  const changeToDos = (item) => {
    setToDos((array) => {
      array.push(item);
      return array;
    });
  };

  const toDo = {
    heading: formHeading,
    description: formDescription,
    formDate: formDate,
    toDosKey: localStorageKey,
  };

  const init = useRef(true);

  useEffect(() => {
    if (init.current) {
      init.current = false;
    } else {
      localStorage.setItem(toDo.toDosKey, JSON.stringify(toDo));
    }
  }, [formSubmit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmit((fSubmit) => !fSubmit);
    changeToDos(toDo);
    e.target.reset();
  };

  const handleHeadingChange = (e) => setFormHeading(e.target.value);
  const handleDescriptionChange = (e) => setFormDescription(e.target.value);
  const handleDateChange = (e) => setFormDate(e.target.value);

  return (
    <>
      <form onSubmit={handleSubmit} className="form__add">
        <input
          onChange={handleHeadingChange}
          type="text"
          placeholder="Заголовок"
          maxLength="50"
        />
        <textarea
          onChange={handleDescriptionChange}
          rows={4}
          cols={40}
          placeholder="Описание"
          maxLength="500"
        />
        <input
          onChange={handleDateChange}
          className="form__add-date"
          type="date"
        />
        <button className="form__add-submit" type="submit">
          Добавить задачу
        </button>
      </form>
    </>
  );
}
