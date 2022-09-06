import logo from './logo.svg';
import './App.css';
import CalendarPage,{About, Day, Home, Month, Users, Week, Year} from './calendar-page/CalendarPage'
import ClientPage from './client-page/ClientPage'
import {useState} from 'react'
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import ClientDetails from './client-page/ClientDetails';
import NavBar from './shared-components/NavBar';
import ClientList from './client-page/ClientList';
import { Box } from '@mui/material';



function App() {
  const [data, setData] = useState();
  const [calendar, setCalendar] = useState();

  async function helloHandler(){
    let electronMessage = await window.testApi.testInvoke("testing invoke function");
    console.log(electronMessage);
    setData(electronMessage);
  }
  async function calendarHandler(){
    let electronResponse = await window.api.getCalendar();
    console.log(electronResponse);
    // setCalendar(electronResponse);
  }
  function App1(){
    return(<>Hello</>);
  }

  const appStyle = {
    background: 'rgb(46,10,190)',
    background: 'linear-gradient(45deg, rgba(46,10,190,0.4) 0%, rgba(237,198,215,0.6) 0%, rgba(132,95,201,1) 100%)',
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
    // height: 'calc(100vh-60px)'
  }

  return (
    <div style={appStyle} >
      <BrowserRouter>
        <Box style={navbarStyle}>
          <NavBar/>
        </Box>
        <Box style={contentStyle}>
          <Routes>
            <Route path="/" element={<App1/>}/>
            <Route path="/calendar" element={<CalendarPage/>}>
              <Route path="/calendar/year" element={<Year />}/>
              <Route path="/calendar/month" element={<Month />}/>
              <Route path="/calendar/week" element={<Week />}/>
              <Route path="day" element={<Day />}/>
            </Route>
            <Route path='/client' element={<ClientPage/>}>
              <Route path='/client/:clientId' element={<ClientDetails/>}></Route>
            </Route>
            <Route
              path="*"
              element={
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
