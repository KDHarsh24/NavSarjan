import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../context/UserContext'; // Import UserContext

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUserData } = useUser(); // Access context to update user data

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/register', { name, email, password });
      if (response.data.success) {
        // Update user data in context
        setUserData({ name, email });
        alert('Registration Successful!');
        navigate('/dashboard'); // Redirect to dashboard after successful registration
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12" md="8" lg="6" xl="5">
          <MDBCard className="bg-light text-dark rounded-3">
            <MDBCardBody className="p-4 text-center">
              <h2 className="fw-bold mb-4">Create Account</h2>
              <MDBInput
                wrapperClass="mb-4"
                label="Name"
                size="lg"
                onChange={(e) => setName(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                type="email"
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                type="password"
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
              />
              <MDBBtn
                className="mb-4 w-100"
                size="lg"
                style={{ backgroundColor: '#007bff', color: '#fff' }}
                onClick={handleRegister}
              >
                Register
              </MDBBtn>
              <p className="small text-muted">
                Already have an account? <a href="/login">Login here</a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
