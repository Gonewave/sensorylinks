import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import PsychologyIcon from '@mui/icons-material/Psychology';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/therapist.jpg";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    display: ""
  },
  {
    text: "Client",
    icon: null,
    display: ""
  },
  
  {
    text: "Child",
    icon: <Groups2Outlined />,
    display: ""
  },
  {
    text: "CreateChild",
    icon: <Groups2Outlined />,
    display: "none"
  },
  {
    text: "Employee",
    icon: <Groups2Outlined />,
    display: ""
  },
  {
    text: "AddEmployee",
    icon: <Groups2Outlined />,
    display: "none"
  },
  {
    text: "TherapyPlans",
    icon: <Groups2Outlined />,
    display: "none"
  },
  {
    text: "Email",
    icon: <Groups2Outlined />,
    display: ""
  },
  {
    text: "CreateTemplate",
    icon: <Groups2Outlined />,
    display: "none"
  },
  {
    text: "Templates",
    icon: <Groups2Outlined />,
    display: ""
  },
  

  {
    text: "Survey data",
    icon: null,
    display: ""
  },
  {
    text: "Sense",
    icon: <Groups2Outlined />,
    display: ""
  },
  {
    text: "Reflex",
    icon: <Groups2Outlined />,
    display: ""
  },
  {
    text: "Question",
    icon: <Groups2Outlined />,
    display: ""
  },
  {
    text: "Score",
    icon: <Groups2Outlined />,
    display: "none"
  },
  {
    text: "Assessment",
    icon: <Groups2Outlined />,
    display: "none"
  },


  {
    text: "Expense",
    icon: null,
    display: ""
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
    display: ""
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
    display: ""
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
    display: ""
  },
  {
    text: "Therapies and needs",
    icon: null,
    display: ""
  },
  {
    text: "Therapies",
    icon: <PsychologyIcon/>,
    display: ""
  },
  {
    text: "Special_Needs",
    icon: <HealthAndSafetyIcon/>,
    display: ""
  },
  {
    text: "Difficulties and goals",
    icon: null,
    display: ""
  },
  {
    text: "Difficulties ",
    icon:<HealthAndSafetyIcon/>,
    display: ""
  },
  {
    text: "goals",
    icon: <BeenhereIcon/>,
    display: ""
  },
  {
    text: "Holiday Management",
    icon: null,
    display: ""
  },
  {
    text: "Holiday_Planner",
    icon: <CalendarMonthIcon/>,
    display: ""
  },
  {
    text: "Vacation_Planner",
    icon: <CalendarMonthIcon/>,
    display: ""
  },
  {
    text: "Payment Settings",
    icon: null,
    display: ""
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
    display: ""
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                  SENSORY LINKS
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, display }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} style={{display: display}} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;