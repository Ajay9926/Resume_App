import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Show = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://66a4bd8f5dc27a3c1909ae82.mockapi.io/stu/det/resume");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error here, maybe show a message to the user
    }
  };

  const handleTemplateChange = (id, template) => {
    if (template) {
      navigate(`/${template}/${id}`);
    }
  };

  return (
    <div style={{ margin: '50px 200px 50px 200px' }}>
      <h1>Get Your Resume Here :</h1>
      <table className="table" style={{ border: '2px solid black', padding: '30px', marginTop: '30px', boxShadow: '0px 0px 50px 0px black' }}>
        <thead className="thead-dark">
          <tr style={{ textAlign: 'center' }}>
            <th scope="col">S.no</th>
            <th scope="col">Maker Name</th>
            <th scope="col">Email Id</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => (
            <tr style={{ textAlign: 'center' }} key={value.id}>
              <td>{index + 1}</td>
              <td>{value.name}</td>
              <td>{value.email}</td>
              <td>
                <select
                  onChange={(e) => handleTemplateChange(value.id, e.target.value)}
                  style={{ padding: '10px' }}
                >
                  <option value="">Select Template</option>
                  <option value="template1">Template 1</option>
                  <option value="template2">Template 2</option>
                  <option value="template3">Template 3</option>
                  <option value="template4">Template 4</option>
                  <option value="template5">Template 5</option>
                  <option value="template6">Template 6</option>
                  <option value="template7">Template 7</option>
                  <option value="template8">Template 8</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Show;
