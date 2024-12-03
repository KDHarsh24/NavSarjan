import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns }) => {
  const [paginationModel, setPaginationModel] = React.useState({ pageSize: 10, page: 0 });

  const getRowClassName = (params) => {
    return params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "odd-row";
  };

  const leftAlignedColumns = columns.map((column) => ({
    ...column,
    headerAlign: "left", // Align headers to the left
    align: "left", // Align cell content to the left
  }));

  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
      }}
    >
      <DataGrid
        rows={rows}
        columns={leftAlignedColumns}
        getRowClassName={getRowClassName}
        checkboxSelection
        disableSelectionOnClick
        pagination
        pageSizeOptions={[10, 20, 50, { value: -1, label: "All" }]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
            fontSize: "14px",
          },
          "& .MuiDataGrid-cell": {
            whiteSpace: "normal",
            wordWrap: "break-word",
            lineHeight: 1.5,
            padding: "8px",
          },
          "& .MuiDataGrid-cell--textLeft": {
            justifyContent: "flex-start",
          },
          "& .MuiDataGrid-columnHeader--alignLeft": {
            justifyContent: "flex-start",
          },
        }}
      />
    </Box>
  );
};

export default DataTable;
