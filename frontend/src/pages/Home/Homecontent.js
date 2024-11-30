import React from "react";
import { Box, Grid, Typography, Button, Card, CardContent } from "@mui/material";

const ContentSection = () => {
  const cards = [
    {
      title: "Work at a Startup",
      description:
        "Looking for a job at a startup? YC startups are hiring across roles and locations.",
      linkText: "See Jobs",
    },
    {
      title: "Invest in Startups",
      description:
        "YC startups are well-funded and making a difference. Discover investment opportunities.",
      linkText: "Explore Startups",
    },
    {
      title: "Startup School",
      description:
        "Learn how to start and grow your company from top founders and investors.",
      linkText: "Join for Free",
    },
  ];

  return (
    <Box py={5} px={3}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontWeight: "bold", textAlign: "center", marginBottom: "30px" }}
      >
        How We Help Startups
      </Typography>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card style={{ height: "100%", textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {card.description}
                </Typography>
                <Button variant="outlined" color="primary" style={{ marginTop: "10px" }}>
                  {card.linkText}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ContentSection;
