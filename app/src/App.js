import logo from './logo.svg';
import './App.css';
import CalendarPage,{About, Day, Home, Month, Users, Week, Year} from './calendar-page/CalendarPage'
import {useState} from 'react'
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";


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

  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <Link to="/calendar">Calendar page</Link>
          <Link to="/">Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<App1/>}/>
          <Route path="/calendar" element={<CalendarPage/>}>
            <Route path="/calendar/year" element={<Year />}/>
            <Route path="/calendar/month" element={<Month />}/>
            <Route path="/calendar/week" element={<Week />}/>
            <Route path="day" element={<Day />}/>
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
      </BrowserRouter>
    </div>

    
  );
}

export default App;
