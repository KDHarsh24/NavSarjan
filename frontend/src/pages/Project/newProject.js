import React, { useState } from "react";
import { Container, Typography, Card, CardContent, Button, TextField, List, ListItem, ListItemText, Divider, Slider, IconButton, Box, Link, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { AiFillProject } from "react-icons/ai";

const NewProject = () => {
  // Initial project data
  const [project, setProject] = useState({
    name: "", // Non-editable
    description: "",
    technologies: "",
    status: "",
    progress: [
    //   {
    //     date: "",
    //     description: "",
    //     documents: [
    //       { name: "", url: "" },
    //     ],
    //   },
    ],
    completion: 0, // Editable percentage
    investors: [
    //   {
    //     id: 1,
    //     name: "",
    //     email: "",
    //   },
    ],
    collaborators: [
    //   {
    //     id: 1,
    //     name: "",
    //     email: "",
    //     role: "",
    //   },
    ],
  });

  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const [newCollaborator, setNewCollaborator] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [collaboratorDialogOpen, setCollaboratorDialogOpen] = useState(false);

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

  return (
    <Container>
      {/* Project Details */}
      <div className="projectTop" style={{padding: '0px'}}>
        <div className="projectDash">
            <span>New Project</span> <AiFillProject/>
        </div>
        </div>
      <Card style={{ margin: "20px 0", padding: "20px" }}>
        <CardContent>
        <TextField fullWidth label="Title" variant="outlined" value={project.name} onChange={(e) => handleFieldChange("description", e.target.value)} style={{ marginBottom: "10px" }} maxRows={Infinity}/>
          <TextField fullWidth label="Description" variant="outlined" value={project.description} onChange={(e) => handleFieldChange("description", e.target.value)} style={{ marginBottom: "10px" }} multiline maxRows={Infinity}/>
          <TextField fullWidth label="Technologies" variant="outlined" value={project.technologies} onChange={(e) => handleFieldChange("technologies", e.target.value)} style={{ marginBottom: "10px" }}/>
          <TextField fullWidth label="Current Status" variant="outlined" value={project.status} onChange={(e) => handleFieldChange("status", e.target.value)} style={{ marginBottom: "10px" }}/>

          <Divider style={{ margin: "20px 0" }} />

          {/* Completion Percentage */}
          <Typography variant="h5" gutterBottom>
            Completion Percentage
          </Typography>
          <Slider value={project.completion}  onChange={handleCompletionChange} aria-labelledby="completion-slider" valueLabelDisplay="auto" step={5} marks min={0} max={100}/>
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
          <Button variant="contained" color="primary" onClick={() => setCollaboratorDialogOpen(true)}>
            Add Collaborator
          </Button>

          {/* Add Collaborator Dialog */}
          <Dialog open={collaboratorDialogOpen} onClose={() => setCollaboratorDialogOpen(false)}>
            <DialogTitle>Add Collaborator</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Name"
                value={newCollaborator.name}
                onChange={(e) =>
                  setNewCollaborator((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                label="Email"
                value={newCollaborator.email}
                onChange={(e) =>
                  setNewCollaborator((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                style={{ marginBottom: "10px" }}
              />
              <TextField
                fullWidth
                label="Role"
                value={newCollaborator.role}
                onChange={(e) =>
                  setNewCollaborator((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                style={{ marginBottom: "10px" }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setCollaboratorDialogOpen(false)}
                color="secondary"
              >
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
        <ListItemText
          primary={status.description}
          secondary={`Date: ${status.date}`}
        />
      </ListItem>
      <Typography variant="body2" style={{ marginLeft: "16px" }}>
        Documents:
      </Typography>
      <List>
        {status.documents.map((doc, docIndex) => (
          <ListItem key={docIndex} style={{ marginLeft: "32px" }}>
            <Link
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
            >
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
<TextField
  fullWidth
  label="Date"
  type="date"
  InputLabelProps={{ shrink: true }}
  variant="outlined"
  value={newDate}
  onChange={(e) => setNewDate(e.target.value)}
  style={{ marginBottom: "10px" }}
/>
<TextField
  fullWidth
  label="Description"
  variant="outlined"
  value={newDescription}
  onChange={(e) => setNewDescription(e.target.value)}
  style={{ marginBottom: "10px" }}
/>
<input
  type="file"
  multiple
  onChange={handleDocumentUpload}
  style={{ marginBottom: "10px" }}
/>
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
<Button
  variant="contained"
  color="primary"
  onClick={handleAddProgress}
  disabled={!newDate.trim() || !newDescription.trim()}
>
  Add Progress
</Button>

<Divider style={{ margin: "20px 0" }} />

{/* Investors Section */}
<Typography variant="h5" gutterBottom>
  Investors
</Typography>
<List>
  {project.investors.map((investor) => (
    <ListItem key={investor.id}>
      <ListItemText
        primary={investor.name}
        secondary={investor.email}
      />
      <Button variant="outlined" color="primary">
        View Profile
      </Button>
    </ListItem>
  ))}
</List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewProject;

