import { useEffect, useState } from "react";
import { Button, Drawer } from "@mantine/core";
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


// type Props = {
//   isOpen: boolean;
// };
// export default function FlexValueAddPopup({ isOpen }: Props) {


export default function FlexValueAddPopup(
  { isOpen,
    onClose
  }: {
    isOpen: boolean
    onClose: () => void
  }
) {


  const onSave = async () => {
    onClose();
    // openHandler.set(false)
  }
  const onCancel = async () => {
    onClose();
    // openHandler.set(false)
  }

  return (
    <Drawer opened={isOpen}
      onClose={() => {
        onCancel()
      }}
      title="Add Flex Value"

      position="right" // 🔥 có sẵn luôn
    >
 

        <div>
          {/* Form fields for adding a new Flex Value */}
          <p>Form to add a new Flex Value goes here.</p>
        </div>


        <Box sx={{ mt: "auto", display: "flex", gap: 2 }}>
          <Button mt={16} fullWidth variant="contained" onClick={onSave} >
            Cancel
          </Button>
          <Button mt={16} fullWidth variant="contained" onClick={onSave} >
            Save
          </Button>

        </Box> 
    </Drawer>

  );
}