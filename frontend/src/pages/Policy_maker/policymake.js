import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  Button,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function ChangeHistoryTable() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filterText, setFilterText] = useState("");

  // Fetch records with isVerification: false
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.post("http://localhost:5001/api/fetch", {
          collectionName: "history",
          condition: { isVerification: false },
          projection: {},
        });
        setRecords(response.data.data);
        setFilteredRecords(response.data.data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchRecords();
  }, []);

  // Handle sorting
  const handleSort = (key) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key, direction: newDirection });

    const sortedRecords = [...filteredRecords].sort((a, b) => {
      if (a[key] < b[key]) return newDirection === "asc" ? -1 : 1;
      if (a[key] > b[key]) return newDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredRecords(sortedRecords);
  };

  // Handle filtering
  const handleFilter = (e) => {
    const text = e.target.value.toLowerCase();
    setFilterText(text);
    setFilteredRecords(
      records.filter(
        (record) =>
          record.entityId.toLowerCase().includes(text) ||
          record.fieldChanged.toLowerCase().includes(text)
      )
    );
  };

  // Update both `records` and `filteredRecords`
  const updateRecord = (recordId, field, value) => {
    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record._id === recordId ? { ...record, [field]: value } : record
      )
    );
    setFilteredRecords((prevFiltered) =>
      prevFiltered.map((record) =>
        record._id === recordId ? { ...record, [field]: value } : record
      )
    );
  };

  // Handle Save button click
  const handleSave = async (recordId, isVerified, rejectionReason) => {
    const record = records.find((r) => r._id === recordId);
    if (!record) return;

    try {
      // Update the record in the database
      await axios.post("http://localhost:5001/api/replace", {
        collectionName: "history",
        condition: { _id: recordId },
        data: {
          ...record,
          isVerification: isVerified,
          rejectionReason: isVerified ? null : rejectionReason,
        },
      });

      console.log("Record updated successfully", record);
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        NavSarjan Welcomes You,
      </Typography>

      {/* Filter Input */}
      <TextField
        label="Filter by Name or Details"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filterText}
        onChange={handleFilter}
      />

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "entityId"}
                  direction={
                    sortConfig.key === "entityId" ? sortConfig.direction : "asc"
                  }
                  onClick={() => handleSort("entityId")}
                >
                  Data ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "fieldChanged"}
                  direction={
                    sortConfig.key === "fieldChanged"
                      ? sortConfig.direction
                      : "asc"
                  }
                  onClick={() => handleSort("fieldChanged")}
                >
                  Details
                </TableSortLabel>
              </TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Reason for Rejection</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record._id}>
                <TableCell>
                  <Link
                    to={`/dashboard/${record.entityType}s/${record.entityType}profile`}
                  >
                    {record.entityId}
                  </Link>
                </TableCell>
                <TableCell>{record.fieldChanged}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={record.isVerification || false}
                    onChange={(e) =>
                      updateRecord(record._id, "isVerification", e.target.checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    placeholder="Reason (if rejected)"
                    disabled={record.isVerification}
                    value={record.rejectionReason || ""}
                    onChange={(e) =>
                      updateRecord(
                        record._id,
                        "rejectionReason",
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleSave(
                        record._id,
                        record.isVerification,
                        record.rejectionReason
                      )
                    }
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ChangeHistoryTable;
