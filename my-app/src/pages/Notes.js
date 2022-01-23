import { Typography } from "@mui/material";
import React from "react";
const lectures = Array(18)
  .fill()
  .map((_, index) => index);

const Notes = () => {
  return (
    <div>
      {lectures.map((lecture) => (
        <div>
          <Typography variant="h5">
            {`Lecture ${lecture}`}
          </Typography>

        </div>
      ))}
    </div>
  );
};

export default Notes;
