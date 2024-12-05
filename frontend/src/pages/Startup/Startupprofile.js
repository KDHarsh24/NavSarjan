import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, Dialog, DialogActions, DialogContent, DialogTitle, ListItemText ,Card, Grid, CardMedia, CardContent, Typography, List, ListItem, Button, TextField, IconButton, Box, FormLabel, FormControlLabel, Checkbox } from "@mui/material";
import { CloudUpload , Edit, Save as SaveIcon, Add as AddIcon, Delete  } from "@mui/icons-material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { postData } from "../../Data/backendmsg";
// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StartupProfile = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [startup, setStartup] = useState({
    name: "TechVision Inc.",
    startupid: 'C098765',
    industry: ["Technology"],
    description: "An innovative tech startup focusing on AI-driven solutions.",
    founder: "Jane Doe",
    founderuserid: 'ethan.hunt@example.com',
    coFounders: ["John Smith", "Alice Johnson"],
    model: ['B2B', 'B2B2C'],
    funding: "$10M",
    established: "2018",
    logo: "https://via.placeholder.com/100",
    images: [
      "https://via.placeholder.com/500",
      "https://via.placeholder.com/300",
      "https://via.placeholder.com/300",
    ],
    social: [{handle: 'website',link: 'https://www.google.com',}, {handle: 'Instagram', link: 'nhi hai hmara'}],
    incorporated: true,
    address: 'Mountain View, \nPalo Altos, \nCalifornia',
    pitch: 'Please Invest',
    documents: [
      { name: "Business Plan.pdf", url: "https://example.com/business-plan.pdf" },
      { name: "Pitch Deck.ppt", url: "https://example.com/pitch-deck.ppt" },
    ],
    products: [
      {
        name: "AI Assistant",
        description: "A virtual assistant powered by cutting-edge AI technology.",
      },
      {
        name: "DataAnalyzer",
        description: "An analytics tool for processing large-scale datasets.",
      },
    ],
    graph: {
      label: "Revenue, Profit & Net Profit (in Rs.(lac))",
      data: [
        { label: "2019", revenue: 5, profit: 3, netProfit: 2, document: {name: 'thizz.pdf', url: 'helloworld.com'}, verified: false },
        { label: "2020", revenue: 12, profit: 8, netProfit: 6, document: null, verified: true },
        { label: "2021", revenue: 18, profit: 14, netProfit: 10, document: null, verified: true },
        { label: "2022", revenue: 25, profit: 20, netProfit: 15, document: null,verified: false },
      ],
    },
    investors: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        amount: 1000,
        document: {name: 'disinv.pdf', url: 'pdf.com'},
        verified: true
      },
      {
        id: 2,
        name: "John Doe",
        email: "john.doe@example.com",
        amount: 10000,
        document: {name: 'disinv.pdf', url: 'pdf.com'},
        verified: true
      },
    ],
  });
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
    verified: false
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
    ...prev, investors: [...prev.investors, { id: Date.now(), ...selectedInvestor }]
  }));

  setInvestorEditDialogOpen(false);
  setSelectedInvestor(null);
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

  const barChartData = {
    labels: startup.graph.data.map(item => item.label),
    datasets: [
      {
        label: startup.graph.label,
        data: startup.graph.data.map(item => item.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: "Profit",
        data: startup.graph.data.map(item => item.profit),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: "Net Profit",
        data: startup.graph.data.map(item => item.netProfit),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

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
    if (e) e.preventDefault(); // Prevent form default behavior only if event exists
  
    try {
      console.log(startup);
      const data = await postData("data", startup); // Send data to backend
      console.log("Data sent successfully:", data);
    } catch (error) {
      console.error("Error sending data to backend", error);
      setResponse("An error occurred while sending data.");
    }
  };
  return (
    <div>
     <Button variant="contained" color={editMode ? "secondary" : "primary"} onClick={() => {if (editMode)handleSubmit();setEditMode(!editMode);}} startIcon={editMode ? <SaveIcon /> : <Edit />}>
      {editMode ? "Save" : "Edit"}
    </Button>
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
            <ListItemText primary={`${investor.name} - $${investor.amount}`} secondary={`Email: ${investor.email} | Document: ${investor.document?.name}`}
            />
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
    </div>
  );
};

export default StartupProfile;