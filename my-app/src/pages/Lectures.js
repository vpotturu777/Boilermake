import React, { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";

const API_BASE = "http://localhost:4200/odata/Courses";

const TITLE_CONTAINS = (text) => `?$filter=contains(Title, '${text}')`;

const Lectures = () => {
  const [text, setText] = useState("");
  const [courses, setCourses] = useState([]);
  const delayTimer = useRef(null);
  // useEffect(()=> {

  // }, [])
  const fetchCourses = async () => {
    try {
      console.log(`${API_BASE}${TITLE_CONTAINS(text)}`)
      const response = await fetch(`${API_BASE}${TITLE_CONTAINS(text)}`);
      console.log(response)
      const data = await response.json();
      console.log(data);
      setCourses(data.value)
    } catch (err) {
      console.log("There was an err", err);
    }
  };
  // const fetchCourses = () => {
  //   fetch(`${API_BASE}${TITLE_CONTAINS(text)}`).then(res=>{console.log(res); return res.json()})
  // }
  const handleSearchOnDelay = (event) => {
    setText(event.target.value);
    clearTimeout(delayTimer.current);
    delayTimer.current = setTimeout(() => fetchCourses(), 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearTimeout(delayTimer.current);
    fetchCourses();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Search for courses"
          value={text}
          onChange={handleSearchOnDelay}
        />
      </form>
      <div>
        {courses.map((course) => (
          <div>{course.Title}</div>
        ))}
      </div>
    </div>
  );
};

export default Lectures;
