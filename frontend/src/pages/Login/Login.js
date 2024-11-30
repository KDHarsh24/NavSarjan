import React, { useState } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBCheckbox } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate is the new way in React Router v6
import { postData } from '../../Data/backendmsg';
export let userData = {};


const Login = () => {
  const [userId, setUserId] = useState(''); 
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    // Prepare the login data with userId (email) and password
    const loginData = {
      userId: userId,  // userId will be the email entered by the user
      password: password,
    };
    console.log(loginData)
    try {
      // Send the login data to the backend
      const response = await postData('login', loginData);
      console.log(response);
      if (response.success) {
        // On successful login, store the username (or userId) in localStorage
        userData = response.userdata;
        navigate('/dashboard'); 
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h2 className="fw-bold mb-2 text-center">Sign in</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>
              <MDBInput wrapperClass='mb-4 w-100' label='User ID (Email address)' id='formControlname' type='email' size="lg" value={userId} onChange={(e) => setUserId(e.target.value)}/>

              {/* Password Input */}
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlpassw' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />

              {/* Remember Password Checkbox */}
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password'/>

              {/* Submit Button */}
              <MDBBtn size='lg' onClick={handleLogin}>Login</MDBBtn>

              <hr className="my-4" />

              {/* Google Sign-in Button */}
              <MDBBtn className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                <MDBIcon fab icon="google" className="mx-2" />
                Sign in with Google
              </MDBBtn>

              {/* Facebook Sign-in Button */}
              <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
                <MDBIcon fab icon="facebook-f" className="mx-2" />
                Sign in with Facebook
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
