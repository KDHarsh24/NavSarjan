import React from "react";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextareaAutosize,
} from "@mui/material";
import { Link } from "react-router-dom";

function Basic_Info() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center drop-shadow-sm">
          Basic Information
        </h1>
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
                <input
                  type="file"
                  accept="image/*"
                  className="w-full mt-2 px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <TextField
                  label="Company Name"
                  placeholder="Startup Name"
                  fullWidth
                />
                <TextField
                  label="Company Size"
                  placeholder="Team Size"
                  type="number"
                  fullWidth
                />
              </div>

              <div className="mt-6">
                <FormLabel className="text-gray-700 block mb-2">
                  Is your startup incorporated?
                </FormLabel>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Yes"
                />
              </div>
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <TextField label="Country" placeholder="Country Name" fullWidth />
              <TextField label="State" placeholder="State Name" fullWidth />
              <TextField label="City" placeholder="City Name" fullWidth />
            </div>

            <TextField
              label="Elevator Pitch"
              placeholder="We help (x) do (y) by doing (z)"
              fullWidth
              className="mt-6"
            />

            <div className="mt-6">
              <FormLabel className="text-gray-700 mb-2 block">
                Company Brief
              </FormLabel>
              <TextareaAutosize
                minRows={3}
                placeholder="Brief about the company"
                className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Product Stage */}
          <div className="mt-8">
            <FormLabel className="text-gray-600 font-medium mb-4 block">
              Product Stage
            </FormLabel>
            <RadioGroup row>
              {[
                "Idea",
                "Proof of Concept",
                "Prototype Development",
                "Ideation",
                "Minimum Viable Product Developed",
                "Commercialized",
                "Other",
              ].map((stage, index) => (
                <FormControlLabel
                  key={index}
                  value={stage}
                  control={<Radio color="primary" />}
                  label={stage}
                />
              ))}
            </RadioGroup>
          </div>

          {/* Business Models */}
          <div className="mt-8">
            <FormLabel className="text-gray-600 font-medium mb-4 block">
              Business Models
            </FormLabel>
            <RadioGroup row>
              {["B2B", "B2B2C", "B2C", "B2G", "D2C"].map((model, index) => (
                <FormControlLabel
                  key={index}
                  value={model}
                  control={<Radio color="primary" />}
                  label={model}
                />
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
              />
            )
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-8">
            <Link to="/">
              <Button variant="outlined" color="primary" className="px-6 py-3">
                Previous
              </Button>
            </Link>
            <Link to="/Team">
              <Button variant="contained" color="primary" className="px-6 py-3">
                Next
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Basic_Info;
