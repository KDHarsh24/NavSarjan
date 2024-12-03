import React, { useState, useEffect } from "react";
import { Box } from "@mui/material"; // Import Grid2
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ initialrows, columns }) => {
    const [rows, setRows] = useState(initialrows); // Set rows initially to the passed prop
    const [paginationModel, setPaginationModel] = useState({ pageSize: 20, page: 0 });

    useEffect(() => {
        setRows(initialrows); // Update rows when initialrows prop changes
    }, [initialrows]);

    const handleProcessRowUpdate = (newRow) => {
        const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
        setRows(updatedRows);
        return newRow; // Return the updated row
    };

    const leftAlignedColumns = columns.map((column) => ({
        ...column,
        headerAlign: "left", // Align headers to the left
        align: "left",  
        paddingLeft: '10px'     // Align cell content to the left
    }));

    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row';
    };

    return (
        <Box
            container 
            spacing={2} 
            sx={{ 
                width: "100%",    // Ensures the grid spans the full width
                padding: 2        // Optional padding for aesthetics
            }}
        >
            <DataGrid
                className="tablerows"
                rows={rows}
                getRowClassName={getRowClassName}
                columns={leftAlignedColumns}
                checkboxSelection
                disableSelectionOnClick
                processRowUpdate={handleProcessRowUpdate} // Handle row update
                getRowHeight={() => 52} // Set fixed row height for better UI consistency
                pagination
                pageSize={paginationModel.pageSize}
                page={paginationModel.page}
                pageSizeOptions={[10, 20, 50, { value: -1, label: 'All' }]}
                onPageChange={(newPage) => setPaginationModel((prev) => ({ ...prev, page: newPage }))}
                onPageSizeChange={(newPageSize) => setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize }))}
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