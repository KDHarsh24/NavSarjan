import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import TranslateComponent from "../../TranslateComponent";
import MenuIcon from "@mui/icons-material/Menu";
import { FaLanguage } from "react-icons/fa";

const Homeheader = () => {
  useEffect(() => {
    // Load Google Translate Widget script
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();

    // Define callback function for Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,ta,te,bn,ml,gu,mr", // Add or remove languages as needed
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <AppBar position="static" style={{ backgroundColor: "#FFD700", color: "#B22222" }}>
      <Toolbar>
        {/* Logo and Title */}
        <Typography
          variant="h6"
          style={{
            flexGrow: 1,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Emblem_of_India.svg"
            alt="Government Emblem"
            style={{ height: 40, marginRight: 10 }}
          />
          Government of India
        </Typography>

        {/* Accessibility Options */}
        <Box display="flex" alignItems="center">
          <IconButton color="inherit" title="Accessibility Options">
            <AccessibilityIcon />
          </IconButton>

          {/* Language Section */}
          <Button className="rounded-circle mr-3"><TranslateComponent/><FaLanguage className="langbtn"/></Button>
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <Button
            color="inherit"
            style={{ fontWeight: "bold", margin: "0 10px" }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            style={{ fontWeight: "bold", margin: "0 10px" }}
          >
            About Us
          </Button>
          <Button
            color="inherit"
            style={{ fontWeight: "bold", margin: "0 10px" }}
          >
            Services
          </Button>
          <Button
            color="inherit"
            style={{ fontWeight: "bold", margin: "0 10px" }}
          >
            Contact
          </Button>
        </Box>

        {/* Mobile Menu */}
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Homeheader;
