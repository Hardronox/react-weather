import logo from './logo.svg';
import './App.css';
// import {data} from './api.js';
import {useEffect, useState} from "react";

function App() {
  const [tempState, setTempState] = useState('C');
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      const forecast = await fetch('http://api.weatherapi.com/v1/forecast.json?key=698dc13c77094cf187695058201212&q=London&days=1');

      setData(await forecast.json());
    }

    fetchWeather();
  }, [])

  if (!data) {
    return null;
  }

  const {hour} = data?.forecast?.forecastday[0];

  hour.length = 10;
  return (
    <div className="Wrapper">
      <div className="App">
        <div className="Weather-title">
          <div className="Country">
            <h2>{data.current.condition.text}</h2>
            <h3>{data.location.name}, {data.location.country}</h3>
          </div>

          <div>
            <button onClick={() => setTempState('C')} className={`Temp-toggle-button ${tempState === 'C' ? 'toggle-active' : null}`}>C</button>
            <button onClick={() => setTempState('F')} className={`Temp-toggle-button ${tempState === 'F' ? 'toggle-active' : null}`}>F</button>
          </div>
        </div>


        <div className="Daily-weather">

          {hour.map((item) => {
            const time = item.time.split(" ");

            return (
              <div className="Time-block" key={time[1]}>
                <div>
                  {time[1]}
                </div>

                <img src={item.condition.icon} alt=""/>

                <div>{tempState === 'C' ? item.temp_c : item.temp_f}</div>
              </div>
            )

          })}
        </div>
      </div>
    </div>
  );
}

export default App;
