import "./App.css";
import { db } from "./firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./nav";
import theme from "./theme"
import { ThemeProvider } from '@mui/material/styles';
function App() {
  // const [todo, setTodo] = useState("");
  // const [todos, setTodos] = useState([]);
  // const [isEdit, setIsEdit] = useState(false);
  // const [tempUuid, setTempUuid] = useState("");

  // const handleTodoChange = (e) => {
  //   setTodo(e.target.value);
  // };

  // //read
  // useEffect(() => {
  //   onValue(ref(db), (snapshot) => {
  //     setTodos([]);
  //     const data = snapshot.val();
  //     if (data !== null) {
  //       Object.values(data).map((todo) => {
  //         setTodos((oldArray) => [...oldArray, todo]);
  //       });
  //     }
  //   });
  // }, []);

  // //write
  // const writeToDatabase = () => {
  //   const uuid = uid();
  //   set(ref(db, `/${uuid}`), {
  //     todo,
  //     uuid,
  //   });

  //   setTodo("");
  // };

  // //update
  // const handleUpdate = (todo) => {
  //   setIsEdit(true);
  //   setTempUuid(todo.uuid);
  //   setTodo(todo.todo);
  // };

  // const handleSubmitChange = () => {
  //   update(ref(db, `/${tempUuid}`), {
  //     todo,
  //     uuid: tempUuid,
  //   });

  //   setTodo("");
  //   setIsEdit(false);
  // };

  // //delete
  // const handleDelete = (todo) => {
  //   remove(ref(db, `/${todo.uuid}`));
  // };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Nav />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
