import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography
} from "@mui/material";
import { useState } from "react";
import { logout } from "../services/auth";

interface Props {
  height?: number;
  sidebarWidth: number;
}

export default function Header({ height = 64, sidebarWidth }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const user = {
    username: "admin",
    fullName: "Administrator"
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        height: `${height}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ height: "100%" }}>
        <Box />

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: 2 }}>
            {user.fullName}
          </Typography>

          <IconButton onClick={handleOpen}>
            <Avatar>{user.username[0].toUpperCase()}</Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}