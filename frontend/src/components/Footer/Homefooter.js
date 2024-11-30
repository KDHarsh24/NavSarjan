import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box textAlign="center" py={3} mt={5} style={{ background: "#f5f5f5" }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} YCombinator. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
