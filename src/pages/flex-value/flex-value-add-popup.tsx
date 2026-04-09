import { useEffect, useState } from "react";
import { Button, Drawer, TextInput } from "@mantine/core";
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
  Toolbar,
  InputBase,
  IconButton,
  Box,
} from "@mui/material";
import { Modal } from "@mantine/core";
import { Description } from "@mui/icons-material";


export default function FlexValueEditPopup(
  { isOpen,
    initialData,
    onClose,
    onSave
  }: {
    isOpen: boolean
    initialData?: FlexValue
    onClose?: () => void
    onSave?: (flexValue: { flexValueCode: string; flexValueName: string; description: string, flexValueId: number | undefined }) => void
  }
) {


  const [flexValueCode, setFlexValueCode] = useState("");
  const [flexValueName, setFlexValueName] = useState("");
  const [description, setDescription] = useState("");
  const [flexValueId, setFlexValueId] = useState<number | undefined>(undefined);

  function resetForm() {
    setFlexValueCode("");
    setFlexValueName("");
    setDescription("");
    setFlexValueId(undefined);
  }

  const onSavePopup = async () => {
    onSave?.({ flexValueCode: flexValueCode, flexValueName: flexValueName, description: description, flexValueId: flexValueId });
    resetForm();
    onClose?.();
    // openHandler.set(false)
  }
  const onCancelPopup = async () => {
    onClose?.();
    // openHandler.set(false)
  }

  const setForm = (data: any) => {
    setFlexValueCode(data.flexValueCode || "");
    setFlexValueName(data.flexValueName || "");
    setDescription(data.description || "");
    setFlexValueId(data.flexValueId);
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
          value={flexValueCode}
          onChange={(e) => setFlexValueCode(e.currentTarget.value)}
        />

        <TextInput
          label="Name"
          placeholder="name"
          value={flexValueName}
          onChange={(e) => setFlexValueName(e.currentTarget.value)}
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