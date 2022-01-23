import React, { useEffect, useRef, useState } from "react";
import { TextField, CircularProgress, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import Course from "../components/Course";
import "./courses.css";
const API_BASE = "https://note-izme-senpai.azurewebsites.net/odata";
const COURSES = `/Courses?`;
const SUBJECTS = `/Subjects`;
const TITLE_CONTAINS = (text) => `$filter=contains(Title, '${text}')`;
const SUBJECT_EQUAL = (subj) => `$filter=Subject/Abbreviation eq '${subj}'`;
const NUMBER_CONTAINS = (num) => `contains(Number,'${num}')`;

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

const splitSubjectNumber = (subjectNumber) => {
  const match = /[0-9]+$/.exec(subjectNumber);
  if (match) {
    return [
      subjectNumber.substring(0, match.index).trim().toUpperCase(),
      subjectNumber.substring(match.index, subjectNumber.length).trim(),
    ];
  }

  return null;
};

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
    return rawList
      .slice(0, 69)
      .map((rawItem) =>
        Object.fromEntries(
          Object.entries(rawItem).map(([key, value]) => [
            key.toLowerCase(),
            value,
          ])
        )
      );
  };

  const fetchCourses = async () => {
    if (!text) return;
    setLoading(true);
    try {
      // console.log(`${API_BASE}${COURSES}${TITLE_CONTAINS(text)}${ASCENDING_NUMBER}`);
      const isSubjectNumber = splitSubjectNumber(text);

      // I know
      let url;

      if (isSubjectNumber) {
        const abbr = isSubjectNumber[0];
        const num = isSubjectNumber[1];
        url = abbr
          ? `${API_BASE}${COURSES}${SUBJECT_EQUAL(abbr)} and ${NUMBER_CONTAINS(
              num
            )}${ASCENDING_NUMBER}`
          : `${API_BASE}${COURSES}$filter=${NUMBER_CONTAINS(
              num
            )}${ASCENDING_NUMBER}`;

        // console.log(url)
        // response = await fetch(url);
      } else if (text.length <= 4) {
        const possibleAbbr = text.toUpperCase();
        Object.values(subjects).some((subj) => {
          if (subj.abbreviation === possibleAbbr) {
            url = `${API_BASE}${COURSES}${SUBJECT_EQUAL(
              possibleAbbr
            )}${ASCENDING_NUMBER}`;
            return true;
          }
          return false;
        });
      } else if (!url) {
        url = `${API_BASE}${COURSES}${TITLE_CONTAINS(text)}${ASCENDING_NUMBER}`;
      }
      const response = await fetch(url);
      // console.log(response)

      const data = await response.json();
      // console.log(data);
      console.log("courses", clean(data.value));
      setCourses(clean(data.value));
    } catch (err) {
      console.log("There was an err", err);
      setCourses([]);
    }
    setLoading(false);
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
            <Typography variant="h1" fontWeight={700} color="#294ba6" style={{marginTop:'16px', marginBottom:"16px"}}>Course Search</Typography>

      {loading ? (
        <CircularProgress style={{ margin: 64 }} />
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            style={{ margin: 16}}
          >
            <TextField
              label="Search for courses"
              value={text}
              onChange={handleSearchOnDelay}
              fullWidth
              style={{ maxWidth: 500 }}
            />
          </form>
        </>
      )}
      <div className="course-list">
        {courses.length
          ? courses.map((course) => {
              if (!subjects[course.subjectid]) {
                return <Course {...course} subject={"MISSING"} />;
              }

              return (
                <Link
                  to={`/Boilermake/${params.college}/${
                    subjects[course.subjectid].abbreviation
                  }-${course.number}`}
                  key={course.id}
                >
                  <Course
                    {...course}
                    subject={subjects[course.subjectid].abbreviation}
                  />
                </Link>
              );
            })
          : !loading && <div>No matching classes 🥺</div>}
      </div>
    </div>
  );
};

export default Courses;
