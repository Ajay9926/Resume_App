import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import style from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={style.header_first}>
      <div className={style.contain}>
        <h1>Welcome To Resume Maker App</h1>
        <h5>
          This Resume Maker app is designed to help users create, edit, and
          manage their resumes efficiently. It simplifies the process of
          building a professional resume by providing templates, guidance, and
          customization options tailored to various industries and job roles.
        </h5>
        <Link to="/select_template">
          <Button
            variant="dark"
            className={style.button}
          >
            Create Resume
          </Button>
        </Link>
        <Link to="/show">
          <Button
            variant="dark"
            className={style.button}
          >
            Show Resume
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;