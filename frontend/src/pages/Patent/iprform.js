import React, { useEffect } from "react";
import { Box, Tab, Tabs, TextField, Button, Typography, Paper, IconButton, Grid } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { FaLightbulb } from "react-icons/fa";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

function PatentForm({userEmail}) {
    const [value, setValue] = React.useState("new");
  const navigate = useNavigate();


  const handleTabChange = (event, newValue) => {
    navigate(`${newValue}`);
    setValue(newValue);
  };

  return (
    <div className="projectpage">
        <div className="projectTop">
            <div className="projectDash">
                <span>Patent</span> <FaLightbulb/>
            </div>
        </div>
        <Box sx={{ p: 3, padding: '0px 16px 10px 16px', width: '100%' }}>
        <Paper elevation={3} sx={{ p: 3, width: '100%' }} style={{width: '100%'}}>
            <TabContext style={{width: '100%'}}>
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
            <Tab label="Apply" value="" style={{width: '100%'}}/>
            <Tab label="Active Patents" value="active" style={{width: '100%'}} />
          </Tabs>
                
            </Box>
            <Outlet/>

            <TabPanel value="correction">
                <Typography variant="h5">Existing Patent Correction</Typography>
                {/* Existing Patent Correction Form Content */}
            </TabPanel>
            </TabContext>
        </Paper>
        </Box>
        
    </div>
  );
}



export default PatentForm;
