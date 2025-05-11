import React, { useState } from "react";
import {
    Typography,
    Grid,
    TextField,
    Box,
    Button,
    IconButton,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import axios from "axios";
import { userdata } from "../Home/Signpage";

const IPRForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        applicantName: "",
        address: "",
        nationality: "",
        phone: "",
        email: userdata.email,
        inventionTitle: "",
        abstract: "",
        description: "",
        claims: "",
        documents: [],
        declaration: false,
        status: "Sent to Our Executives",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFileUpload = (e) => {
        const newFiles = Array.from(e.target.files); // Convert FileList to array
        setFormData((prev) => ({
            ...prev,
            documents: [...prev.documents, ...newFiles],
        }));
    };

    const handleRemoveFile = (index) => {
        setFormData((prev) => ({
            ...prev,
            documents: prev.documents.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "documents") {
                formData.documents.forEach((file) => data.append("documents", file));
            } else {
                data.append(key, formData[key]);
            }
        });
        console.log(formData);
        try {
            const response = await axios.post("https://navsarjan-2.onrender.comapi/insert", {
              collectionName: "ipr",
              data: formData,
            });
      
            if (response.status === 200) {
              console.log("Project inserted successfully:", response.data);
              alert("Project created successfully!");
            } else {
              console.error("Failed to insert project:", response.data.message);
              alert(`Error: ${response.data.message}`);
            }
            navigate('/dashboard')
          } catch (error) {
            console.error("Error while submitting project:", error);
            alert("Failed to create project. Please try again.");
          }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom style={{marginTop: '10px'}}>
                Applicant Details
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth  label="Applicant Name" name="applicantName" value={formData.applicantName} onChange={handleChange} required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} multiline rows={3} required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange}required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Email" name="email" value={formData.email} disabled={true} onChange={handleChange} required type="email"/>
                </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Invention Details
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField fullWidth label="Title of Invention" name="inventionTitle" value={formData.inventionTitle} onChange={handleChange} required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Abstract" name="abstract" value={formData.abstract} onChange={handleChange} multiline rows={4} required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Detailed Description" name="description" value={formData.description} onChange={handleChange} multiline rows={4} required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Claims" name="claims" value={formData.claims} onChange={handleChange} multiline rows={4} required/>
                </Grid>
            </Grid>

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Upload Additional Documents
            </Typography>
            <label htmlFor="document-upload">
                <input id="document-upload" multiple type="file" style={{ display: "none" }} onChange={handleFileUpload}/>
                <Button variant="outlined" component="span" fullWidth>
                    Add Documents
                </Button>
            </label>

            <Box sx={{ mt: 2 }}>
                {formData.documents.length > 0 && (
                    <Typography variant="h6">Uploaded Documents</Typography>
                )}
                {formData.documents.map((file, index) => (
                    <Box key={index} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, p: 1, border: "1px solid #ccc", borderRadius: "4px"}}>
                        <Typography>{file.name}</Typography>
                        <Box>
                            <IconButton component="a" href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">
                                <OpenInNewIcon />
                            </IconButton>
                            <IconButton onClick={() => handleRemoveFile(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Box>

            <FormControlLabel control={<Checkbox name="declaration" checked={formData.declaration} onChange={handleChange} required/>} label="I hereby declare that the information provided is true and accurate." sx={{ mt: 4 }}/>

            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Submit
            </Button>
        </form>
    );
};

export default IPRForm;
