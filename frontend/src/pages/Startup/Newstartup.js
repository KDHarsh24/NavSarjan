import { useEffect, useState } from "react";
import { Box, Tab, Tabs, TextField, Button, Paper } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { Checkbox, RadioGroup, FormControlLabel, FormLabel, TextareaAutosize } from "@mui/material";
import axios from 'axios';
const Newstartup = ({userEmail}) => {
    const industryDomains = [
        "Horizontal", "AgriTech", "Cyber Security", "Drones", "Enterprise SaaS", "Food", "Hardware", "Language Deeptech",
        "Mobility", "Robotics", "Sustainability & Environment", "Waste Management", "Adtech", "B2B Ecommerce Platform", 
        "Data Analytics", "Deeptech/AI/ML", "Education", "Entertainment & Media", "Gaming", "Healthcare", "Legal Tech", 
        "Smart City", "Clean Energy", "IT Services", "Material Sciences", "Retail", "Supply Chain & Logistics", 
        "Web3", "Aerospace", "Big Data", "Electric Vehicles", "Finance", "Gaming & Mobile Applications", "Pet", 
        "Smart Manufacturing", "Telecom", "Textile", "Travel and Leisure"
    ];

    // const technologyDomains = [
    //     "3D Printing", "5G", "AI/ML", "Analytics", "API", "AR-VR-MR", "Automation", "Battery", "Big Data", "Biometrics", 
    //     "Blockchain", "Cloud Computing", "Computer Vision", "Drone", "Electric Powertrains", "Electric Vehicles", 
    //     "Energy Storage", "Generative AI", "Genomics", "Geospatial & Space Tech", "Hardware", "IAAS", "IoT", 
    //     "Logistics", "Micro-Mobility", "Mobile App", "Nanotechnology", "NLP/ Deep Learning", "Other", "PAAS", 
    //     "Quantum Computing", "Robotics", "SAAS", "Software", "Web Platform"
    // ];
    const [value, setValue] = useState("basic");
  
    const handleTabChange = (event, newValue) => {
      setValue(newValue);
    };
    const [startup, setStartup] = useState({
        name: "",
        industry: [],
        description: "",
        founder: "",
        founderuserid: "",
        coFounders: [],
        model: [],
        funding: "",
        established: "",
        logo: "",
        images: [],
        social: [],
        incorporated: false,
        address: "",
        pitch: "",
        documents: [],
        products: [],
        website: "",
        graph: {
          label: "",
          data: [],
        },
      });
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
      
     



      const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setStartup({ ...startup, logo: reader.result });
          };
        }
      };
      /*const handleSocialChange = (e, socialPlatform) => {
        const { value } = e.target;
        
        setStartup((prevState) => {
          const updatedSocials = prevState.social.map((social) => 
            social.handle === socialPlatform ? { ...social, link: value } : social
          );
      
          // If the social media platform does not exist yet in the array, add it
          if (!updatedSocials.some(social => social.handle === socialPlatform)) {
            updatedSocials.push({ handle: socialPlatform, link: value });
          }
      
          return { ...prevState, social: updatedSocials };
        });
      };*/

      const handleSocialChange = (e, socialPlatform) => {
        const { value } = e.target;
      
        setStartup((prevState) => {
          if (socialPlatform === "Website") {
            // Update the website field if the platform is Website
            return { ...prevState, website: value };
          } else {
            // Update the social array for other platforms
            const updatedSocials = prevState.social.map((social) =>
              social.handle === socialPlatform ? { ...social, link: value } : social
            );
      
            // If the platform does not exist, add it
            if (!updatedSocials.some((social) => social.handle === socialPlatform)) {
              updatedSocials.push({ handle: socialPlatform, link: value });
            }
      
            return { ...prevState, social: updatedSocials };
          }
        });
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


    const handleSubmit=(e)=>
    {
        e.preventDefault();
        console.log("startup: "+JSON.stringify(startup,null,2));
        axios.post('http://localhost:8081/home/startUp/newStartUp',startup)
             .then(res=>{
              console.log(res);
             })
             .catch(err=>console.log(err));
    }



    return(
        <Box sx={{ p: 3, padding: '0px 16px 10px 16px', width: '100%' }}>
        <Paper elevation={3} sx={{ p: 3, width: '100%' }} style={{width: '100%'}}>
            <TabContext value={value} style={{width: '100%'}}>
            <Box sx={{ display: "flex", width: '100%', justifyContent: 'center' }}>
            <Tabs value={value} onChange={handleTabChange} variant="fullWidth" TabIndicatorProps={{ style: {backgroundColor: "#00bfff", height: "2px"},}} style={{width: '100%'}} 
            sx={{"& .MuiTab-root": {
                fontSize: "16px", // Adjust font size
                fontWeight: "normal",
                color: "#8a8a8a", // Default tab color (grey)
                textTransform: "uppercase",
                "&.Mui-selected": {
                  fontWeight: "bold", // Bold for active tab
                  color: "#00bfff", // Active tab color (light blue)
                },
              },
            }}>
            <Tab label="Basic Details" value="basic" style={{width: '100%'}}/>
            <Tab label="Business Fields" value="fields" style={{width: '100%'}} />
            <Tab label="Documents" value="documents" style={{width: '100%'}} />
          </Tabs>
                
            </Box>

            <TabPanel value="basic">
                    <form>  
                    {/* Company Information */}
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                        Company Information
                    </h2>

                    <div className="mb-6">
                        {/* About Company */}
                        <div className="mb-6">
                        <h4 className="text-lg font-medium text-gray-600 mb-2">
                            About Company
                        </h4>

                        <div className="mb-4">
                            <FormLabel className="text-gray-700 mb-2 block">
                            Company Logo
                            </FormLabel>
                            <input type="file" name='logo' accept="image/*" className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500" onChange={handleLogoChange}/>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <TextField label="Company Name" placeholder="Startup Name" name="name" onChange={handleInputChange} fullWidth value={startup.name}/>
                        </div>
                        <div className="mt-6">
                            <FormLabel className="text-gray-700 block mb-2">
                            Is your startup incorporated?
                            </FormLabel>
                            <FormControlLabel control={<Checkbox color="primary" value={startup.incorporated} name="incorporated" onChange={handleInputChange}/>} label="Yes"/>
                        </div>
                        </div>

                        {/* Address Fields */}

                        <div className="mt-6">
                        <FormLabel className="text-gray-700 mb-2 block">
                            Address
                        </FormLabel>
                        <TextareaAutosize minRows={3} placeholder="Address" name='address' value={startup.address} onChange={handleInputChange} className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"/>
                        </div>
                        <div className="mt-6">
                        <FormLabel className="text-gray-700 mb-2 block">
                            Elevator Pitch
                        </FormLabel>
                        <TextareaAutosize minRows={3} name='pitch' value={startup.pitch} onChange={handleInputChange} placeholder="We help (x) do (y) by doing (z)" className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"/>
                        </div>
                        <div className="mt-6">
                        <FormLabel className="text-gray-700 mb-2 block">
                            Company Brief
                        </FormLabel>
                        <TextareaAutosize minRows={3} name='description' value={startup.description} onChange={handleInputChange} placeholder="Brief about the company" className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"/>
                        </div>
                    </div>

                    
                    {/* Business Models */}
                    <div className="mt-8">
                        <FormLabel className="text-gray-600 font-medium mb-4 block">
                        Business Models
                        </FormLabel>
                        <RadioGroup row>
                        {["B2B", "B2B2C", "B2C", "B2G", "D2C"].map((model, index) => (
                            <FormControlLabel key={index}
                            control={ <Checkbox color="primary" value={model} checked={startup.model.includes(model)}  onChange={handleInputChange} name="model"/> } label={model}/>
                        ))}
                        </RadioGroup>
                    </div>

                    {/* Social Links */}
                    <h3 className="text-2xl font-semibold text-gray-700 mt-8 mb-6">
                        Social Links
                    </h3>
                    
                    {["Website", "LinkedIn", "Twitter", "YouTube", "Facebook", "Instagram"].map(
                      (social, index) => (
                        <TextField
                          key={index}
                          label={social}
                          placeholder={`Enter ${social} URL`}
                          type="url"
                          fullWidth
                          className="mb-4"
                          value={
                            social === "Website"
                              ? startup.website // Bind to the website field for "Website"
                              : startup.social.find((item) => item.handle === social)?.link || ""
                          }
                          onChange={(e) => handleSocialChange(e, social)}
                        />
                      )
                    )}


                    {/* Buttons */}
                    <div className="flex justify-between mt-8">
                        <Button variant="contained" color="primary" className="px-6 py-3" onClick={()=>{setValue('fields')}}>
                            Next
                        </Button>
                    </div>
                    </form>
                </TabPanel>
                <TabPanel value="fields">
                    <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Industry Domains</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {industryDomains.map((model, index) => (
                            <FormControlLabel key={index} control={<Checkbox color="primary" value={model} checked={startup.industry.includes(model)} onChange={handleInputChange} name="industry"/>} label={model}/>
                        ))}
                    </div>
                </div>

              
                {/* Buttons */}
                    <div className="flex justify-between mt-8">
                    <Button variant="contained" color="primary" className="px-6 py-3" onClick={()=>{setValue('basic')}}>
                            Previous
                        </Button>
                        <Button variant="contained" color="primary" className="px-6 py-3" onClick={()=>{setValue('documents')}}>
                            Next
                        </Button>
                    </div>
                </TabPanel>
                <TabPanel value="documents">
                <h3 className="text-3xl font-semibold text-blue-600 mb-8 text-center">
                    Upload Required Documents
                </h3>
                <div className="space-y-6 mb-8">
                    {/* GST Certificate */}
                    <div>
                    <label className="block text-lg font-medium text-blue-700 mb-2">
                        GST Certificate
                    </label>
                    <input type="file" accept=".pdf,.png,.jpg,.jpeg" className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleDocumentUpload}/>
                    </div>

                    {/* Aadhar Card */}
                    <div>
                    <label className="block text-lg font-medium text-blue-700 mb-2">
                        Aadhar Card
                    </label>
                    <input type="file" accept=".pdf,.png,.jpg,.jpeg" className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleDocumentUpload}/>
                    </div>

                    {/* Company PAN Card */}
                    <div>
                    <label className="block text-lg font-medium text-blue-700 mb-2">
                        Company PAN Card
                    </label>
                    <input type="file" accept=".pdf,.png,.jpg,.jpeg" className="block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleDocumentUpload}/>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center">
                    <Button variant="contained" color="primary" className="px-6 py-3" onClick={()=>{setValue('fields')}}>
                            Previous
                        </Button>
                        <Button variant="contained" color="primary" className="px-6 py-3" onClick={handleSubmit}>
                            Submit
                        </Button>
                </div>
                </TabPanel>
            </TabContext>
        </Paper>
        </Box>
    );
}
export default Newstartup;






//original code
/*

  {["Website", "LinkedIn", "Twitter", "YouTube", "Facebook", "Instagram"].map(
                        (social, index) => (
                        <TextField
                            key={index}
                            label={social}
                            placeholder={`Enter ${social} URL`}
                            type="url"
                            fullWidth
                            className="mb-4"
                            value={startup.social.find((item) => item.handle === social)?.link || ''}
                            onChange={(e) => handleSocialChange(e, social)}
                        />
                        )
                    )}


*/


