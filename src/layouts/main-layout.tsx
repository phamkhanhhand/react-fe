import { useState } from "react";
import {
  Drawer,
  Box,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const drawerWidth = 240;
const collapsedWidth = 70;
const headerHeight = 64;

export default function MainLayout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      
      {/* 🔥 SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            transition: "width 0.3s",
            overflowX: "hidden"
          }
        }}
      >
        {/* toggle */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <IconButton onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Sidebar collapsed={!open} />
      </Drawer>

      {/* 🔥 RIGHT SIDE */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        
        {/* HEADER */}
        <Header height={headerHeight} />

        {/* CONTENT */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            mt: `${headerHeight}px`
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}