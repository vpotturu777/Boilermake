import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  CircularProgress,
  Typography,
  Pagination,
} from "@mui/material";
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

const COLORS = ["#fff5f5", "#fffff5", "#f5fff5", "#f5fbff", "#faf5ff"];
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
  const [allCourses, setAllCourses] = useState([]);
  const [courses, setCourses] = useState([]);

  const [subjects, setSubjects] = useState(null);
  const delayTimer = useRef(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    console.log(allCourses.length)
    setCourses(allCourses.slice(69 * (page-1), 69 * page));
  }, [allCourses, page]);

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
      // console.log("courses", clean(data.value));
      setPage(1)
      setAllCourses(clean(data.value));
    } catch (err) {
      console.log("There was an err", err);
      setPage(1)
      setAllCourses([]);
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


  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div
      style={{
        background: "white",
        boxShadow: "0 4px 16px #d7d7d7",
        padding: "64px 16px",
      }}
    >
      <Typography
        variant="h1"
        fontWeight={700}
        color="#294ba6"
        style={{ marginTop: "16px", marginBottom: "16px" }}
      >
        Course Search
      </Typography>

      {loading ? (
        <CircularProgress style={{ margin: 64 }} />
      ) : (
        <>
          <form onSubmit={handleSubmit} style={{ margin: 16 }}>
            <TextField
              label="Search by title, subject, course id..."
              value={text}
              onChange={handleSearchOnDelay}
              fullWidth
              style={{ maxWidth: 500, background: "#f6f7fb" }}
              disabled={params.college !== "purdue"}
            />
          </form>
        </>
      )}
      <div className="course-list">
        {courses.length ? (
          <>
            {courses.map((course, index) => {
              if (!subjects[course.subjectid]) {
                return (
                  <Course
                    {...course}
                    subject={"MISSING"}
                    style={{ background: COLORS[index % COLORS.length] }}
                  />
                );
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
                    style={{ background: COLORS[index % COLORS.length] }}
                  />
                </Link>
              );
            })}
          </>
        ) : (
          !loading && text && <div>No matching classes 🥺</div>
        )}
      </div>
      {allCourses.length > 69 && (
        <Pagination
          count={Math.floor((allCourses.length + 69) / 69)}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          className="pagination"
        />
      )}
    </div>
  );
};

export default Courses;
