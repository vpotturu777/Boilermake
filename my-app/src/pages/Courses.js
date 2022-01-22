import React, { useEffect, useRef, useState } from "react";
import { TextField, CircularProgress } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import Course from "../components/Course";
import "./courses.css";
const API_BASE = "http://localhost:4200/odata";
const COURSES = `/Courses`;
const SUBJECTS = `/Subjects`;
const TITLE_CONTAINS = (text) => `?$filter=contains(Title, '${text}')`;
const ASCENDING_NUMBER = `&$orderby=Number asc`;
/**
 *
 * {
 *  "CreditHours": number,
 *  "Description": string,
 *  "Id": string,
 *  "Number": number,
 *  "SubjectId": string, // wtf is this,
 *  "Title": string,
 * }
 */

const Courses = () => {
  const [text, setText] = useState("");
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState(null);
  const delayTimer = useRef(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    console.log(`${API_BASE}${SUBJECTS}`);
    fetch(`${API_BASE}${SUBJECTS}`)
      .then((res) => res.json())
      .then((data) => {
        const cleanData = clean(data.value);
        const subjectMap = cleanData.reduce((obj, currSubject) => {
          obj[currSubject.id] = currSubject;
          return obj;
        }, {});
        console.log("subjectMap", subjectMap);
        setSubjects(subjectMap);
      });
  }, []);

  const clean = (rawList) => {
    return rawList.map((rawItem) =>
      Object.fromEntries(
        Object.entries(rawItem).map(([key, value]) => [
          key.toLowerCase(),
          value,
        ])
      )
    );
  };

  const fetchCourses = async () => {
    try {
      // console.log(`${API_BASE}${COURSES}${TITLE_CONTAINS(text)}${ASCENDING_NUMBER}`);
      const response = await fetch(
        `${API_BASE}${COURSES}${TITLE_CONTAINS(text)}${ASCENDING_NUMBER}`
      );
      // console.log(response)
      const data = await response.json();
      // console.log(data);
      console.log("courses", clean(data.value));
      setCourses(clean(data.value));
    } catch (err) {
      console.log("There was an err", err);
    }
  };

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
      {loading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Search for courses"
            value={text}
            onChange={handleSearchOnDelay}
          />
        </form>
      )}
      <div className="course-list">
        {courses.map((course) => (
          <Link
            to={`/${params.college}/${
              subjects[course.subjectid].abbreviation
            }-${course.number}`}
            key={course.subjectid}
          >
            <Course
              {...course}
              subject={subjects[course.subjectid].abbreviation}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
