import { useEffect, useState } from "react";

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
import { useFlexValueSetQuery, useGetFlexValueSetById } from "../../hooks/api/useflex-value-set-query";
import FlexValueSetEditPopup from "./flex-value-set-edit-popup";
import { useDeleteFlexValueSetMutation, useSaveFlexValueSetMutation } from "../../hooks/api/useflex-value-setMutation";

import { useQueryClient } from "@tanstack/react-query";
import { ActionIcon, Group } from "@mantine/core";

import { MdOutlineDelete, MdEdit } from 'react-icons/md'


export default function FlexValueSetPage() {

  const navigate = useNavigate();
  const [page, setPage] = useState(0); // note: MUI pages are 0-indexed
  const [flexValueSetId, setFlexValueSetId] = useState(0); // note: MUI pages are 0-indexed

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [keyword, setKeyword] = useState("");//giá trị mặc định; các cái useState sẽ đồng bộ hook và giao diện
  const [searchValue, setSearchValue] = useState("");

  const { data: dataRepo, isLoading, isError, error, refetch } = useFlexValueSetQuery(page, rowsPerPage, searchValue);

  const { data: editingData, refetch: refetchEditting } = useGetFlexValueSetById(flexValueSetId, {
    onSuccess: (data) => {


      console.log("loaded", data);
    },
  });


  const { mutate: saveMutate, isPending, error: saveError } = useSaveFlexValueSetMutation();
  const { mutate: deleteMutate } = useDeleteFlexValueSetMutation();

  useEffect(() => {
    if (dataRepo?.meta) {
      setTotal(dataRepo.meta.total || 0);
    }
  }, [dataRepo]);

  const searchList = async () => {
 
    setSearchValue(keyword);

  setTimeout(() => {
    refetch();
  }, 0); 
  }

  /*
  * enter -> search
  */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !openAddPopup) {
 //todo searchValue not update
        searchList();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [openAddPopup]);



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
    console.log(event.target.value + "=" + keyword);
  }

  const save = async (flexValueSet: { flexValueSetCode: string; flexValueSetName: string }) => {

    saveMutate(flexValueSet, {
      onSuccess: () => {
        setOpenAddPopup(false);
        refetch(); // reload list

        // queryClient.invalidateQueries({ queryKey: ["flex-value-set"] });

      },
    });
  }

  const deleteFlexValueSet = async (flexValueSetId: number) => {

    deleteMutate({ flexValueSetId }, {
      onSuccess: () => {
        refetch(); // reload list 
      },
    });
  }


  const getForEdit = async (flexValueSetId: number) => {

    setFlexValueSetId(flexValueSetId);
    setOpenAddPopup(true); // open popup after data is loaded

  }

  function onDeleteFlexValueSet(flexValueSetId: number): void {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteFlexValueSet(flexValueSetId);
    }
  }



  return (


    <Paper>

      <Box >
        Danh sách danh mục
      </Box>

      <Toolbar disableGutters>
        <Button variant="contained" color="primary" onClick={() => {
          setOpenAddPopup(true);
        }

        }>
          Add
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
          onClick={searchList}
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
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRepo?.data?.map((item) => (
              <TableRow key={item.flexValueSetCode}>
                <TableCell>{item.flexValueSetCode}</TableCell>
                <TableCell>{item.flexValueSetName}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>

                  <Group>
                    <ActionIcon variant="default" size="lg" onClick={() => getForEdit(item.flexValueSetId)}>
                      {MdEdit({ size: 18 })}
                    </ActionIcon>
                    <ActionIcon variant="default" size="lg" onClick={() => onDeleteFlexValueSet(item.flexValueSetId)}>
                      {MdOutlineDelete({ size: 18 })}
                    </ActionIcon>
                  </Group>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FlexValueSetEditPopup isOpen={openAddPopup}

        initialData={editingData}

        onClose={() => {
          setOpenAddPopup(false);
        }}
        onSave={($event) => {
          save($event);
        }}
      ></FlexValueSetEditPopup>
    </Paper>



  );
}