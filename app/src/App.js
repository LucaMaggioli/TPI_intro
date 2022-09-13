import './App.css';
import CalendarPage,{About, Day, Home, Month, Users, Week, Year} from './calendar-page/CalendarPage'
import ClientPage from './clients-page/ClientPage'
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
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
