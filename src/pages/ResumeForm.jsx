import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const initialField = {
  image: '',
  name: '',
  designation: '',
  about: '',
  email: '',
  number: '',
  address: '',
  portfolio: '',
  linkedin: '',
  github: '',
  education: [{ schoolname: '', education: '', specialization: '', year: '', city: '' }],
  experience: [{ organization: '', position: '', mode: '', joining: '', exit: '', place: '' }],
  skills: [''],
  projects: [{ name: '', link: '' }]
};

const ResumeForm = ({ setId }) => {
  const [data, setData] = useState(initialField);

  const handleChange = (e, index, type) => {
    const updatedFields = data[type].map((item, i) =>
      i === index ? { ...item, [e.target.name]: e.target.value } : item
    );
    setData({ ...data, [type]: updatedFields });
  };

  const handlePersonalChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addField = (type) => {
    setData({ ...data, [type]: [...data[type], { ...initialField[type][0] }] });
  };

  const removeField = (type, index) => {
    const updatedFields = data[type].filter((_, i) => i !== index);
    setData({ ...data, [type]: updatedFields });
  };

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 75000) {
        alert('File size is too large! Profile image should be less than 75Kb');
        return;
      }
      const reader = new FileReader();
      reader.onload = (upload) => {
        setData({ ...data, image: upload.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://66a4bd8f5dc27a3c1909ae82.mockapi.io/stu/det/resume', data)
      .then((res) => {
        setId(res.data.id);
        setData(initialField);
        navigate('/showTemplate');
      });
  };

  return (
    <div style={{ margin: '50px 100px' }}>
      <h1>Fill The Details</h1>
      <Form
        style={{
          border: '2px solid black',
          padding: '30px',
          marginTop: '30px',
          boxShadow: '0px 0px 50px 0px black',
        }}
        onSubmit={handleSubmit}
      >
        <h3>Personal Detail:</h3>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className='mt-3'>Profile Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {data.image && (
              <div style={{ position: 'absolute', left: '550px', marginTop: '-100px', zIndex: "0" }}>
                <img
                  src={data.image}
                  alt="Profile Preview"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </div>
            )}
          </Form.Group >
          <Form.Group as={Col}></Form.Group>
          <Form.Group as={Col}></Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={data.name}
              onChange={handlePersonalChange}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your designation"
              name="designation"
              value={data.designation}
              onChange={handlePersonalChange}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>About Us</Form.Label>
            <Form.Control
              type="text"
              placeholder="About us"
              name="about"
              value={data.about}
              onChange={handlePersonalChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              name="email"
              value={data.email}
              onChange={handlePersonalChange}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your mobile number"
              name="number"
              value={data.number}
              onChange={handlePersonalChange}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              name="address"
              value={data.address}
              onChange={handlePersonalChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-5">
          <Form.Group as={Col}>
            <Form.Label>Portfolio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your portfolio link"
              name="portfolio"
              value={data.portfolio}
              onChange={handlePersonalChange}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Linkedin</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your linkedin link"
              name="linkedin"
              value={data.linkedin}
              onChange={handlePersonalChange}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Github</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your github link"
              name="github"
              value={data.github}
              onChange={handlePersonalChange}
            />
          </Form.Group>
        </Row>

        {data.education.map((edu, index) => (
          <div key={index}>
            <h3>Education {index + 1}:</h3>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>School/College</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your school/college name"
                  name="schoolname"
                  value={edu.schoolname}
                  onChange={(e) => handleChange(e, index, 'education')}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Degree/Class</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your degree/class"
                  name="education"
                  value={edu.education}
                  onChange={(e) => handleChange(e, index, 'education')}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Specialization/Subject</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your specialization/subject"
                  name="specialization"
                  value={edu.specialization}
                  onChange={(e) => handleChange(e, index, 'education')}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Year</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter year of passing"
                  name="year"
                  value={edu.year}
                  onChange={(e) => handleChange(e, index, 'education')}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  value={edu.city}
                  onChange={(e) => handleChange(e, index, 'education')}
                />
              </Form.Group>
            </Row>

            <Row className="mb-5">
              <Button
                as={Col}
                variant="danger"
                onClick={() => removeField('education', index)}
                style={{ margin: '10px' }}
              >
                Remove Education
              </Button>
              <Button
                as={Col}
                variant="primary"
                onClick={() => addField('education')}
                style={{ margin: '10px' }}
              >
                Add Education
              </Button>
            </Row>
          </div>
        ))}

        {data.experience.map((exp, index) => (
          <div key={index}>
            <h3>Experience {index + 1}:</h3>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Organization</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your organization"
                  name="organization"
                  value={exp.organization}
                  onChange={(e) => handleChange(e, index, 'experience')}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your position"
                  name="position"
                  value={exp.position}
                  onChange={(e) => handleChange(e, index, 'experience')}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Mode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the work mode"
                  name="mode"
                  value={exp.mode}
                  onChange={(e) => handleChange(e, index, 'experience')}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Joining Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter joining date"
                  name="joining"
                  value={exp.joining}
                  onChange={(e) => handleChange(e, index, 'experience')}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Exit Date</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter exit date"
                  name="exit"
                  value={exp.exit}
                  onChange={(e) => handleChange(e, index, 'experience')}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  name="place"
                  value={exp.place}
                  onChange={(e) => handleChange(e, index, 'experience')}
                />
              </Form.Group>
            </Row>

            <Row className='mb-5'>
              <Button
                as={Col}
                variant="danger"
                onClick={() => removeField('experience', index)}
                style={{ margin: '10px' }}
              >
                Remove Experience
              </Button>

              <Button
                as={Col}
                variant="primary"
                onClick={() => addField('experience')}
                style={{ margin: '10px' }}
              >
                Add Experience
              </Button>
            </Row>
          </div>
        ))}


        <h3>Skills:</h3>
        {data.skills.map((skill, index) => (
          <div key={index}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Skill {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a skill"
                  name="skills"
                  value={skill}
                  onChange={(e) => {
                    const updatedSkills = data.skills.map((s, i) =>
                      i === index ? e.target.value : s
                    );
                    setData({ ...data, skills: updatedSkills });
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-5">
              <Button
                as={Col}
                variant="danger"
                onClick={() => {
                  const updatedSkills = data.skills.filter((_, i) => i !== index);
                  setData({ ...data, skills: updatedSkills });
                }}
                style={{ margin: '10px 10px 10px 0px' }}
              >
                Remove Skill
              </Button>

              <Button
                as={Col}
                variant="primary"
                onClick={() => setData({ ...data, skills: [...data.skills, ''] })}
                style={{ margin: '10px' }}
              >
                Add Skill
              </Button>
            </Row>
          </div>
        ))}

        {data.projects.map((proj, index) => (
          <div key={index}>
            <h3>Project {index + 1}:</h3>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter project name"
                  name="name"
                  value={proj.name}
                  onChange={(e) => handleChange(e, index, 'projects')}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter project link"
                  name="link"
                  value={proj.link}
                  onChange={(e) => handleChange(e, index, 'projects')}
                />
              </Form.Group>
            </Row>

            <Row>
              <Button
                as={Col}
                variant="danger"
                onClick={() => removeField('projects', index)}
                style={{ margin: '10px 10px 10px 0px' }}
              >
                Remove Project
              </Button>

              <Button
                as={Col}
                variant="primary"
                onClick={() => addField('projects')}
                style={{ margin: '10px' }}
              >
                Add Project
              </Button>
            </Row>
          </div>
        ))}

        <Row>
          <Button
            variant="primary"
            type="submit"
            style={{ marginTop: '60px' }}
          >
            Submit
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default ResumeForm;