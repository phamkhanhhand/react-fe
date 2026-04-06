import { useEffect, useState } from "react";
// import { Button, TextInput, Container, Title, Text, Table, TableTr } from "@mantine/core";
import { useExample } from "../../hooks/api/useExampleMutation";
import { useFlexValueQuery } from "../../hooks/api/useflex-value-query";
import { FlexValue } from "../../shared/interface";

import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Toolbar,
  InputBase,
  IconButton,
  Box,
} from "@mui/material";
import FlexValueAddPopup from "./flex-value-add-popup";


export default function FlexValuePage() {

  const navigate = useNavigate();
  const [page, setPage] = useState(0); // note: MUI pages are 0-indexed

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [keyword, setKeyword] = useState("");//giá trị mặc định; các cái useState sẽ đồng bộ hook và giao diện


  const { data: dataRepo, isLoading, isError, error, refetch } = useFlexValueQuery(page, rowsPerPage);


  useEffect(() => {
    if (dataRepo?.meta) {
      // setTotal(dataRepo.meta.total || 0);
      // setPage(dataRepo.meta.page || 0);
      // setRowsPerPage(dataRepo.meta.pageSize || 10);
    }
  }, [dataRepo]);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;


  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }

  return (


    <Paper>

<Box >
Danh sách giá trị danh mục
</Box>

      <Toolbar disableGutters>


        <Button variant="contained" color="primary" onClick={() => 
          

{
  setOpenAddPopup(true);
}

        }>
          Add
        </Button>

        <Button onClick={() => navigate("/flex-value")}>
          Go to Flex Value
        </Button>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          value={keyword}
          onChange={handleChangeKeyword}
          data-testid="search-input"
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          data-testid="search-button"
        >
          <SearchIcon />
        </IconButton>


        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />

      </Toolbar>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRepo?.data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.flexValue}</TableCell>
                <TableCell>{item.flexValueName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    <FlexValueAddPopup isOpen={openAddPopup}
    onClose={() => {
      setOpenAddPopup(false);
    }}
    ></FlexValueAddPopup>
    </Paper>



  );
}