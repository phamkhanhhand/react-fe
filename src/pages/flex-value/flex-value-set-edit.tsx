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
} from "@mui/material";
import { useFlexValueSetQuery, useGetByIdWithDetail, useGetFlexValueSetById } from "../../hooks/api/useflex-value-set-query";
import { useSaveFlexValueSetMutation } from "../../hooks/api/useflex-value-setMutation";

import { ActionIcon, TextInput } from "@mantine/core";

import { FlexValue, FlexValueSet } from "../../shared/interface";
import { useSearchParams } from "react-router-dom";
import { MdAdd, MdCopyAll, MdEdit, MdOutlineDelete } from "react-icons/md";
import { ENTITY_STATE } from "../../shared/enum";
import { useQueryClient } from "@tanstack/react-query";



export default function FlexValueSetEditPage() {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FlexValueSet>({});

  const [page, setPage] = useState(0); // note: MUI pages are 0-indexed 

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [listDelete, setListDelete] = useState<number[]>([]);


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
    if (itemId) {
      navigate(`/flex-value-set/detail?id=${itemId}`);
    }
    else {
      navigate(`/flex-value-set`);

    }

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
          save();
        }
        }>
          Lưu
        </Button>
      </Toolbar>

      <Box>

        <TextInput
          label="Mã danh mục"
          placeholder="Nhập mã"

          value={String(formData?.flexValueSetCode || "")}

          onChange={(e) => {
            const value = e.currentTarget.value;
            setFormData(prev => ({
              ...prev,
              flexValueSetCode: value
            }))
          }
          }

        />

        <TextInput
          label="Tên danh mục"
          placeholder="Nhập tên"
          value={String(formData?.flexValueSetName || "")}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setFormData(prev => ({
              ...prev,
              flexValueSetName: value
            }))
          }
          }

        />

      </Box>
      <Box>Danh sách giá trị</Box>

      <Toolbar disableGutters>

        <Button variant="contained"
          color="primary"
          onClick={() => { onAdd(); }
          }>
          Thêm mới
        </Button>


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

                    {item.isEditing ? (
                      <TextInput
                        value={String(item.flexValue || "")}
                        onChange={(e) =>
                          updateDetail(item, "flexValue", e.currentTarget.value)
                        }
                      />
                    ) : (
                      item.flexValue
                    )}

                  </TableCell>
                  <TableCell>
                    {item.isEditing ? (
                      <TextInput

                        value={String(item.flexValueName || "")}

                        onChange={(e) =>
                          updateDetail(item, "flexValueName", e.currentTarget.value)
                        }
                      />
                    ) : (
                      item.flexValueName
                    )}


                  </TableCell>
                  <TableCell>

                    {item.isEditing ? (
                      <TextInput
                        value={String(item.description || "")}

                        onChange={(e) =>
                          updateDetail(item, "description", e.currentTarget.value)
                        }
                      />
                    ) : (
                      item.description
                    )}

                  </TableCell>
                  <TableCell>

                    <ActionIcon variant="default" size="lg" onClick={() => onEdit(item)}>
                      {MdEdit({ size: 18 })}

                    </ActionIcon>
                    <ActionIcon variant="default" size="lg" onClick={() => onClone(item)}>
                      {MdCopyAll({ size: 18 })}

                    </ActionIcon>
                    <ActionIcon variant="default" size="lg" onClick={() => onDelete(item)}>
                      {MdOutlineDelete({ size: 18 })}
                    </ActionIcon>

                  </TableCell>
                </TableRow>
              )
            }

            )}
          </TableBody>
        </Table>
      </TableContainer>

    </Paper>
  );
}