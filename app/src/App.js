import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br></br>
        <button onClick={()=>{helloHandler();calendarHandler()}}>Helllo</button>
        <h2>{data}</h2>
        <h2>{calendar}</h2>
      </header>
    </div>
  );
}

export default App;
