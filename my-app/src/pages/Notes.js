import { Typography } from "@mui/material";
import React from "react";
import Note from "../components/Note"
const lectures = Array(18)
  .fill()
  .map((_, index) => index);

const Notes = () => {
  return (
    <div>
      {lectures.map((lecture) => (
        <div style={{minHeight: '200px'}}>
          <Typography variant="h4" fontWeight={500}>
            {`Lecture ${lecture+1}`}
          </Typography>
          <Note/>

        </div>
      ))}
    </div>
  );
};

export default Notes;
