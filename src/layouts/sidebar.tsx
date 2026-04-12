import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItemIcon,
  Tooltip,
  Box,
  Typography,
  IconButton
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItem {
  id: number;
  name: string;
  path?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

const menus: MenuItem[] = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />
  },
  {
    id: 2,
    name: "Danh mục",
    icon: <CategoryIcon />,
    children: [
      {
        id: 3,
        name: "Quản lý danh mục",
        path: "/flex-value-set"
      }
    ]
  }
];

const SidebarItem = ({
  item,
  collapsed
}: {
  item: MenuItem;
  collapsed?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = item.path && location.pathname === item.path;

  if (item.children?.length) {
    return (
      <>
        <Tooltip title={collapsed ? item.name : ""} placement="right">
          <ListItemButton
            onClick={() => setOpen(!open)}
            sx={{
              justifyContent: collapsed ? "center" : "space-between"
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>

            {!collapsed && <ListItemText primary={item.name} />}

            {!collapsed &&
              (open ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
          </ListItemButton>
        </Tooltip>

        <Collapse in={open && !collapsed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 2 }}>
            {item.children.map(child => (
              <SidebarItem
                key={child.id}
                item={child}
                collapsed={collapsed}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <Tooltip title={collapsed ? item.name : ""} placement="right">
      <ListItemButton
        selected={!!isActive}
        onClick={() => navigate(item.path || "")}
        sx={{
          justifyContent: collapsed ? "center" : "flex-start"
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          {item.icon}
        </ListItemIcon>

        {!collapsed && <ListItemText primary={item.name} />}
      </ListItemButton>
    </Tooltip>
  );
};

export default function Sidebar({
  collapsed,
  onToggle
}: {
  collapsed?: boolean;
  onToggle?: () => void;
}) {
  return (
    <>
      {/* HEADER */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          borderBottom: "1px solid #eee"
        }}
      >
        {!collapsed && (
          <Typography variant="h6" noWrap>
            FLEX VALUE APP
          </Typography>
        )}

        {/* 🔥 luôn hiển thị để mở lại */}
        <IconButton onClick={onToggle}>
          <MenuIcon />
        </IconButton>
      </Box>

      {/* MENU */}
      <List>
        {menus.map(item => (
          <SidebarItem
            key={item.id}
            item={item}
            collapsed={collapsed}
          />
        ))}
      </List>
    </>
  );
}