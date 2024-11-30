import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";

const HeroSection = () => {
  return (
    <Box
      py={10}
      textAlign="center"
      style={{
        backgroundColor: "#f7f7f7",
        padding: "60px 20px",
      }}
    >
      <Typography variant="h3" gutterBottom style={{ fontWeight: "bold" }}>
        Build Something People Want
      </Typography>
      <Typography
        variant="h6"
        color="textSecondary"
        gutterBottom
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        Y Combinator is a startup accelerator. Since 2005, we've funded over 3,000 companies. Learn how we can help your startup succeed.
      </Typography>
      <Grid container justifyContent="center" spacing={2} style={{ marginTop: "20px" }}>
        <Grid item>
          <Button variant="contained" color="primary" size="large">
            Apply to YC
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" size="large">
            Learn More
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HeroSection;
