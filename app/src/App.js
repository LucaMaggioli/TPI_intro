import './App.css';
import CalendarPage, { Day, Month, Week, Year } from './calendar-page/CalendarPage'
import ClientPage from './clients-page/ClientPage'
import ProjectPage from './projects-page/ProjectPage'
import { BrowserRouter, HashRouter, Routes, Route, Switch } from "react-router-dom";
import NavBar from './shared-components/NavBar';
import { Box } from '@mui/material';



function App() {

  const appStyle = {
    background: 'rgb(46,10,190)',
    background: 'linear-gradient(45deg, rgba(46,10,190,0.4) 0%, rgba(237,198,215,0.6) 0%, rgba(132,95,201,1) 100%)',
    overflow: 'hidden',
    height: '100vh',
    width: '100%',
  }
  const navbarStyle= {
    display:'flex',
    flexDirection:'row',
    justifyContent:'right',
    padding:8
  }
  const contentStyle= {
  }

  return (
    <div style={appStyle} >
      {/* <HashRouter> */}
      <BrowserRouter>
        <Box style={navbarStyle}>
          <NavBar/>
        </Box>
        <Box style={contentStyle}>
          <Routes>
            <Route path="/" component={<CalendarPage/>} element={<CalendarPage/>}/>
            <Route path="/calendar" component={<CalendarPage/>} element={<CalendarPage/>}>
              <Route path="/calendar/year" component={<Year />} element={<Year/>}/>
              <Route path="/calendar/month" component={<Month />} element={<Month/>}/>
              <Route path="/calendar/week" component={<Week />} element={<Week/>}/>
              <Route path="day" component={<Day />} element={<Day />}/>
            </Route>
            <Route path='/clients' component={<ClientPage/>} element={<ClientPage/>}/>
            <Route path='/projects' component={<ProjectPage/>} element={<ProjectPage/>}/>
            <Route
              path="*"
              component={
                <main style={{ padding: "1rem" }}>
                  <p>404 Page not found</p>
                </main>
              }
            />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
