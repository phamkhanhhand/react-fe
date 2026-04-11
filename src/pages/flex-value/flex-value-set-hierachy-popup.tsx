import { useEffect, useState } from "react";
import { Button, Drawer, TextInput } from "@mantine/core";
import { useExample } from "../../hooks/api/useExampleMutation";
import { useFlexValueQuery } from "../../hooks/api/useflex-value-query";
import { FlexValue, FlexValueSet } from "../../shared/interface";

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
  Toolbar,
  InputBase,
  IconButton,
  Box,
} from "@mui/material";
import { Modal } from "@mantine/core";
import { Description } from "@mui/icons-material";


export default function FlexValueSetHierachyPopup(
  { isOpen,
    initialData,
    onClose,
    onSave
  }: {
    isOpen: boolean
    initialData?: FlexValueSet
    onClose?: () => void
    onSave?: (flexValueSet: { flexValueSetCode: string; flexValueSetName: string; description: string, flexValueSetId: number | undefined }) => void
  }
) {


  const [flexValueSetCode, setFlexValueSetCode] = useState("");
  const [flexValueSetName, setFlexValueSetName] = useState("");
  const [description, setDescription] = useState("");
  const [flexValueSetId, setFlexValueSetId] = useState<number | undefined>(undefined);

  function resetForm() {
    setFlexValueSetCode("");
    setFlexValueSetName("");
    setDescription("");
    setFlexValueSetId(undefined);
  }

  const onSavePopup = async () => {
    onSave?.({flexValueSetCode: flexValueSetCode, flexValueSetName: flexValueSetName, description: description, flexValueSetId: flexValueSetId});
    resetForm();
    onClose?.();
    // openHandler.set(false)
  }
  const onCancelPopup = async () => {
    onClose?.();
    // openHandler.set(false)
  }
  
  const setForm = (data: any) => {
    setFlexValueSetCode(data.flexValueSetCode || data.flex_value_set_code || "");
    setFlexValueSetName(data.flexValueSetName || data.flex_value_set_name || "");
    setDescription(data.description || "");
    setFlexValueSetId(data.flexValueSetId || data.flex_value_set_id);
  }

  useEffect(() => {
  if (initialData) {
    setForm(initialData);
  }
}, [initialData]);

  return (
    <Drawer opened={isOpen}
      onClose={() => {
        onCancelPopup()
      }}
      title="Edit Flex Value Set" 
      position="right"  
    >


      <Box>  
        <TextInput
          label="Code"
          placeholder="code"
          value={flexValueSetCode}
          onChange={(e) => setFlexValueSetCode(e.currentTarget.value)}
        />
 
        <TextInput
          label="Name"
          placeholder="name"
          value={flexValueSetName}
          onChange={(e) => setFlexValueSetName(e.currentTarget.value)}
        /> 
        <TextInput
          label="Description"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        /> 
      </Box>

      <Box sx={{ mt: "auto", display: "flex", gap: 2 }}>
        <Button mt={16} fullWidth variant="contained" onClick={onCancelPopup} >
          Cancel
        </Button>
        <Button mt={16} fullWidth variant="contained" onClick={onSavePopup} >
          Save
        </Button>

      </Box>
    </Drawer>

  );
}