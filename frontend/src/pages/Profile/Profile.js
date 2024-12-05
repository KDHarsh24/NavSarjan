import React, { useState, useEffect } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBBreadcrumb, MDBBreadcrumbItem, MDBIcon, MDBListGroup, MDBListGroupItem, MDBInput } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useParams } from 'react-router-dom';
import { userData } from '../Login/Login';

export default function ProfilePage({email}) {
  const { userId } = useParams(); // Get the userId from the URL
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({
    email: 'harshkumardas24@gmail.com',
    password: '123456789',
    name: 'Harsh',
    address: 'Empire State Building, \nNew York',
    phone: '7592004436',
    image: null,
    social: [{ paltform: 'linkedin', url: 'linkedin.com'}, { paltform: 'github', url: 'github.com'}],
    dob: '2004-10-07'
  })
  // Fetch data when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/profile/${userId}`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchData();
  }, [userId]); // Re-fetch if userId changes

  // State to manage profile data
    

    const [photo, setPhoto] = useState(
        'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
    );

    // Backup of the original profile for cancel functionality
    const [originalProfile, setOriginalProfile] = useState(profile);
    const [originalPhoto, setOriginalPhoto] = useState(photo);

    // State to toggle edit mode
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const photoURL = URL.createObjectURL(file);
        setPhoto(photoURL);
        }
    };
    const handleEdit = () => {
        setOriginalProfile(profile); // Save current state as backup
        setOriginalPhoto(photo); // Save current photo as backup
        setIsEditing(true);
    };

    const handleSave = (e) => {
        setIsEditing(false); // Save changes and exit edit mode
        e.preventDefault();
        setProfile({...profile, image: photo})
        console.log("data is: ", profile)

    };

    const handleCancel = () => {
        setProfile(originalProfile); // Revert to original profile
        setPhoto(originalPhoto); // Revert to original photo
        setIsEditing(false); // Exit edit mode
    };
  return (
      <MDBContainer className="py-5 profilebox">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>{profile.name}</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage src={photo} alt="profilePicture" className="rounded-circle mb-3" style={{ width: '138px' }} fluid/>
                {isEditing && (
                  <div>
                    <label htmlFor="photoUpload" className="btn btn-sm btn-primary">
                      Upload Photo
                    </label>
                    <input type="file" id="photoUpload" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange}/>
                  </div>
                )}
                {isEditing ? (
                  <div className='firstboxprofile'>
                    <MDBInput className="text-muted mb-1" label="Profession" name="profession" value={profile.profession} onChange={handleChange}/>
                    <MDBInput className="text-muted mb-4" label="Location" name="location" value={profile.address} onChange={handleChange} style={{marginBottom: '0px'}}/>
                  </div>
                ) : (
                  <>
                    <p className="text-muted mb-1">{profile.name}</p>
                    <p className="text-muted mb-4">{profile.address}</p>
                    <div className="d-flex justify-content-center mb-2">
                        <MDBBtn outline className="ms-1">Message</MDBBtn>
                    </div>
                  </>
                )}
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup className="rounded-3">
                  {[
                    { icon: 'globe', name: 'website', label: profile.website },
                    { icon: 'github', name: 'github', label: profile.linkedin },
                  ].map((item) => (
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3" key={item.name}>
                      <MDBIcon fab icon={`${item.icon} fa-lg`} />
                      {isEditing ? (
                        <MDBInput
                          name={item.name}
                          value={profile[item.name]}
                          onChange={handleChange}
                          style={{ border: 'none', background: 'transparent' }}
                        />
                      ) : (
                        <MDBCardText>{item.label}</MDBCardText>
                      )}
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                {[
                  { label: 'Full Name', name: 'fullName', value: profile.name },
                  { label: 'Email', name: 'email', value: profile.email },
                  { label: 'Phone', name: 'phone', value: profile.phone },
                  { label: 'Address', name: 'address', value: profile.address },
                ].map((field) => (
                  <React.Fragment key={field.name}>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>{field.label}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        {isEditing ? (
                          <MDBInput
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                          />
                        ) : (
                          <MDBCardText className="text-muted">{field.value}</MDBCardText>
                        )}
                      </MDBCol>
                    </MDBRow>
                    <hr />
                  </React.Fragment>
                ))}
              </MDBCardBody>
            </MDBCard>

            <MDBRow className="text-center">
              {(userData.userid === userId) ? ( <MDBCol>
                    {isEditing ? (
                      <>
                        <MDBBtn color="success" onClick={handleSave}>
                          Save
                        </MDBBtn>
                        <MDBBtn color="danger" className="ms-2" onClick={handleCancel}>
                          Cancel
                        </MDBBtn>
                      </>
                    ) : (
                      <MDBBtn onClick={handleEdit}>Edit</MDBBtn>
                    )}
                  </MDBCol>): (<MDBCol className='hellotest'></MDBCol>)}
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
  );
}
