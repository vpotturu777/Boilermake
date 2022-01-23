import { Typography } from "@mui/material";
import React from "react";
import Note from "../components/Note";
const lectures = Array(18)
  .fill()
  .map((_, index) => index);

const Notes = () => {
  return (
    <div>
      {lectures.map((lecture) => (
        <div
          style={{
            minHeight: "200px",
            background: "white",
            margin: "64px 32px",
            borderRadius: 8,
            boxShadow: "0 4px 16px #d7d7d7",
            padding: 24
          }}
        >
          <Typography variant="h4" fontWeight={500} textAlign={'left'} style={{marginBottom:16}}>
            {`Lecture ${lecture + 1}`}
          </Typography>
          <Note />
        </div>
      ))}
    </div>
  );
};

export default Notes;
