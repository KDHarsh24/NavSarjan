import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Skeleton, DialogContentText, Container, Typography, Card, CardContent, Button, TextField, List, ListItem, ListItemText, Divider, Slider, IconButton, Box, Link, Dialog, DialogActions, DialogContent, DialogTitle, Checkbox, FormControlLabel } from "@mui/material";
import { Edit, Delete, CloudUpload } from "@mui/icons-material";
import axios from "axios";
import { userdata } from "../Home/Signpage";
import Timeline from "../../components/Timeline";

const ProjectProfile = () => {
  // Initial project data
  const navigate  = useNavigate();
  const [editing, setEditing] = useState(false); // Editing mode toggle
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    ownerName: 'Harsh',
    ownerid: 'harshkumardas24@gmail.com',
    id: 1,
    name: "WebTree", // Non-editable
    description: "HTML parser and tree structure generator.",
    technologies: ["Python", "Flask"],
    status: "In Progress",
    progress: [
      {
        date: "2024-11-01",
        description: "Started development",
        documents: [
          { name: "DesignDoc.pdf", url: "/documents/DesignDoc.pdf" },
        ],
      },
    ],
    completion: 50, // Editable percentage
    investors: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        amount: 1000,
        document: {name: 'hello', url: 'pdf.com'},
        verified: true
      },
    ],
    collaborators: [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        role: "Developer",
      },
    ],
  });
  const location = useLocation();
  const { name, id } = location.state || {};
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5001/api/fetchone", {
          collectionName: "project", // Name of the collection
          condition: {_id: id}, // Replace with your condition, e.g., {status: "active"}
          projection: {}, // Fields to fetch
        });

        if (response.data.success) {
          const projects = response.data.data;
          console.log(projects)

          // Format data for rows
          // Update projectRows state
          setProject(projects);
          // Update projectDash state
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  
   const technologyDomains = [
        "3D Printing", "5G", "AI/ML", "Analytics", "API", "AR-VR-MR", "Automation", "Battery", "Big Data", "Biometrics", 
        "Blockchain", "Cloud Computing", "Computer Vision", "Drone", "Electric Powertrains", "Electric Vehicles", 
        "Energy Storage", "Generative AI", "Genomics", "Geospatial & Space Tech", "Hardware", "IAAS", "IoT", 
        "Logistics", "Micro-Mobility", "Mobile App", "Nanotechnology", "NLP/ Deep Learning", "Other", "PAAS", 
        "Quantum Computing", "Robotics", "SAAS", "Software", "Web Platform"
    ];
  const [newCollaborator, setNewCollaborator] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [collaboratorDialogOpen, setCollaboratorDialogOpen] = useState(false);
  const [investorEditDialogOpen, setInvestorEditDialogOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  // Add new collaborator
  const handleAddCollaborator = () => {
    if (
      newCollaborator.name.trim() === "" ||
      newCollaborator.email.trim() === "" ||
      newCollaborator.role.trim() === ""
    )
      return;

    setProject((prev) => ({
      ...prev,
      collaborators: [
        ...prev.collaborators,
        { id: Date.now(), ...newCollaborator },
      ],
    }));

    // Clear inputs and close dialog
    setNewCollaborator({ name: "", email: "", role: "" });
    setCollaboratorDialogOpen(false);
  };

  // Add new progress entry
  const handleAddProgress = () => {
    if (newDate.trim() === "" || newDescription.trim() === "") return;

    setProject((prev) => ({
      ...prev,
      progress: [
        ...prev.progress,
        {
          date: newDate,
          description: newDescription,
          documents: uploadedDocs.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file), // Generate temporary URLs for new files
          })),
        },
      ],
    }));

    // Clear the inputs
    setNewDate("");
    setNewDescription("");
    setUploadedDocs([]);
  };

  // Handle completion percentage change
  const handleCompletionChange = (event, newValue) => {
    setProject((prev) => ({
      ...prev,
      completion: newValue,
    }));
  };

  // Toggle edit mode
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toggleEditing();
    console.log(project);
    try {
      const response = await axios.post("http://localhost:5001/api/replace", {
        collectionName: "project",
        condition: {_id: project._id}, // Parse JSON from the input
        data: project, // Parse JSON from the input
      });

      if (response.data.success) {
        setDialogTitle("Success");
        setDialogMessage("Document replaced successfully.");
      } else {
        setDialogTitle("Error");
        setDialogMessage(response.data.message || "Failed to replace document.");
      }
    } catch (err) {
      setDialogTitle("Error");
      setDialogMessage(err.response?.data?.message || "Server error.");
    } finally {
      setLoading(false);
      setDialogOpen(true); // Open dialog box
    }
  };

  // Update project fields
  const handleFieldChange = (field, value) => {
    setProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add document to upload
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedDocs((prev) => [...prev, ...files]);
  };

  // Remove a document
  const handleRemoveDocument = (index) => {
    setUploadedDocs((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove a collaborator
  const handleRemoveCollaborator = (id) => {
    setProject((prev) => ({
      ...prev,
      collaborators: prev.collaborators.filter((collab) => collab.id !== id),
    }));
  };
  

const handleEditInvestor = (investor) => {
  setSelectedInvestor({ ...investor });
  setInvestorEditDialogOpen(true);
};

const handleSaveInvestor = () => {
  if (!selectedInvestor.name || !selectedInvestor.email || !selectedInvestor.amount) {
    alert("Please fill all fields!");
    return;
  }

  setProject((prev) => ({
    ...prev, investors: [...prev.investors, { id: Date.now(), ...selectedInvestor }]
  }));

  setInvestorEditDialogOpen(false);
  setSelectedInvestor(null);
};

const handleRemoveInvestor = (investorId) => {
  const updatedInvestors = project.investors.filter((investor) => investor.id !== investorId);
  setProject((prev) => ({
    ...prev,
    investors: updatedInvestors,
  }));
};

const handleInvestorDocumentChange = (e) => {
  const file = e.target.files[0];
  setSelectedInvestor((prev) => ({
    ...prev,
    document: file ? { name: file.name, url: URL.createObjectURL(file) } : prev.document,
  }));
};
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  if (name === 'incorporated'){
    setProject((prevState) => ({
        ...prevState,
        [name]: value,
      }));
}
else if (type === "checkbox") {
  setProject((prevState) => {
    const updatedValue = checked
      ? [...prevState[name], value] // Add to array if checked
      : prevState[name].filter((item) => item !== value); // Remove from array if unchecked
    return { ...prevState, [name]: updatedValue };
  });
} else {
  setProject((prevState) => ({
    ...prevState,
    [name]: value,
  }));
}
};
const handleDialogClose = (e) => {
  if (e.currentTarget.title=== 'ok')
    navigate('/dashboard')
  setDialogOpen(false);
};
if (loading){
  return(<div style={{ width: '100%' }}>
    <Skeleton animation="wave" width='100%' height='150px'/>
    <Skeleton animation="wave" width='100%' height='100vh' style={{margin: '0px', padding: '0px', position: 'relative', top: '-150px'}}/>
  </div>);
}
  return (
    <Container>
      {/* Project Details */}
      <Card style={{ margin: "20px 0", padding: "20px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {project.name} {/* Non-editable */}
          </Typography>
          <Button style={{marginBottom: '20px'}} variant="contained" color="primary" onClick={() => navigate(`/dashboard/profile/${project.ownerid}`)}>Researcher: {project.ownerName}</Button>
          <TextField fullWidth label="Description & Abstract" variant="outlined" minRows={5} value={project.description} disabled={!editing} onChange={(e) => handleFieldChange("description", e.target.value)} style={{ marginBottom: "10px" }} multiline maxRows={Infinity}/>
          {editing ? 
              <div style={{marginBottom: '15px'}}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Technology Used</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {technologyDomains.map((model, index) => (
                    <FormControlLabel key={index} control={<Checkbox color="primary" value={model} checked={project.technologies.includes(model)} onChange={handleInputChange} name="technologies"/>} label={model}/>
                  ))}
                </div>
              </div>
              :<TextField fullWidth label="Industry" variant="outlined" value={project.technologies} name="industry" onChange={handleInputChange} disabled={!editing} sx={{ marginBottom: "10px" }}/>}
          <TextField fullWidth label="Current Status" variant="outlined" value={project.status} disabled={!editing} onChange={(e) => handleFieldChange("status", e.target.value)} style={{ marginBottom: "10px" }}/>

          <Divider style={{ margin: "20px 0" }} />

          {/* Completion Percentage */}
          <Typography variant="h5" gutterBottom>
            Completion Percentage
          </Typography>
          <Slider value={project.completion} onChange={handleCompletionChange} aria-labelledby="completion-slider" valueLabelDisplay="auto" step={5} marks min={0} max={100} disabled={!editing}/>
          <Typography variant="body2" color="textSecondary">
            Current Completion: {project.completion}%
          </Typography>

          <Divider style={{ margin: "20px 0" }} />

          {/* Collaborators */}
          <Typography variant="h5" gutterBottom>
            Collaborators
          </Typography>
          <List>
            {project.collaborators.map((collab) => (
              <ListItem key={collab.id}>
                <ListItemText primary={`${collab.name} (${collab.role})`} secondary={collab.email}/>
                <IconButton color="error" onClick={() => handleRemoveCollaborator(collab.id)}>
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button variant="contained" disabled={!editing} color="primary" onClick={() => setCollaboratorDialogOpen(true)}>
            Add Collaborator
          </Button>

          {/* Add Collaborator Dialog */}
          <Dialog open={collaboratorDialogOpen} onClose={() => setCollaboratorDialogOpen(false)}>
            <DialogTitle>Add Collaborator</DialogTitle>
            <DialogContent>
              <TextField fullWidth label="Name" value={newCollaborator.name} onChange={(e) => setNewCollaborator((prev) => ({...prev, name: e.target.value,}))} style={{ marginBottom: "10px" }}/>
              <TextField fullWidth label="Email" value={newCollaborator.email} onChange={(e) => setNewCollaborator((prev) => ({...prev, email: e.target.value,}))} style={{ marginBottom: "10px" }}/>
              <TextField fullWidth label="Role" value={newCollaborator.role} onChange={(e) => setNewCollaborator((prev) => ({...prev, role: e.target.value,}))} style={{ marginBottom: "10px" }}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setCollaboratorDialogOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleAddCollaborator} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>

          <Divider style={{ margin: "20px 0" }} />
          <Divider style={{ margin: "20px 0" }} />

{/* Progress History */}
<Typography variant="h5" gutterBottom>
  Progress History
</Typography>
<List>
  {project.progress.map((status, index) => (
    <Box key={index}>
      <ListItem>
        <ListItemText primary={status.description} secondary={`Date: ${status.date}`}/>
      </ListItem>
      <Typography variant="body2" style={{ marginLeft: "16px" }}>
        Documents:
      </Typography>
      <List>
        {status.documents.map((doc, docIndex) => (
          <ListItem key={docIndex} style={{ marginLeft: "32px" }}>
            <Link href={doc.url} target="_blank" rel="noopener noreferrer">
              {doc.name}
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  ))}
</List>

<Divider style={{ margin: "20px 0" }} />

{/* Add Progress */}
<Typography variant="h5" gutterBottom>
  Add Progress Entry
</Typography>
<TextField fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" value={newDate} onChange={(e) => setNewDate(e.target.value)} style={{ marginBottom: "10px" }}/>
<TextField fullWidth label="Description" variant="outlined" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}  style={{ marginBottom: "10px" }}/>
<input type="file" multiple onChange={handleDocumentUpload} style={{ marginBottom: "10px" }}/>
<List>
  {uploadedDocs.map((doc, index) => (
    <ListItem key={index}>
      {doc.name}
      <IconButton onClick={() => handleRemoveDocument(index)}>
        <Delete />
      </IconButton>
    </ListItem>
  ))}
</List>
<Button variant="contained" color="primary" onClick={handleAddProgress} disabled={!editing || (!newDate.trim() || !newDescription.trim())}>
  Add Progress
</Button>

<Divider style={{ margin: "20px 0" }} />

<Typography variant="h4" gutterBottom>
        Investors
      </Typography>
      <List>
        {project.investors.map((investor) => (
          <ListItem key={investor.id} style={{ marginBottom: "10px" }}>
            <ListItemText primary={`${investor.name} - $${investor.amount}`} secondary={`Email: ${investor.email}`}/>
            <Link href={investor.document?.url} target="_blank" rel="noopener noreferrer">{investor.document?.name}</Link>
            <IconButton color="error" disabled={!editing} onClick={() => handleRemoveInvestor(investor.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button disabled={!editing} variant="contained" color="primary" onClick={() => handleEditInvestor({ id: Date.now(), name: "", email: "", amount: "", document: { name: "", url: "" },})}>
        Add Investor
      </Button>

      {/* Edit/Add Investor Dialog */}
      <Dialog open={investorEditDialogOpen} onClose={() => setInvestorEditDialogOpen(false)}>
        <DialogTitle>{selectedInvestor?.id ? "Edit Investor" : "Add Investor"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" value={selectedInvestor?.name || ""} onChange={(e) => setSelectedInvestor((prev) => ({ ...prev, name: e.target.value }))} style={{ marginBottom: "10px" }}/>
          <TextField fullWidth label="Email" value={selectedInvestor?.email || ""} onChange={(e) => setSelectedInvestor((prev) => ({ ...prev, email: e.target.value }))} style={{ marginBottom: "10px" }}/>
          <TextField fullWidth label="Amount" type="number" value={selectedInvestor?.amount || ""} onChange={(e) => setSelectedInvestor((prev) => ({ ...prev, amount: e.target.value }))} style={{ marginBottom: "10px" }}/>
          <Button variant="contained" component="label" color="primary" startIcon={<CloudUpload/>}>
              Upload Document
              <input hidden accept=".pdf, .ppt, .docx" type="file" onChange={handleInvestorDocumentChange}/>
            </Button>
          {selectedInvestor?.document?.name && (
            <Typography variant="body2">
              Current Document: {selectedInvestor.document.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvestorEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveInvestor} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        {/*run this after data {(userData.user === 'investor')?:} */}
        {(userdata.email === project.ownerid) ?(editing ? 
          <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: "20px" }} >
            Save
          </Button>:
          <Button variant="contained" color="secondary" onClick={toggleEditing} style={{ marginTop: "20px" }} >
          Edit
        </Button>):<></>}
        
          {/*run this after data {(userData.type === 'investor')?:} */}
          <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>Invest</Button>
          </div>
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} title={'open'} onClose={handleDialogClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" title={'ok'} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      
    </Container>
  );
};

export default ProjectProfile;

