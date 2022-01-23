import React, { useEffect, useRef, useState } from "react";
import { TextField, CircularProgress, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import School from "../components/School";

import "./courses.css";

const PURDUE = {
  title: "Purdue University",
  location: "West Lafayette, IN",
  imgSrc:"pic.jpg"
};

const Schools = () => {
  const [text, setText] = useState("");
  const [schools, setSchools] = useState([]);
  const delayTimer = useRef(null);
  const [loading, setLoading] = useState(false);

  const fetchCourses = () => {
    if (!text) return;
    setLoading(true);

    setSchools(
      Array(Math.floor(Math.random() * 10))
        .fill()
        .map((_) => PURDUE)
    );

    setLoading(false);
  };

  const handleSearchOnDelay = (event) => {
    setText(event.target.value);
    clearTimeout(delayTimer.current);
    delayTimer.current = setTimeout(() => fetchCourses(), 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearTimeout(delayTimer.current);
    fetchCourses();
  };

  return (
    <div>
      <Typography variant="h1" fontWeight={700} color="#294ba6" style={{marginTop:'16px', marginBottom:"16px"}}>School Search</Typography>
      {loading ? (
        <CircularProgress style={{ margin: 64 }} />
      ) : (
        <>
          <form onSubmit={handleSubmit} style={{ margin: 16}}>
            <TextField
              label="Search for schools"
              value={text}
              onChange={handleSearchOnDelay}
              fullWidth
              style={{ maxWidth: 500 }}
            />
          </form>
          <div className="course-list">
            {schools.map((school, index) => (
              <Link to="/Boilermake/purdue" key={index}>
                <School {...school} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Schools;
