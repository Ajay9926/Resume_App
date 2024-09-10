import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Update = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(id);
  }, [id]);

  const fetch = (id) => {
    axios.get(`https://66a4bd8f5dc27a3c1909ae82.mockapi.io/stu/det/resume/${id}`)
      .then((res) => {
        setData(res.data);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, index, field] = name.split('_');

    if (section === 'education' || section === 'experience' || section === 'projects') {
      const updatedSection = data[section].map((item, i) =>
        i === parseInt(index) ? { ...item, [field]: value } : item
      );
      setData({ ...data, [section]: updatedSection });
    } else if (section === 'skills') {
      const updatedSkills = data.skills.map((skill, i) =>
        i === parseInt(index) ? value : skill
      );
      setData({ ...data, skills: updatedSkills });
    } else {
      setData({ ...data, [name]: value });
    }
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://66a4bd8f5dc27a3c1909ae82.mockapi.io/stu/det/resume/${id}`, data)
      .then(() => {
        navigate('/show');
      });
  }

  return (
    <div style={{ margin: '50px 100px' }}>
      <h1>Update Your Details</h1>
      <Form style={{ border: '2px solid black', padding: '30px', marginTop: '30px', boxShadow: '0px 0px 50px 0px black' }} onSubmit={handleSubmit}>
        <h3>Personal Detail:</h3>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" name='name' value={data.name || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Designation</Form.Label>
            <Form.Control type="text" placeholder="Enter your designation" name='designation' value={data.designation || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>About Us</Form.Label>
            <Form.Control type="text" placeholder="About us" name='about' value={data.about || ''} onChange={handleChange} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email address" name='email' value={data.email || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Number</Form.Label>
            <Form.Control type="number" placeholder="Enter your mobile number" name='number' value={data.number || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter your address" name='address' value={data.address || ''} onChange={handleChange} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Portfolio</Form.Label>
            <Form.Control type="text" placeholder="Enter your portfolio link" name='portfolio' value={data.portfolio || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Linkedin</Form.Label>
            <Form.Control type="text" placeholder="Enter your linkedin link" name='linkedin' value={data.linkedin || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Github</Form.Label>
            <Form.Control type="text" placeholder="Enter your github link" name='github' value={data.github || ''} onChange={handleChange} />
          </Form.Group>
        </Row>

        {Array.isArray(data.education) && data.education.length > 0 ? (
          data.education.map((edu, index) => (
            <div key={index} className='mt-5'>
              <h3>Education: {index + 1}</h3>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>College / School</Form.Label>
                  <Form.Control type="text" placeholder="Enter your college or school" name={`education_${index}_schoolname`} value={edu.schoolname || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Degree / Class</Form.Label>
                  <Form.Control type="text" placeholder="Enter your degree or class" name={`education_${index}_education`} value={edu.education || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Specialization / Subject</Form.Label>
                  <Form.Control type="text" placeholder="Enter your specialization or subject" name={`education_${index}_specialization`} value={edu.specialization || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Year</Form.Label>
                  <Form.Control type="text" placeholder="Enter your passout year" name={`education_${index}_year`} value={edu.year || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="Enter city" name={`education_${index}_city`} value={edu.city || ''} onChange={handleChange} />
                </Form.Group>
              </Row>
            </div>
          ))
        ) : (
          <p>No education data available</p>
        )}

        {Array.isArray(data.experience) && data.experience.length > 0 ? (
          data.experience.map((exp, index) => (
            <div key={index} className='mt-5'>
              <h3>Experience: {index + 1}</h3>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Organization</Form.Label>
                  <Form.Control type="text" placeholder="Enter your organization" name={`experience_${index}_organization`} value={exp.organization || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Position</Form.Label>
                  <Form.Control type="text" placeholder="Enter your position" name={`experience_${index}_position`} value={exp.position || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Mode</Form.Label>
                  <Form.Control type="text" placeholder="Enter your mode of working" name={`experience_${index}_mode`} value={exp.mode || ''} onChange={handleChange} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Joining Date</Form.Label>
                  <Form.Control type="date" placeholder="Enter your joining date" name={`experience_${index}_joining`} value={exp.joining || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Exit Date</Form.Label>
                  <Form.Control type="date" placeholder="Enter your exit date" name={`experience_${index}_exit`} value={exp.exit || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Place</Form.Label>
                  <Form.Control type="text" placeholder="Enter your city of work" name={`experience_${index}_place`} value={exp.place || ''} onChange={handleChange} />
                </Form.Group>
              </Row>
            </div>
          ))
        ) : (
          <p>No experience data available</p>
        )}

        <h3 className='mt-5'>Skills:</h3>
        {Array.isArray(data.skills) && data.skills.length > 0 ? (
          data.skills.map((skill, index) => (
            <Row key={index} className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Skill {index + 1}</Form.Label>
                <Form.Control type="text" placeholder="Enter your skill" name={`skills_${index}`} value={skill || ''} onChange={handleChange} />
              </Form.Group>
            </Row>
          ))
        ) : (
          <p>No skills data available</p>
        )}

        {Array.isArray(data.projects) && data.projects.length > 0 ? (
          data.projects.map((proj, index) => (
            <div key={index} className='mt-5'>
              <h3>Project: {index + 1}</h3>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your project name" name={`projects_${index}_name`} value={proj.name || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Project Link</Form.Label>
                  <Form.Control type="text" placeholder="Enter your project link" name={`projects_${index}_link`} value={proj.link || ''} onChange={handleChange} />
                </Form.Group>
              </Row>
            </div>
          ))
        ) : (
          <p>No project data available</p>
        )}

        <Row className="mt-5">
          <Col>
            <Button variant="primary" type="submit" style={{ padding: '9px 50px' }}>
              Update
            </Button>
          </Col>
          <Col className="text-end">
            <Link to='/updatePage'>
              <Button variant="outline-primary" type="button" style={{ padding: '9px 50px' }}>
                Back
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Update;
