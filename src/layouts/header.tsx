import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import { useState } from "react";
import { logout } from "../services/auth";

interface Props {
  height?: number;
}

export default function Header({ height = 64 }: Props) {
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
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ height: "100%" }}>
        
        {/* LEFT */}
        <Typography variant="h6">
          FLEX VALUE APP
        </Typography>

        {/* RIGHT */}
        <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          
          <Typography sx={{ mr: 2 }}>
            {user.fullName}
          </Typography>

          <IconButton onClick={handleOpen}>
            <Avatar>{user.username[0].toUpperCase()}</Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  );
}