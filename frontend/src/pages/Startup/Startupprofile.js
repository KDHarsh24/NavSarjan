import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { Card, Grid, CardMedia, CardContent, Typography, List, ListItem, Button, TextField, IconButton, Box, FormLabel, FormControlLabel, Checkbox } from "@mui/material";
import { CloudUpload as CloudUploadIcon, Edit as EditIcon, Save as SaveIcon, Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { postData } from "../../Data/backendmsg";
import axios from "axios";


//take user from login id


// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StartupProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [response, setResponse] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [startup, setStartup] = useState({
    name: "",
    logo: "",
    industry: "",
    description: "",
    coFounders: [],
    incorporated: false,
    address: "",
    pitch: "",
    model: [],
    social: [],
    graph: {
      label: "",
      data: [],
    },
    products: [],
    images: [],
    documents: [],
    founder: "",
    founderuserid: "",
  });
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [],
  });
  const { id } = location.state || {}; 
  console.log("id: "+id);

  /*const [startup, setStartup] = useState({
    name: "TechVision Inc.",
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
    website: "https://techvision.com",
    graph: {
      label: "Revenue, Profit & Net Profit (in Rs.(lac))",
      data: [
        { label: "2019", revenue: 5, profit: 3, netProfit: 2, document: null },
        { label: "2020", revenue: 12, profit: 8, netProfit: 6, document: null },
        { label: "2021", revenue: 18, profit: 14, netProfit: 10, document: null },
        { label: "2022", revenue: 25, profit: 20, netProfit: 15, document: null },
      ],
    },
  });

*/
//do not know user sent user as parameter to get detail
useEffect(() => {
    axios.get('http://localhost:8081/home/startUp/profileDetail',{params: { id } })
         .then((res) => {
           const data = res.data.data;
           console.log("data: "+data);
           setStartup(data[0]);
         })
         .catch((err) => console.log("error: " + err));
}, []);

useEffect(() => {
  if (startup?.graph?.data && startup?.graph?.label) {
    setBarChartData({
      labels: startup.graph.data.map((item) => item.label),
      datasets: [
        {
          label: startup.graph.label,
          data: startup.graph.data.map((item) => item.revenue),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Profit",
          data: startup.graph.data.map((item) => item.profit),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: "Net Profit",
          data: startup.graph.data.map((item) => item.netProfit),
          backgroundColor: "rgba(153, 102, 255, 0.5)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    });
  }
}, [startup]);





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStartup({ ...startup, [name]: value });
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
  
  /*const barChartData = {
    labels: startup.graph.data.map(item => item.label),
    datasets: [
      {
        label: startup.graph.label,
        data: startup.graph.data.map(item => item.revenue),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Profit",
        data: startup.graph.data.map(item => item.profit) ,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Net Profit",
        data: startup.graph.data.map(item => item.netProfit),
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
  */

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

  if (Object.keys(startup).length <= 0) {
    return (
      <>
        <h3>loading data . . . .</h3>
      </>
    );
  }

  return (
    
    <div>
     <Button variant="contained"
      color={editMode ? "secondary" : "primary"}
      onClick={() => {
        if (editMode) {
          handleSubmit(); // Submit data when in edit mode
        }
        setEditMode(!editMode); // Toggle edit mode
      }}
      startIcon={editMode ? <SaveIcon /> : <EditIcon />}
    >
      {editMode ? "Save" : "Edit"}
    </Button>

      {/* Data section */}
      <Card style={{ margin: "20px 0px 30px 0px", borderRadius: "8px", padding: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <CardMedia component="img" image={startup.logo} alt={`${startup.name} Logo`} style={{ width: "100px", height: "100px", objectFit: "contain", margin: "20px auto", borderRadius: "8px" }}/>
            {editMode && (
              <Button component="label" startIcon={<CloudUploadIcon />} sx={{ marginTop: "10px" }}>
                Upload Logo
                <input type="file" hidden accept="image/*" onChange={handleLogoChange}/>
              </Button>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent>
              <TextField fullWidth label="Company Name" variant="outlined" value={startup.name} name="name" onChange={handleInputChange} disabled={!editMode} sx={{ marginBottom: "10px" }}/>
              <TextField fullWidth label="Industry" variant="outlined" value={startup.industry} name="industry" onChange={handleInputChange} disabled={!editMode} sx={{ marginBottom: "10px" }}/>
              <TextField fullWidth multiline label="Description" variant="outlined" value={startup.description} name="description" onChange={handleInputChange} disabled={!editMode} sx={{ marginBottom: "10px" }}/>
              <Button style={{marginBottom: '20px'}} variant="contained" color="primary" onClick={() => navigate(`/dashboard/profile/${startup.founderuserid}`)}>Founder: {startup.founder}</Button>
              <TextField fullWidth label="Co-Founders" variant="outlined" value={startup.coFounders?.join(", ") || ""}  name="coFounders" onChange={(e) => setStartup({ ...startup, coFounders: e.target.value.split(", ") })} disabled={!editMode} sx={{ marginBottom: "10px" }}/>
              <div className="mt-6">
                <FormLabel className="text-gray-700 block mb-2">
                  Is your startup incorporated?
                    </FormLabel>
                  <FormControlLabel control={<Checkbox color="primary" defaultChecked={startup.incorporated}/>}  disabled={!editMode}/>
              </div>
              <TextField fullWidth multiline label="Address" variant="outlined" value={startup.address} name="Address" onChange={handleInputChange} disabled={!editMode} sx={{ marginBottom: "20px" }}/>
              <TextField fullWidth multiline label="Elevator Pitch" variant="outlined" value={startup.pitch} name="pitch" onChange={handleInputChange} disabled={!editMode} sx={{ marginBottom: "20px" }}/>
              <TextField fullWidth label="Model" variant="outlined" value={startup.coFounders?.join(", ") || ""}  name="model" onChange={(e) => setStartup({ ...startup, model: e.target.value.split(", ") })} disabled={!editMode} sx={{ marginBottom: "20px" }}/>
              <h3 className="text-2xl font-semibold text-gray-700 mt-8 mb-6">
                        Social Links
                    </h3>
                   
                    {startup.length > 0 ? (
                        startup.social.length > 0 ? (
                            startup.social.map((socials, index) => (
                              <TextField
                                  key={index}
                                  label={socials.handle}
                                  value={socials.link}
                                  type="url"
                                  fullWidth
                                  disabled={!editMode}
                                  className="mb-4"
                              />
                            ))
                          ) : null
                        
                      ) : null}

            </CardContent>
          </Grid>
        </Grid>
      </Card>
      {/* Graph Section */}
      <Card>
        <CardContent>
          {(startup.length>0)?(
            <Typography variant="h5">{startup.graph.label}</Typography>
          ):null}
          
          
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
                          <IconButton
                            color="error"
                            onClick={() => handleGraphDataChange(index, "document", null)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </div>
                    ) : (
                      editMode && (
                        <Button
                          variant="contained"
                          component="label"
                          startIcon={<CloudUploadIcon />}
                          color="primary"
                        >
                          Add Document
                          <input
                            type="file"
                            hidden
                            onChange={(e) => handleYearDocumentUpload(index, e)}
                          />
                        </Button>
                      )
                    )}
                  </div>
                  <IconButton onClick={() => handleRemoveGraphData(index)} color="error">
                    <DeleteIcon />
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
            {startup.length > 0 ? (
               
                  startup.products && startup.products.length > 0 ? (
                    startup.products.map((product, index) => (
                      <ListItem key={index}>
                          {editMode ? (
                            <div className="startupproduct">
                              <TextField label="Product Name" value={product.name} onChange={(e) => handleProductChange(index, "name", e.target.value)}/>
                              <TextField label="Description" value={product.description} onChange={(e) => handleProductChange(index, "description", e.target.value)}/>
                              <IconButton onClick={() => handleRemoveProduct(index)} color="error">
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          ) : (
                            <div className="startupproduct">
                              <Typography variant="h6">{product.name}</Typography>
                              <Typography variant="body2">{product.description}</Typography>
                            </div>
                          )}
                      </ListItem>
                    ))
                  ) : null
                
              ) : null}
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
            { startup.length >0 ?(
              startup.images && startup.images.length >0 ? (startup.images.map((image, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <CardMedia component="img" image={image} alt={`Product ${index + 1}`} />
                  {editMode && (
                    <IconButton onClick={() => handleRemoveImage(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {editMode && (
                    <Button component="label" startIcon={<CloudUploadIcon />}>
                      Upload Image
                      <input type="file" hidden accept="image/*" onChange={(e) => handleImageChange(index, e)}/>
                    </Button>
                  )}
                </Grid>
              ))):null
            ):null
            }






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
            {startup.length >0 ? (
              startup.documents && startup.documents.length>0?(startup.documents.map((doc, index) => (
                <ListItem key={index}>
                  <Typography variant="body1">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.name}
                    </a>
                  </Typography>
                  {editMode && (
                    <IconButton onClick={() => handleRemoveDocument(index)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  )}
                </ListItem>
              ))):null
            ):null}

          </List>
          {editMode && (
            <Button variant="contained" component="label" color="primary" startIcon={<CloudUploadIcon />}>
              Upload Document
              <input hidden accept=".pdf, .ppt, .docx" type="file" onChange={handleDocumentUpload}/>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StartupProfile;