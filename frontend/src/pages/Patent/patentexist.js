import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Skeleton
} from "@mui/material";
import { userdata } from "../Home/Signpage";
import Timeline from "../../components/Timeline";

const IPRDatas = () => {
  const [loading, setLoading] = useState(true); // For managing loading state
  const [formData, setFormData] = useState([
    {
      applicantName: "John Doe",
      address: "123 Main St",
      nationality: "American",
      phone: "1234567890",
      email: "john.doe@example.com",
      inventionTitle: "Invention 1",
      abstract: "This is an abstract",
      description: "This is a detailed description",
      claims: "This is my claim",
      documents: [{ url: "http://example.com/doc1", name: "Document 1" }],
      declaration: true,
      status: "Sent to Our Executives",
      message: "Initial message",
    },{
        applicantName: "John Doe",
        address: "123 Main St",
        nationality: "American",
        phone: "1234567890",
        email: "john.doe@example.com",
        inventionTitle: "Invention 1",
        abstract: "This is an abstract",
        description: "This is a detailed description",
        claims: "This is my claim",
        documents: [{ url: "http://example.com/doc1", name: "Document 1" }],
        declaration: true,
        status: "Sent to Our Executives",
        message: "Initial message",
      },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://navsarjan-2.onrender.comapi/fetch", {
          collectionName: "ipr", // Name of the collection
          condition: {email: userdata.email}, // Replace with your condition, e.g., {status: "active"}
          projection: {}, // Fields to fetch
        });

        if (response.data.success) {
          const projects = response.data.data;
          console.log(projects)

          // Format data for rows
          // Update projectRows state
          setFormData(projects);
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const handleDialogOpen = (record) => {
    setCurrentRecord({ ...record });
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentRecord(null);
  };

  const handleStatusChange = (event) => {
    setCurrentRecord((prev) => ({ ...prev, status: event.target.value }));
  };

  const handleMessageChange = (event) => {
    setCurrentRecord((prev) => ({ ...prev, message: event.target.value }));
  };

  const handleSave = () => {
    setFormData((prev) =>
      prev.map((record) =>
        record.email === currentRecord.email ? { ...currentRecord } : record
      )
    );
    handleDialogClose();
  };
  if (loading){
    return(
      <div style={{ width: '100%' }}>
      <Skeleton animation="wave" width='100%' height='150px'/>
      <div style={{width: '100%', display: 'flex', position: 'relative', top: '-50px'}}>
        <Skeleton  width='100%' style={{marginRight: '16px', height: '300px', padding: '0px'}}/>
        <Skeleton animation="wave" width='100%' style={{marginRight: '16px', height: '300px', padding: '0px'}}/>
        <Skeleton animation={false} width='100%' style={{ height: '300px', padding: '0px'}}/>
      </div>
      <Skeleton animation="wave" width='100%' height='500px' style={{margin: '0px', padding: '0px', position: 'relative', top: '-150px'}}/>
    </div>
    );
  }
  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Your Application
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Applicant Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Message</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.applicantName}</TableCell>
                <TableCell>{record.email}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>{record.message}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDialogOpen(record)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Editing Details */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth>
        <DialogTitle>Update Status and Message</DialogTitle>
        <DialogContent>
          {currentRecord && (
            <div>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Typography>
                <strong>Applicant Name:</strong> {currentRecord.applicantName}
              </Typography>
              <Typography>
                <strong>Address:</strong> {currentRecord.address}
              </Typography>
              <Typography>
                <strong>Phone:</strong> {currentRecord.phone}
              </Typography>
              <Typography>
                <strong>Email:</strong> {currentRecord.email}
              </Typography>
              <Typography>
                <strong>Title:</strong> {currentRecord.inventionTitle}
              </Typography>
              <Typography>
                <strong>Description:</strong> {currentRecord.description}
              </Typography>
              <Typography>
                <strong>Abstract:</strong> {currentRecord.abstract}
              </Typography>
              <Typography>
                <strong>Claims:</strong> {currentRecord.claims}
              </Typography>
              <Typography>
                <strong>Documents:</strong>
                {currentRecord.documents.map((doc, idx) => (
                  <div key={idx}>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.name}
                    </a>
                  </div>
                ))}
              </Typography>
              
            </div>
          )}
        </DialogContent>
        <DialogActions>
        <Timeline />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IPRDatas;
