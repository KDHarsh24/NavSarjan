import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { DialogContentText, RadioGroup, Dialog, DialogActions, DialogContent, DialogTitle, ListItemText ,Card, Grid, CardMedia, CardContent, Typography, List, ListItem, Button, TextField, IconButton, Box, FormLabel, FormControlLabel, Checkbox } from "@mui/material";
import { CloudUpload , Edit, Save as SaveIcon, Add as AddIcon, Delete  } from "@mui/icons-material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { postData } from "../../Data/backendmsg";
import axios from "axios";
import { userdata } from "../Home/Signpage";
import AdvancedResourceRequestForm from "./resourceform";
import { GrResources } from "react-icons/gr";
import Timeline from "../../components/Timeline";
import ResourceRequestForm from "../resource";
// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StartupProfile = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [startup, setStartup] = useState({});
  const location = useLocation();
  const { name, id } = location.state || {};
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://navsarjan-2.onrender.comapi/fetchone", {
          collectionName: "startup", // Name of the collection
          condition: {_id: id}, // Replace with your condition, e.g., {status: "active"}
          projection: {}, // Fields to fetch
        });

        if (response.data.success) {
          const startups = response.data.data;
          console.log(startups)

          // Format data for rows
          // Update projectRows state
          setStartup(startups);
          // Update projectDash state
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
  const industryDomains = [
    "Horizontal", "AgriTech", "Cyber Security", "Drones", "Enterprise SaaS", "Food", "Hardware", "Language Deeptech",
    "Mobility", "Robotics", "Sustainability & Environment", "Waste Management", "Adtech", "B2B Ecommerce Platform", 
    "Data Analytics", "Deeptech/AI/ML", "Education", "Entertainment & Media", "Gaming", "Healthcare", "Legal Tech", 
    "Smart City", "Clean Energy", "IT Services", "Material Sciences", "Retail", "Supply Chain & Logistics", 
    "Web3", "Aerospace", "Big Data", "Electric Vehicles", "Finance", "Gaming & Mobile Applications", "Pet", 
    "Smart Manufacturing", "Telecom", "Textile", "Travel and Leisure", "Technology"
];
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  if (type === "checkbox") {
    setStartup((prevState) => {
      const updatedValue = checked
        ? [...prevState[name], value] // Add to array if checked
        : prevState[name].filter((item) => item !== value); // Remove from array if unchecked
      return { ...prevState, [name]: updatedValue };
    });
  } else {
    setStartup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
};

  const handleGraphDataChange = (index, key, value) => {
    const updatedGraph = [...startup.graph.data];
    updatedGraph[index][key] = value;
    setStartup({ ...startup, graph: { ...startup.graph, data: updatedGraph } });
  };
  const handleRemoveGraphData = (index) => {
    const updatedGraph = startup.graph.data.filter((_, i) => i !== index);
    setStartup({ ...startup, graph: { ...startup.graph, data: updatedGraph } });
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStartup({ ...startup, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        name: file.name,
        url: URL.createObjectURL(file), // In a real scenario, you would upload the file to the server
      };
      setStartup({ ...startup, documents: [...startup.documents, newDoc] });
    }
  };

  const handleRemoveDocument = (index) => {
    const updatedDocuments = startup.documents.filter((_, i) => i !== index);
    setStartup({ ...startup, documents: updatedDocuments });
  };

  const handleProductChange = (index, key, value) => {
    const updatedProducts = [...startup.products];
    updatedProducts[index][key] = value;
    setStartup({ ...startup, products: updatedProducts });
  };

  const handleAddProduct = () => {
    const newProduct = { name: "", description: "" };
    setStartup({ ...startup, products: [...startup.products, newProduct] });
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = startup.products.filter((_, i) => i !== index);
    setStartup({ ...startup, products: updatedProducts });
  };

  const handleAddYearData = () => {
    const newYearData = { label: "", revenue: "", profit: "", netProfit: "" };
    setStartup({ ...startup, graph: { ...startup.graph, data: [...startup.graph.data, newYearData] } });
  };

  const handleImageChange = (index, e) => {
    const updatedImages = [...startup.images];
    updatedImages[index] = URL.createObjectURL(e.target.files[0]);
    setStartup({ ...startup, images: updatedImages });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = startup.images.filter((_, i) => i !== index);
    setStartup({ ...startup, images: updatedImages });
  };
  
  const handleYearDocumentUpload = (yearIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const newDocument = { name: file.name, url: URL.createObjectURL(file) };
      const updatedGraph = [...startup.graph.data];
      updatedGraph[yearIndex].document = newDocument;
      setStartup({ ...startup, graph: { ...startup.graph, data: updatedGraph } });
    }
  };
  const [investorEditDialogOpen, setInvestorEditDialogOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState({
    name: "",
    email: "",
    amount: 0,
    verified: false,
  });

const handleEditInvestor = (investor) => {
  setSelectedInvestor({ ...investor });
  setInvestorEditDialogOpen(true);
};

const handleSaveInvestor = () => {
  if (!selectedInvestor.name || !selectedInvestor.email || !selectedInvestor.amount) {
    alert("Please fill all fields!");
    return;
  }
  

  setStartup((prev) => ({
    ...prev, investors: [...prev.investors, { verified: false ,id: Date.now(), ...selectedInvestor }]
  }));

  setInvestorEditDialogOpen(false);
  setSelectedInvestor({
    name: "",
    email: "",
    amount: 0,
  });
};

const handleRemoveInvestor = (investorId) => {
  const updatedInvestors = startup.investors.filter((investor) => investor.id !== investorId);
  setStartup((prev) => ({
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

const barChartData = startup.graph?.data
? {
    labels: startup.graph.data.map((item) => item.label || ""), // Default to empty if label is missing
    datasets: [
      {
        label: startup.graph.label || "Revenue",
        data: startup.graph.data.map((item) => item.revenue || 0),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Profit",
        data: startup.graph.data.map((item) => item.profit || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Net Profit",
        data: startup.graph.data.map((item) => item.netProfit || 0),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  }
: null;


  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw + ' lac';
          },
        },
      },
    },
  };
  const handleSubmit = async (e) => {
    //e.preventDefault();
    setLoading(true);

    console.log(startup);
    try {
      const response = await axios.post("https://navsarjan-2.onrender.comapi/replace", {
        collectionName: "startup",
        condition: {_id: startup._id}, // Parse JSON from the input
        data: startup, // Parse JSON from the input
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
  const handleDialogClose = (e) => {
    if (e.currentTarget.title=== 'ok')
      navigate('/dashboard')
    setDialogOpen(false);
  };
  if (loading){
    return(<div>Loading</div>);
  }
  return (
    <div>
      {(userdata.email === startup.founderuserid)?<Button variant="contained" color={editMode ? "secondary" : "primary"} onClick={() => {if (editMode)handleSubmit();setEditMode(!editMode);}} startIcon={editMode ? <SaveIcon /> : <Edit />}>
      {editMode ? "Save" : "Edit"}
    </Button> :<></>}

    <Link to={'/dashboard/startups/startupprofile/resourcerequest'}>{(userdata.email === startup.founderuserid)?<Button variant="contained" color={editMode ? "secondary" : "primary"}  startIcon={ <GrResources /> }>
     
    </Button> :<></>}</Link>

     
      {/* Data section */}
      <Card style={{ margin: "20px 0px 30px 0px", borderRadius: "8px", padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CardMedia component="img" image={startup.logo} alt={`${startup.name} Logo`} style={{ width: "100px", height: "100px", objectFit: "contain", margin: "20px auto", borderRadius: "8px" }}/>
            {editMode && (
              <Button component="label" startIcon={<CloudUpload />} sx={{ marginTop: "10px" }}>
                Upload Logo
                <input type="file" hidden accept="image/*" onChange={handleLogoChange}/>
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent>
              <TextField fullWidth label="Company Name" variant="outlined" value={startup.name} name="name" onChange={handleInputChange} disabled={!editMode} sx={{ marginBottom: "10px" }}/>
              {editMode ? 
              <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Industry Domains</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {industryDomains.map((model, index) => (
                    <FormControlLabel key={index} control={<Checkbox color="primary" value={model} checked={startup.industry.includes(model)} onChange={handleInputChange} name="industry"/>} label={model}/>
                  ))}
                </div>
              </>
              :<TextField fullWidth label="Industry" variant="outlined" value={startup.industry} name="industry" onChange={handleInputChange} disabled={!editMode} sx={{ marginBottom: "10px" }}/>}
              <TextField fullWidth multiline label="Description" variant="outlined" value={startup.description} name="description" onChange={handleInputChange} disabled={!editMode} sx={{ marginBottom: "10px" }}/>
              <Button style={{marginBottom: '20px'}} variant="contained" color="primary" onClick={() => navigate(`/dashboard/profile/${startup.founderuserid}`)}>Founder: {startup.founder}</Button>
              <TextField fullWidth label="Co-Founders" variant="outlined" value={startup.coFounders.join(", ")} name="coFounders" onChange={(e) => setStartup({ ...startup, coFounders: e.target.value.split(", ") })} disabled={!editMode} sx={{ marginBottom: "10px" }}/>
              <div className="mt-6" style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                <FormLabel className="text-gray-700 block mb-2">
                  Is your startup incorporated?
                  </FormLabel>
                  <FormControlLabel control={<Checkbox color="primary" defaultChecked={startup.incorporated}/>}  disabled={!editMode}/>
              </div>
              <TextField fullWidth multiline label="Address" variant="outlined" value={startup.address} name="Address" onChange={handleInputChange} disabled={!editMode} sx={{ marginBottom: "20px" }}/>
              <TextField fullWidth multiline label="Elevator Pitch" variant="outlined" value={startup.pitch} name="pitch" onChange={handleInputChange} disabled={!editMode} sx={{ marginBottom: "20px" }}/>
              {editMode ?
               <div className="mt-8">
                <FormLabel className="text-gray-600 font-medium mb-4 block">
                    Business Models
                </FormLabel>
                <RadioGroup row>
                {["B2B", "B2B2C", "B2C", "B2G", "D2C"].map((model, index) => (
                    <FormControlLabel key={index} control={ <Checkbox color="primary" value={model} checked={startup.model.includes(model)}  onChange={handleInputChange} name="model"/> } label={model}/>
                ))}
                </RadioGroup>
              </div>
              :<TextField fullWidth label="Model" variant="outlined" value={startup.model.join(", ")} name="model" onChange={(e) => setStartup({ ...startup, model: e.target.value.split(", ") })} disabled={!editMode} sx={{ marginBottom: "20px" }}/>}
              <h3 className="text-2xl font-semibold text-gray-700 mt-8 mb-6">
                Social Links
              </h3>
              {startup.social.map((socials, index) => (
                <TextField key={index} label={socials.handle} value={socials.link} type="url" fullWidth disabled={!editMode} className="mb-4"/>
              ))}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      {/* Graph Section */}
      <Card>
        <CardContent>
          <Typography variant="h5">{startup.graph.label}</Typography>
          <Bar data={barChartData} options={barChartOptions} />
          {editMode && (
            <>
              {startup.graph.data.map((year, index) => (
                <Box key={index} display="flex" alignItems="center" gap={2} mt={2}>
                  <TextField label="Year" value={year.label} onChange={(e) => handleGraphDataChange(index, "label", e.target.value)}/>
                  <TextField label="Revenue" value={year.revenue} onChange={(e) => handleGraphDataChange(index, "revenue", e.target.value)}/>
                  <TextField label="Profit" value={year.profit} onChange={(e) => handleGraphDataChange(index, "profit", e.target.value)}/>
                  <TextField label="Net Profit" value={year.netProfit} onChange={(e) => handleGraphDataChange(index, "netProfit", e.target.value)}/>
                  <div>
                    {year.document ? (
                      <div>
                        <a href={year.document.url} target="_blank" rel="noopener noreferrer">
                          {year.document.name}
                        </a>
                        {editMode && (
                          <IconButton color="error" onClick={() => handleGraphDataChange(index, "document", null)}>
                            <Delete />
                          </IconButton>
                        )}
                      </div>
                    ) : (
                      editMode && (
                        <Button variant="contained" component="label" startIcon={<CloudUpload />} color="primary">
                          Add Document
                          <input type="file" hidden onChange={(e) => handleYearDocumentUpload(index, e)}/>
                        </Button>
                      )
                    )}
                  </div>
                  <IconButton onClick={() => handleRemoveGraphData(index)} color="error">
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddYearData} sx={{ mt: 2 }}>
                Add Year
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Products Section */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5">Products</Typography>
          <List>
            {startup.products.map((product, index) => (
              <ListItem key={index}>
                {editMode ? (
                  <div className="startupproduct">
                    <TextField label="Product Name" value={product.name} onChange={(e) => handleProductChange(index, "name", e.target.value)}/>
                    <TextField label="Description" value={product.description} onChange={(e) => handleProductChange(index, "description", e.target.value)}/>
                    <IconButton onClick={() => handleRemoveProduct(index)} color="error">
                      <Delete />
                    </IconButton>
                  </div>
                ) : (
                  <div className="startupproduct">
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2">{product.description}</Typography>
                  </div>
                )}
              </ListItem>
            ))}
          </List>
          {editMode && (
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddProduct}>
              Add Product
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Images Section */}
      <Card style={{ marginTop: "20px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Product Images
          </Typography>
          <Grid container spacing={2}>
            {startup.images.map((image, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <CardMedia component="img" image={image} alt={`Product ${index + 1}`} />
                {editMode && (
                  <IconButton onClick={() => handleRemoveImage(index)} color="error">
                    <Delete />
                  </IconButton>
                )}
                {editMode && (
                  <Button component="label" startIcon={<CloudUpload />}>
                    Upload Image
                    <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(index, e)}/>
                  </Button>
                )}
              </Grid>
            ))}
          </Grid>
          {editMode && (
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setStartup({ ...startup, images: [...startup.images, "https://via.placeholder.com/300"] })}>
              Add Image
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5">Documents</Typography>
          <List>
            {startup.documents.map((doc, index) => (
              <ListItem key={index}>
                <Typography variant="body1">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    {doc.name}
                  </a>
                </Typography>
                {editMode && (
                  <IconButton onClick={() => handleRemoveDocument(index)} color="error">
                    <Delete />
                  </IconButton>
                )}
              </ListItem>
            ))}
          </List>
          {editMode && (
            <Button variant="contained" component="label" color="primary" startIcon={<CloudUpload />}>
              Upload Document
              <input hidden accept=".pdf, .ppt, .docx" type="file" onChange={handleDocumentUpload}/>
            </Button>
          )}
        </CardContent>
      </Card>
      <Card sx={{ mt: 4 }} style={{marginTop: '20px'}}>
        <CardContent>
      <Typography variant="h4" gutterBottom>
        Investors
      </Typography>
      <List>
        {startup.investors.map((investor) => (
          <ListItem key={investor.id} style={{ marginBottom: "10px" }}>
            <ListItemText primary={`${investor.name} - Rs.${investor.amount}`} secondary={`Email: ${investor.email}`}
            />
            <Link href={startup.document?.url} target="_blank" rel="noopener noreferrer">{startup.document?.name}</Link>
            <IconButton color="primary" disabled={!editMode} onClick={() => handleEditInvestor(investor)}>
              <Edit />
            </IconButton>
            <IconButton color="error" disabled={!editMode} onClick={() => handleRemoveInvestor(investor.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button disabled={!editMode} variant="contained" color="primary" onClick={() => handleEditInvestor({ id: Date.now(), name: "", email: "", amount: "", document: { name: "", url: "" },})}>
        Add Investor
      </Button>
      
        {/* Edit/Add Investor Dialog */}
      <Dialog open={investorEditDialogOpen} onClose={() => setInvestorEditDialogOpen(false)}>
        <DialogTitle>{selectedInvestor?.id ? "Edit Investor" : "Add Investor"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" value={selectedInvestor?.name || ""} onChange={(e) => setSelectedInvestor((prev) => ({ ...prev, name: e.target.value }))} style={{ marginBottom: "10px" }}/>
          <TextField fullWidth label="Email" value={selectedInvestor?.email || ""} onChange={(e) => setSelectedInvestor((prev) => ({ ...prev, email: e.target.value }))} style={{ marginBottom: "10px" }}/>
          <TextField fullWidth label="Amount" type="number" value={selectedInvestor?.amount || ""} onChange={(e) => setSelectedInvestor((prev) => ({ ...prev, amount: e.target.value }))} style={{ marginBottom: "10px" }}/>
          <Button variant="contained" component="label" color="primary" startIcon={<CloudUpload />}>
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
      <Typography>
        Evaluation Status
      </Typography>
      <Timeline state={startup.level}/>
      <Card sx={{ mt: 4 }} style={{ margin: "20px 0px 30px 0px", borderRadius: "8px", padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Investment Report
        </Typography>
        <Link to={'/tracker'} state={{id: startup._id}}>
        <Button variant="contained" color="primary">
          Generate Report
        </Button>
      </Link>
      </Card>
      <Card>
        <AdvancedResourceRequestForm/>
      </Card>
    </div>
  );
};

export default StartupProfile;