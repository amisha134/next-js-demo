"use client";
import { usePathname } from "next/navigation"; // Add this import
import { ROUTES } from "@/config/constants";
import { removeSession } from "@/redux/slices/auth";
import { ChildrenType } from "@/types";
import { Button } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LuChevronLeft, LuChevronRight, LuMenu } from "react-icons/lu";
import { useDispatch } from "react-redux";
import logo from "../../../public/images/mainlogo.png";
import Image from "next/image";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

type AppBarProps = MuiAppBarProps & {
  open?: boolean;
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashboardLayout({ children }: ChildrenType) {
  const theme = useTheme();
  const isAuthenticated = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const dispatch = useDispatch();
  const { push } = useRouter();
  const pathname = usePathname(); // Add this hook

  const menuItems = [
    { text: "Home", path: "/home" },
    { text: "Dashboard", path: "/" }, // Ensure this path matches your route
  ];

  const handleMenuClick = (path: string) => {
    push(path);
  };

  // Initialize open state from localStorage or default to false
  const [open, setOpen] = React.useState(() => {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebarOpen");
      return savedState ? JSON.parse(savedState) : false;
    }
    return false;
  });

  const handleDrawerOpen = () => {
    setOpen(true);
    localStorage.setItem("sidebarOpen", "true");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    localStorage.setItem("sidebarOpen", "false");
  };

  const handleLogout = () => {
    dispatch(removeSession());
    push(ROUTES.AUTH_LOGIN);
  };

  useEffect(() => {
    if (!isAuthenticated) push(ROUTES.AUTH_LOGIN);
  }, [isAuthenticated]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton color="primary" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={[{ mr: 2 }, open && { display: "none" }]}>
            <LuMenu />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color="#2972ab">
            Beauty Products
          </Typography>
          <Button
            variant="contained"
            sx={{
              ml: "auto",
              background: "linear-gradient(135deg, #085F92 0%, #68A0C1 100%)",
              "&:hover": {
                background: "linear-gradient(120deg,rgb(110, 182, 220) 0%,rgb(5, 107, 167) 100%)",
              },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={2} // Padding for spacing
        >
          {/* Logo & Title */}
          <Box display="flex" alignItems="end" gap={1}>
            <Image src={logo} alt="Logo" height={38} width={50} />
            <Typography variant="h5" fontWeight="bolder" color="#2472A0">
              Beauty
            </Typography>
          </Box>

          {/* Drawer Close Button */}
          <IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <LuChevronLeft /> : <LuChevronRight />}</IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems?.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleMenuClick(item.path)}
                selected={pathname === item.path}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#ecf5fb",
                    "&:hover": {
                      backgroundColor: "#b4cad7",
                    },
                    "& .MuiListItemText-primary": {
                      color: "primary.main",
                      fontWeight: "bold",
                    },
                  },
                }}
              >
                <ListItemText primary={item?.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box component="section" sx={{ p: 2 }}>
          {children}
        </Box>
      </Main>
    </Box>
  );
}
