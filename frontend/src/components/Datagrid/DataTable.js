import React, { useState, useEffect } from "react";
import { Box } from "@mui/material"; // Import Grid2
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ initialrows, columns }) => {
  // Map the initialrows to include the _id as id
  const [rows, setRows] = useState(() => initialrows.map((row) => ((row._id)?{ ...row, id: row._id }:{...row, id: row.id})));

  const handleProcessRowUpdate = (newRow) => {
    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    return newRow; // Return the updated row
  };

  const leftAlignedColumns = columns.map((column) => ({
    ...column,
    headerAlign: "left", // Align headers to the left
    align: "left",
    paddingLeft: "10px",
    wordWrap: "break-word", // Align cell content to the left
  }));

  const getRowClassName = (params) => {
    return params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row";
  };

  const [paginationModel, setPaginationModel] = useState({ pageSize: 20, page: 0 });

  useEffect(() => {
    // If initialrows change, update the rows with the correct _id as id
    setRows(initialrows.map((row) => ({ ...row, id: row._id })));
  }, [initialrows]);

  return (
    <Box spacing={2} sx={{ width: "100%", padding: 2 }}>
      <DataGrid
        className="tablerows"
        rows={rows}
        getRowClassName={getRowClassName}
        columns={leftAlignedColumns}
        checkboxSelection
        disableSelectionOnClick
        processRowUpdate={handleProcessRowUpdate} // Handle row update
        getRowHeight={() => "auto"}
        pagination
        pageSizeOptions={[10, 20, 50, { value: -1, label: "All" }]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        style={{ width: "100%" }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            justifyContent: "flex-start", // Align column headers to the left
          },
          "& .MuiDataGrid-cell": {
            justifyContent: "flex-start", // Align cell text to the left
          },
        }}
      />
    </Box>
  );
};

export default DataTable;
