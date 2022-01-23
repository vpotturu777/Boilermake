import { Typography } from "@mui/material";
import React from "react";
import Note from "../components/Note";
import { Link, useParams } from "react-router-dom";

const lectures = Array(18)
  .fill()
  .map((_, index) => index);

const Notes = () => {
  const params = useParams();
  // console.log(params)
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
            padding: 24,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={500}
            textAlign={"left"}
            style={{ marginBottom: 16 }}
          >
            {`Week ${lecture + 1}`}
          </Typography>
          <Note course={params.course} week={(lecture+1).toString()}/>
        </div>
      ))}
    </div>
  );
};

export default Notes;
