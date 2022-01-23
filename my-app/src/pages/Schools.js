import React, { useEffect, useRef, useState } from "react";
import { TextField, CircularProgress, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import School from "../components/School";

import "./courses.css";
import "./schools.css";

const COLORS = ["#feefe6", "#fff5fb", "#f5feff", "#e8eafc", "#fdfff5"];
const SCHOOLS_LIST = [
  {
    title: "Purdue University",
    location: "West Lafayette, IN",
    imgSrc: "pic.jpg",
    abbr: "purdue",
    enabled: true,
  },
  {
    title: "Indiana University",
    location: "Bloomington, IN",
    imgSrc: "jack.jpg",
    abbr: "iu",
    enabled: false,
  },
  {
    title: "University of Chicago",
    location: "Chigago, IL",
    imgSrc: "seb.jpg",
    abbr: "uchicago",
    enabled: false,
  },
  {
    title: "University of Notre Dame",

    location: "Notre Dame, IN",
    imgSrc: "vaib.jpg",
    abbr: "ucsd",
    enabled: false,
  },
  {
    title: "Monsters University",
    location: "Monstropolis , ??",
    imgSrc: "pic.jpg",
    abbr: "mu",
    enabled: false,
  },
];

const Schools = () => {
  const [text, setText] = useState("");
  const [schools, setSchools] = useState([]);
  const delayTimer = useRef(null);
  const [loading, setLoading] = useState(false);

  const fetchCourses = () => {
    if (!text) return;
    setLoading(true);

    setSchools(SCHOOLS_LIST);

    setLoading(false);
  };

  const handleSearchOnDelay = (event) => {
    setText(event.target.value);
    clearTimeout(delayTimer.current);
    delayTimer.current = setTimeout(() => fetchCourses(), 2000);
  };

  const handleSubmit = (event) => {
    event.target.blur();
    event.preventDefault();
    clearTimeout(delayTimer.current);
    fetchCourses();
  };

  return (
    <>
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
          School Search
        </Typography>
        {loading ? (
          <CircularProgress style={{ margin: 64 }} />
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ margin: 16 }}>
              <TextField
                label="Search by name..."
                value={text}
                onChange={handleSearchOnDelay}
                fullWidth
                style={{ maxWidth: 500, background: "#f6f7fb" }}
              />
            </form>
            <div className="course-list">
              {schools.map((school, index) => (
                <Link
                  to={`/Boilermake/${school.abbr}`}
                  key={index}
                  style={{ textDecoration: "none" }}
                  className={school.enabled ? "school" : "disabled"}
                >
                  <School
                    {...school}
                    style={{ background: COLORS[index % COLORS.length] }}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="content">
        <div>
          <Typography variant="h3" fontWeight={500}>
            Find fresh and authentic notes for free
          </Typography>
          <Typography variant="p">
            Having notes is better than having no notes. Check out what notes
            your classmates have made for your classes. Consider contributing
            your own notes if you want to help the community.
          </Typography>
        </div>

        <img src="pic.jpg" alt="good notes" style={{borderRadius:12}} />
      </div>
    </>
  );
};

export default Schools;
