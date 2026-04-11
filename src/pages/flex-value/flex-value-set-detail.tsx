import { useEffect, useState } from "react";

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
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import { useFlexValueSetQuery, useGetByIdWithDetail, useGetFlexValueSetById } from "../../hooks/api/useflex-value-set-query";
import { useSaveFlexValueSetMutation } from "../../hooks/api/useflex-value-setMutation";

import { ActionIcon, Text, TextInput } from "@mantine/core";

import { FlexValue, FlexValueSet } from "../../shared/interface";
import { useSearchParams } from "react-router-dom";
import { MdAdd, MdCopyAll, MdEdit, MdLink, MdOutlineDelete } from "react-icons/md";
import { ENTITY_STATE } from "../../shared/enum";
import { useQueryClient } from "@tanstack/react-query";
import FlexValueSetHierachyPopup from "./flex-value-set-hierachy-popup";



export default function FlexValueSetDetailPage() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FlexValueSet>({});

  const [page, setPage] = useState(0); // note: MUI pages are 0-indexed 

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [listDelete, setListDelete] = useState<number[]>([]);
  const [openLinkPopup, setOpenLinkPopup] = useState(false);



  const [searchParams] = useSearchParams();
  const flexValueSetId = searchParams.get("id");
  let itemId = flexValueSetId ? Number(flexValueSetId) : 0;


  var { data: editingData, refetch: refetchEditting } = useGetByIdWithDetail(itemId, {
    onSuccess: (data) => {
      let clone = structuredClone(data);


      clone?.detail?.forEach((x: FlexValue) => {
        x.uiid = x.uiid ? x.uiid : crypto.randomUUID();
      });

      setFormData(clone);

    },
  });


  const { mutate: saveMutate, isPending, error: saveError } = useSaveFlexValueSetMutation();

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const save = async () => {

    saveMutate(formData, {
      onSuccess: () => {


        queryClient.invalidateQueries({
          queryKey: ["flexValueSetid", itemId]
        });


      },
    });

  }
  const updateDetail = (data: FlexValue, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      detail: prev.detail?.map(x =>
        x.uiid === data.uiid
          ? { ...x, [field]: value }
          : x
      )
    }));
  };

  const onEdit = (data: FlexValue) => {
    setFormData(prev => ({
      ...prev,
      detail: prev.detail?.map(x =>
        x.uiid === data.uiid
          ? { ...x, isEditing: !x.isEditing, entityState: (x.entityState == ENTITY_STATE.ADD ? x.entityState : ENTITY_STATE.EDIT) } // 🔥 toggle luôn
          : x
      )
    }));
  };

  const onCancel = async () => {

    navigate(`/flex-value-set`);


  };


  const onDelete = async (data: FlexValue) => {


    if (data.entityState != ENTITY_STATE.ADD && data.flexValueId) {
      listDelete.push(data.flexValueId);
    }

    setFormData(prev => ({
      ...prev,
      listDelete: listDelete,
      detail: prev.detail?.map(x =>
        x.uiid === data.uiid
          ? { ...x, entityState: ENTITY_STATE.DELETE }
          : x
      )

    }));



  }

  const onAdd = () => {
    const newItem: FlexValue = {
      flexValueId: undefined, // 🔥 chưa có id (backend sẽ insert)
      flexValue: "",
      flexValueName: "",
      description: "",
      isEditing: true // 🔥 cho edit luôn
      , entityState: ENTITY_STATE.ADD
      , uiid: crypto.randomUUID()
    };

    setFormData(prev => ({
      ...prev,
      detail: [newItem, ...(prev.detail || [])] // 🔥 add lên đầu
    }));
  };


  const onClone = (originData: FlexValue) => {
    const newItem: FlexValue = {
      flexValueId: undefined, // 🔥 chưa có id (backend sẽ insert)
      flexValue: originData.flexValue,
      flexValueName: originData.flexValueName,
      description: originData.description,
      isEditing: true // 🔥 cho edit luôn
      , entityState: ENTITY_STATE.ADD
      , uiid: crypto.randomUUID()
    };

    setFormData(prev => ({
      ...prev,
      detail: [newItem, ...(prev.detail || [])] // 🔥 add lên đầu
    }));
  };


  const pagedData: FlexValue[] | null | undefined = formData?.detail?.filter(x => x.entityState != ENTITY_STATE.DELETE)?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );




  const [value, setValue] = useState(0);

  return (




    <Paper>


      <Box >
        Chỉnh sửa danh mục
      </Box>

      <Toolbar disableGutters>

        <Button variant="contained" color="primary" onClick={() => {
          onCancel();
        }
        }>Thoát
        </Button>

        <Button variant="contained" color="primary" onClick={() => {

          navigate(`/flex-value-set/edit?id=${itemId}`);

        }
        }>
          Sửa
        </Button>
      </Toolbar>

      <Box>
        <Box>
          <Text size="xs" c="gray">
            Mã danh mục
          </Text>
          <Text size="sm">
            {formData?.flexValueSetCode || "-"}
          </Text>
        </Box>

        <Box>
          <Text size="xs" c="gray">
            Tên danh mục
          </Text>
          <Text size="sm">
            {formData?.flexValueSetName || "-"}
          </Text>
        </Box>
      </Box>
      <br />



      <Box>
        <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
          <Tab label="Danh sách giá trị" />
          <Tab label="Danh sách liên kết danh mục" />
        </Tabs>

        <Box mt={2}>
          {value === 0 && <div>

          //#region

            <Box>Danh sách giá trị</Box>

            <Toolbar disableGutters>

              <TablePagination
                component="div"
                count={formData?.detail?.length || 0}
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
                    <TableCell>Mã</TableCell>
                    <TableCell>Tên</TableCell>
                    <TableCell>Mô tả</TableCell>
                    <TableCell>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagedData?.map((item) => {

                    if (!item || !item.uiid) return null; // 🔥 chống crash


                    return (
                      <TableRow key={item.uiid}>
                        <TableCell>
                          {
                            item.flexValue
                          }

                        </TableCell>
                        <TableCell>
                          {
                            item.flexValueName
                          }
                        </TableCell>
                        <TableCell>
                          {
                            item.description
                          }

                        </TableCell>
                        <TableCell>

                          <ActionIcon variant="default" size="lg" onClick={() => setOpenLinkPopup(true)}>
                            {MdLink({ size: 18 })}

                          </ActionIcon>


                        </TableCell>
                      </TableRow>
                    )
                  }

                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <FlexValueSetHierachyPopup

              isOpen={openLinkPopup}

              initialData={editingData}

              onClose={() => {
                setOpenLinkPopup(false);
              }}
              onSave={($event) => {
                // savePopup($event);
              }}
            ></FlexValueSetHierachyPopup>



          //#endregion

          </div>}
          {value === 1 && <div>

            #region

 <Box>Danh sách các danh mục cha</Box>

            <Toolbar disableGutters>

              <TablePagination
                component="div"
                count={formData?.detail?.length || 0}
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
                    <TableCell>Mã</TableCell>
                    <TableCell>Tên</TableCell>
                    <TableCell>Mô tả</TableCell>
                    <TableCell>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagedData?.map((item) => {

                    if (!item || !item.uiid) return null; // 🔥 chống crash


                    return (
                      <TableRow key={item.uiid}>
                        <TableCell>
                          {
                            item.flexValue
                          }

                        </TableCell>
                        <TableCell>
                          {
                            item.flexValueName
                          }
                        </TableCell>
                        <TableCell>
                          {
                            item.description
                          }

                        </TableCell>
                        <TableCell>

                          <ActionIcon variant="default" size="lg" onClick={() => setOpenLinkPopup(true)}>
                            {MdLink({ size: 18 })}

                          </ActionIcon>


                        </TableCell>
                      </TableRow>
                    )
                  }

                  )}
                </TableBody>
              </Table>
            </TableContainer>



            #endregion
          </div>}
        </Box>
      </Box>



    </Paper>
  );
}