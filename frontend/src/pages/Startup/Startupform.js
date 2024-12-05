import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { Add, Remove } from "@mui/icons-material";

import { userdata } from "../Home/Signpage";

const StartupForm = () => {
  const { register, handleSubmit, control } = useForm();
  const [files, setFiles] = useState({});
  const { fields: coFounders, append: addCoFounder, remove: removeCoFounder } = useFieldArray({
    control,
    name: "coFounders",
  });
  const { fields: employees, append: addEmployee, remove: removeEmployee } = useFieldArray({
    control,
    name: "employees",
  });
  const { fields: products, append: addProduct, remove: removeProduct } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    console.log("Uploaded Files:", files);
    alert("Startup Data Submitted!");
  };

  const handleFileUpload = (fieldName, event) => {
    setFiles({ ...files, [fieldName]: event.target.files[0] });
  };

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Startup Registration Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Basic Information
            </Typography>
            <TextField
              fullWidth
              label="Startup Name"
              {...register("startupName", { required: true })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Industry"
              {...register("industry", { required: true })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              {...register("description")}
              multiline
              rows={3}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Location"
              {...register("location", { required: true })}
              margin="normal"
            />
            <Button
              variant="contained"
              component="label"
              sx={{ marginTop: "10px" }}
            >
              Upload Logo
              <input
                type="file"
                hidden
                onChange={(e) => handleFileUpload("logo", e)}
              />
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Revenue Details
            </Typography>
            <TextField
              fullWidth
              label="Revenue (in millions)"
              {...register("revenue", { required: true })}
              margin="normal"
              type="number"
            />
            <Button
              variant="contained"
              component="label"
              sx={{ marginTop: "10px" }}
            >
              Upload Revenue Proof
              <input
                type="file"
                hidden
                onChange={(e) => handleFileUpload("revenueProof", e)}
              />
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Prior Investors
            </Typography>
            <TextField
              fullWidth
              label="Investor Names"
              {...register("investors")}
              margin="normal"
            />
            <Button
              variant="contained"
              component="label"
              sx={{ marginTop: "10px" }}
            >
              Upload Investor Proof
              <input
                type="file"
                hidden
                onChange={(e) => handleFileUpload("investorProof", e)}
              />
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Products/Services
            </Typography>
            {products.map((product, index) => (
              <Box key={product.id} marginBottom={2}>
                <TextField
                  fullWidth
                  label={`Product/Service Name #${index + 1}`}
                  {...register(`products.${index}.name`)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Description"
                  {...register(`products.${index}.description`)}
                  margin="normal"
                />
                <IconButton color="error" onClick={() => removeProduct(index)}>
                  <Remove />
                </IconButton>
                <Divider />
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={() => addProduct({ name: "", description: "" })}
              startIcon={<Add />}
            >
              Add Product/Service
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Co-Founders
            </Typography>
            {coFounders.map((coFounder, index) => (
              <Box key={coFounder.id} marginBottom={2}>
                <TextField
                  fullWidth
                  label={`Co-Founder Name #${index + 1}`}
                  {...register(`coFounders.${index}.name`)}
                  margin="normal"
                />
                <IconButton
                  color="error"
                  onClick={() => removeCoFounder(index)}
                >
                  <Remove />
                </IconButton>
                <Divider />
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={() => addCoFounder({ name: "" })}
              startIcon={<Add />}
            >
              Add Co-Founder
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Employees
            </Typography>
            {employees.map((employee, index) => (
              <Box key={employee.id} marginBottom={2}>
                <TextField
                  fullWidth
                  label={`Employee Name #${index + 1}`}
                  {...register(`employees.${index}.name`)}
                  margin="normal"
                />
                <IconButton color="error" onClick={() => removeEmployee(index)}>
                  <Remove />
                </IconButton>
                <Divider />
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={() => addEmployee({ name: "" })}
              startIcon={<Add />}
            >
              Add Employee
            </Button>
          </CardContent>
        </Card>

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default StartupForm;
