import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Customers from 'scenes/customers';
import Overview from 'scenes/overview';
import Test from "scenes/child";
import Staff from "./scenes/staff/Staff";
import Users from "./components/User";
import CreateUsers from "./components/CreateUser";
import UpdateUsers from "./components/UpdateUser";
import Needs from "./components/Need";
import CreateNeeds from "./components/CreateNeed";
import UpdateNeeds from "./components/UpdateNeed";
import Diffs from "components/Diff";
import CreateDiffs from "./components/CreateDiff";
import UpdateDiffs from "./components/UpdateDiff";
import Goals from "./components/Goal";
import CreateGoals from "./components/CreateGoal";
import UpdateGoals from "./components/UpdateGoal";
import AddStaff from "components/AddStaff";
import TherapyPlans from "components/TherapyPlans";
import CreateChild from "components/CreateChild";
import Survey from "components/Survey";
import Senses from "components/Senses";
import Questions from "components/Questions";
import Reflex from "components/Reflex";
import MyCalendar from "./components/MyCalendar";
import Home from "./components/Home";
import Email from "./components/Email";
import Score from "components/Score";
import Assessment from "components/Assessment";
import ShareAssessment from "components/ShareAssessment";
import CreateTemplate from "components/CreateTemplate";
import Templates from "components/Templates";
import AssignTherapy from "components/AssignTherapy";
//import Test from "scenes/child"
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/child" element={<Test />} />
              <Route path="/employee" element={<Staff/>}></Route>
              <Route path="/overview" element={<Overview />} />
              <Route path='/therapies' element={<Users />}></Route>
              <Route path='/createUser' element={<CreateUsers />}></Route>
              <Route path='/updateUser/:id' element={<UpdateUsers />}></Route>
              <Route path='/special_needs' element={<Needs />}></Route>
              <Route path='/createNeeds' element={<CreateNeeds />}></Route>
              <Route path='/updateNeeds/:id' element={<UpdateNeeds />}></Route>
              <Route path='/difficulties' element={<Diffs />}></Route>
              <Route path='/createdifficulties' element={<CreateDiffs />}></Route>
              <Route path='/updatedifficulties/:id' element={<UpdateDiffs />}></Route>
              <Route path='/goals' element={<Goals />}></Route>
              <Route path="/addemployee" element={<AddStaff />}></Route>
              <Route path="/therapyplans" element={<TherapyPlans />}></Route>
              <Route path="/createchild" element={<CreateChild />}></Route>
              <Route path='/creategoals' element={<CreateGoals />}></Route>
              <Route path='/updategoals/:id' element={<UpdateGoals />}></Route>
              <Route path='/Survey' element={<Survey />}></Route>
              <Route path='/sense' element={<Senses />}></Route>
              <Route path='/reflex' element={<Reflex />}></Route>
              <Route path='/question' element={<Questions />}></Route>
              <Route path='/holiday_planner' element={<MyCalendar />}></Route>
              <Route path='/vacation_planner' element={<Home  />}></Route>
              <Route path="/email" element={<Email />}></Route>
              <Route path="/score" element={<Score />}></Route>
              <Route path="/assessment" element={<Assessment />}></Route>
              <Route path="/assessment/share/:token" element={<ShareAssessment />} />
              <Route path="/createtemplate" element={<CreateTemplate/>}/>
              <Route path="/templates" element={<Templates/>}/>
              <Route path="/assign_therapy" element={<AssignTherapy/>}/>

            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;