import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../../styles/templates_css/Template4.module.css';
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaPhoneAlt, FaGithubSquare } from "react-icons/fa";
import { FaLinkedin, FaEarthAsia } from "react-icons/fa6";
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Template4 = ({ id: propId }) => {
  const { id: paramsId } = useParams();
  const id = propId || paramsId;

  const [data, setData] = useState({
    name: '',
    designation: '',
    about: '',
    email: '',
    address: '',
    linkedin: '',
    number: '',
    portfolio: '',
    github: '',
    education: [],
    experience: [],
    projects: [],
  });

  useEffect(() => {
    fetch(id);
  }, [id]);

  const fetch = (id) => {
    axios.get(`https://66a4bd8f5dc27a3c1909ae82.mockapi.io/stu/det/resume/${id}`)
      .then((res) => {
        setData(res.data);
      });
  };

  const handleDownload = () => {
    const resumeElement = document.getElementById('resume');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const margin = 15;
    const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * margin;
    const pdfHeight = pdf.internal.pageSize.getHeight() - 2 * margin;

    html2canvas(resumeElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = margin;
      if (imgHeight <= pdfHeight) {
        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      } else {
        let pageHeightLeft = imgHeight;

        while (pageHeightLeft > 0) {
          pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
          pageHeightLeft -= pdfHeight;
          if (pageHeightLeft > 0) {
            pdf.addPage();
            position = margin;
          }
        }
      }

      pdf.save('resume.pdf');
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Resume of {data.name}</h1>
      </header>
      <main id="resume" className={styles.resume}>
        <section className={styles.personalInfo}>
          <h1>{data.name}</h1>
          <h5>{data.designation}</h5>
          <p>{data.about}</p>
        </section>

        <div className={styles.contact}>
          <div className={styles.contactDetails}>
            <Link className={styles.contactLink}><MdEmail /> {data.email}</Link>
            <Link className={styles.contactLink}><MdLocationOn /> {data.address}</Link>
            <Link className={styles.contactLink}><FaLinkedin /> {data.linkedin}</Link>
          </div>
          <div className={styles.contactDetail}>
            <Link className={styles.contactLink}><FaPhoneAlt /> {data.number}</Link>
            <Link className={styles.contactLink}><FaEarthAsia /> {data.portfolio}</Link>
            <Link className={styles.contactLink}><FaGithubSquare /> {data.github}</Link>
          </div>
        </div>

        <section className={styles.sections}>
          <div className={styles.section}>
            <h2>Experience</h2>
            {data.experience.length > 0 ? (
              data.experience.map((exp, index) => (
                <div key={index} className={styles.detail}>
                  <h4>{exp.position}</h4>
                  <h5>{exp.organization}</h5>
                  <p>{exp.joining} to {exp.exit}</p>
                  <p>{exp.mode}, {exp.place}</p>
                </div>
              ))
            ) : (
              <p>No experience data available</p>
            )}
          </div>

          <div className={styles.section}>
            <h2>Skills:</h2>
            {Array.isArray(data.skills) && data.skills.length > 0 ? (
              data.skills.map((skill, index) => (
                <div key={index} >
                  <h5>{skill}</h5>
                </div>
              ))
            ) : (
              <p>No skills data available</p>
            )}

            <h2 style={{ marginTop: '40px' }}>Projects</h2>
            {data.projects.length > 0 ? (
              data.projects.map((proj, index) => (
                <div key={index} className={styles.detail}>
                  <h4>{proj.name}</h4>
                  <Link className={styles.link}>{proj.link}</Link>
                </div>
              ))
            ) : (
              <p>No projects data available</p>
            )}
          </div>



          <div className={styles.section}>
            <h2>Education</h2>
            {data.education.length > 0 ? (
              data.education.map((edu, index) => (
                <div key={index} className={styles.detail}>
                  <h4>{edu.education}</h4>
                  <h5>{edu.schoolname}</h5>
                  <p>{edu.specialization} | {edu.year} | {edu.city}</p>
                </div>
              ))
            ) : (
              <p>No education data available</p>
            )}
          </div>

          <div className={styles.section}>
            <h2>Declaration</h2>
            <p>I hereby declare that the details furnished above are true and correct. The information presented in this resume accurately reflects my qualifications and experience.</p>
            <p><strong>{data.name}</strong></p>
            <p>{data.address}</p>
          </div>
        </section>
      </main>
      <Button variant="primary" type="submit" style={{ margin: '40px 0px 0px 320px', padding: '9px 50px' }} onClick={handleDownload}>
        Download Resume
      </Button>
      <div style={{ position: 'absolute', top: '210px', right: '350px', zIndex: "0" }}>
        <img
          src={data.image}
          alt="Profile Preview"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default Template4;
