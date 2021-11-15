import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { AppBar, drawerWidth } from "./AppBar";
import { DrawerHeader } from "./DrawerHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import OptionsList from "./OptionsList";

const MyDrawer = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <Box sx={{ display: "flex", height: "30px" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <AccountCircleIcon />
          <Typography
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, marginLeft: "5px" }}
            component="div"
          >
            {username}
          </Typography>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth
          }
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <OptionsList key={1} />
        <Divider />
      </Drawer>
    </Box>
  );
};

export default MyDrawer;
