import { useEffect, useState } from "react";
// import { Button, TextInput, Container, Title, Text, Table, TableTr } from "@mantine/core";
import { useExample } from "../../hooks/api/useExampleMutation";
import { useFlexValueQuery } from "../../hooks/api/useflex-value-query";
import { FlexValue } from "../../shared/interface";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";


export default function FlexValuePage() {

    const { data: dataRepo, isLoading, isError, error, refetch } = useFlexValueQuery();

    useEffect(() => {
    refetch(); // bây giờ mới gọi
    }, []);


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error?.message}</div>;

//   const [page, setPage] = useState(0); // note: MUI pages are 0-indexed

//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [total, setTotal] = useState(0);


var total = dataRepo?.meta?.total || 0;
  var page = dataRepo?.meta?.page || 0;
var rowsPerPage = dataRepo?.meta?.pageSize || 10;
 
  const handleChangePage = (_: any, newPage: number) => {
    // setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };


    return (


         <Paper>
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

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>



        // <Container size="sm">
        //     <Title mb="md">Danh sách giá trị danh mục</Title>

        //     <Table>
        //         <Table.Thead>

        //             <Table.Tr>
        //                 <Table.Th>ID</Table.Th>
        //                 <Table.Th>Name</Table.Th>
        //             </Table.Tr>
        //         </Table.Thead>
        //         <Table.Tbody>
        //             {dataRepo?.data?.map((item: FlexValue
        //             ) => (
        //                 <Table.Tr key={item.id}>
        //                     <Table.Td>{item.flexValue}</Table.Td>
        //                     <Table.Td>{item.flexValueName}</Table.Td>
        //                 </Table.Tr>
        //             ))}
        //         </Table.Tbody>
        //     </Table>

        // </Container>
    );
}