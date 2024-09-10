import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from '../../styles/templates_css/Template3.module.css'
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaPhoneAlt, FaGithubSquare } from "react-icons/fa";
import { FaLinkedin, FaEarthAsia } from "react-icons/fa6";
import Button from 'react-bootstrap/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const Template3 = ({ id: propId }) => {
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
    fetch(id)
  }, [id])

  const fetch = (id) => {
    axios.get(`https://66a4bd8f5dc27a3c1909ae82.mockapi.io/stu/det/resume/${id}`)
      .then((res) => {
        setData(res.data)
      })
  }

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
    <div className={styles.main_container}>

      <div className={styles.main_container_child}>
        <h1 className={styles.main_container_child_name} >Resume of {data.name}</h1>

        <div className={styles.main_container_child_child} id="resume">

          <div className={styles.personal_info}>
            <h1>{data.name}</h1>
            <h5>{data.designation}</h5>
            <p>{data.about}</p>
          </div>

          <div className={styles.contact_container}>

            <div className={styles.contact_container_child1}>
              <Link className={styles.contact_link_1}><MdEmail className={styles.contact_icon} />{data.email}</Link><br />

              <Link className={styles.contact_link_2}><MdLocationOn className={styles.contact_icon} />{data.address}</Link><br />

              <Link className={styles.contact_link_3}><FaLinkedin className={styles.contact_icon} />{data.linkedin}</Link>

            </div>

            <div className={styles.contact_container_child2}>
              <Link className={styles.contact_link_1}><FaPhoneAlt className={styles.contact_icon} />{data.number}</Link><br />

              <Link className={styles.contact_link_2}><FaEarthAsia className={styles.contact_icon} />{data.portfolio}</Link><br />

              <Link className={styles.contact_link_3}><FaGithubSquare className={styles.contact_icon} />{data.github}</Link>

            </div>

          </div>

          <div className={styles.final_container}>
            <div className={styles.education_container}>
              <h2 >Education :</h2>
              <div>
                {Array.isArray(data.education) && data.education.length > 0 ? (
                  data.education.map((edu, index) => (
                    <div key={index} className={styles.education_container_child}>
                      <h4>{edu.education}</h4>
                      <h5>{edu.schoolname}</h5>
                      <h5>{edu.specialization}</h5>
                      <h6>{edu.year}</h6>
                      <h6>{edu.city}</h6>
                    </div>
                  ))
                ) : (
                  <p>No education data available</p>
                )}
              </div>

              <div className={styles.experience_container}>
                <h2>Experience :</h2>
                {Array.isArray(data.experience) && data.experience.length > 0 ? (
                  data.experience.map((exp, index) => (
                    <div key={index} className={styles.experience_container_child}>
                      <h4>{exp.position}</h4>
                      <h5>{exp.organization}</h5>
                      <h6>{exp.joining} to {exp.exit}</h6>
                      <h6>{exp.mode}, {exp.place}</h6>
                    </div>
                  ))
                ) : (
                  <p>No experience data available</p>
                )}
              </div>
            </div>

            <div className={styles.project_container}>
              <div>
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
              </div>

              <div >
                <h2 className={styles.declartion}>Projects :</h2>
                {Array.isArray(data.projects) && data.projects.length > 0 ? (
                  data.projects.map((proj, index) => (
                    <div key={index} className={styles.project_container_child}>
                      <h4>{proj.name}</h4>
                      <h5>{proj.link}</h5>
                    </div>
                  ))
                ) : (
                  <p>No projects data available</p>
                )}
              </div>



              <h2 className={styles.declartion}>Declaration :</h2>
              <div className={styles.declartion_child}>
                <h6>I hereby declare that the details furnished above are true and correct, The information presented in this resume accurately reflects my qualifications and experience.</h6>
                <p className={styles.declartion_child_name}>{data.name}</p>
                <p className={styles.declartion_child_city}>{data.address}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Button variant="primary" type="submit" style={{ margin: '40px 0px 0px 400px', padding: '9px 50px' }} onClick={handleDownload}>
        Download Resume
      </Button>
      <div style={{ position: 'absolute', top: '225px', right: '260px', zIndex: "0" }}>
        <img
          src={data.image}
          alt="Profile Preview"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </div>
    </div>
  )
}

export default Template3