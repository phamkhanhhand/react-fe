import { useState } from "react";
import { Drawer, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const drawerWidth = 240;
const collapsedWidth = 70;
const headerHeight = 64;

export default function MainLayout() {
  const [open, setOpen] = useState(true);

  const sidebarWidth = open ? drawerWidth : collapsedWidth;

  return (
    <Box sx={{ display: "flex" }}>
      
      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            transition: "width 0.3s",
            overflowX: "hidden"
          }
        }}
      >
        <Sidebar
          collapsed={!open}
          onToggle={() => setOpen(!open)}
        />
      </Drawer>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden" // 🔥 chặn scroll toàn layout
        }}
      >
        <Header
          height={headerHeight}
          sidebarWidth={sidebarWidth}
        />

        {/* CONTENT SCROLL */}
        <Box
          sx={{
            mt: `${headerHeight}px`,
            height: `calc(100vh - ${headerHeight}px)`,
            overflowY: "auto", // 🔥 chỉ content scroll
            p: 3
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}