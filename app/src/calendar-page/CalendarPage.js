import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export function Year(props) {
  return <h2>Year View</h2>;
}

export function Month(props) {
  return <h2>Month View</h2>;
}

export function Week(props) {
  return <h2>Week View</h2>;
}

export function Day(props) {
  const [calendar, setCalendar] = useState(localStorage.getItem("calendar"))
  
  function addDAy(da, month, year){
    let locCalendar = localStorage.getItem("calendar");
    if (locCalendar == null){
      locCalendar = [];
    }
    locCalendar.push({'day':da, 'month':month, 'year':year})
    localStorage.setItem('calendar', locCalendar)
    setCalendar(locCalendar);
    console.log(locCalendar)
    console.log(calendar)
  }
  return (<>
    <h2>Day View</h2>
    <input label="year"></input>
    <input label="month"></input>
    <input label="day"></input>
    <button onClick={()=>addDAy(12,12,12)}>Add day</button>
    <button>show calendar</button>
    {/* {calendar.forEach(element => {
      return(
      <p>{element}</p>);
    })} */}
  </>);
}

export default function CalendarPage() {
  
  return (
    <div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/calendar/year">year</Link>
            </li>
            <li>
              <Link to="/calendar/month">month</Link>
            </li>
            <li>
              <Link to="/calendar/week">week</Link>
            </li>
            <li>
              <Link to="/calendar/day">day</Link>
            </li>
            <li>
              <Link to={`/calendar/day`}>day</Link>
              {/* <Link to={`/calendar/${}`}>day</Link> */}
            </li>
          </ul>
        </nav>
        <Outlet/>
      </div>
    </div>
  );

}



        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {/* <Routes>
          <Route path="/about" element={<About />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/"element={<Home />}/>
        </Routes> */}
// export default function CalendarPage(props){
    
// }