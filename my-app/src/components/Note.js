import { db } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from "react";
import { Button, TextField, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/DoNotDisturb";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Close";
import "./note.css";

function Note({ course, week }) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [updateUuid, setUpdateUuid] = useState("");

  const [updateNote, setUpdateNode] = useState("");

  const handleTodoChange = (e) => {
    setNote(e.target.value);
  };

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setNotes([]);
      const data = snapshot.val();
      if (data !== null) {
        const allDoes = Object.values(data);
        console.log(allDoes)
        const filtered = allDoes.reduce((out, todo) => {
          const tokens = todo.todo.split(':::')
          if (tokens[0] === course && tokens[1] === week) {
            out.push({...todo, todo:tokens[2]})
          }
          return out
        },[]
        );
        console.log(filtered)
        setNotes(filtered);
        // Object.values(data).map((todo) => {
        //   setNotes((oldArray) => [...oldArray, todo]);
        // });
      }
    });
  }, []);

  //write
  const writeToDatabase = () => {
    const uuid = uid();
    set(ref(db, `/${uuid}`), {
      todo: `${course}:::${week}:::${note}`,
      uuid,
    });

    setNote("");
  };

  //update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setUpdateNode(todo.todo);
    setUpdateUuid(todo.uuid);
    // setNote(todo.todo);
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${updateUuid}`), {
      todo: `${course}:::${week}:::${updateNote}`,
      uuid: updateUuid,
    });

    // setNote("");
    setIsEdit(false);
    setUpdateUuid("");
  };

  //delete
  const handleDelete = (todo) => {
    remove(ref(db, `/${todo.uuid}`));
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 12,
          marginRight: 24,
          background: "#f6f7f8",
          borderRadius: 8,
          padding: 24,
          flex: 1,
        }}
      >
        {!notes.length && <Typography variant="h5">No notes yet...</Typography>}
        {notes.map((todo) => (
          <div key={todo.uuid} style={{ position: "relative", minWidth: 140 }}>
            <TextField
              type="text"
              multiline
              value={todo.uuid !== updateUuid ? todo.todo : updateNote}
              disabled={todo.uuid !== updateUuid}
              className="note-disabled"
              onChange={(e) => setUpdateNode(e.target.value)}
              style={{ background: "white" }}
            />
            {(!isEdit || todo.uuid !== updateUuid) && (
              <>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleUpdate(todo)}
                  style={{ padding: 4, position: "absolute", right: 0, top: 0 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="delete"
                  onClick={() => handleDelete(todo)}
                  style={{
                    padding: 4,
                    position: "absolute",
                    left: -12,
                    top: -12,
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}

            {isEdit && todo.uuid === updateUuid && (
              <div>
                <IconButton
                  color="success"
                  aria-label="update"
                  onClick={() => handleSubmitChange()}
                  style={{ padding: 4 }}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="update"
                  onClick={() => {
                    setUpdateUuid("");
                    setIsEdit(false);
                  }}
                  style={{ padding: 4 }}
                >
                  <CancelIcon />
                </IconButton>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          minWidth: 140,
        }}
      >
        <Typography variant="h6" style={{ width: "100%", textAlign: "left" }}>
          Add Note
        </Typography>
        <TextField
          type="text"
          multiline
          minRows={6}
          value={note}
          onChange={handleTodoChange}
        />
        <Button variant="contained" onClick={writeToDatabase}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Note;
