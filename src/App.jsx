import { useState, useEffect } from "react";
import axios from "axios";
import { CountryOptions, YearOptions, MonthOptions } from "./componets/index";

function App() {
  const [result, setResult] = useState([]);
  const [country, setCountry] = useState("US");
  const [year, setYear] = useState("2023");
  const [month, setMonth] = useState("03");
  const [signal, setSignal] = useState(false);

  // when component did mount
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`http://localhost:5000/api`);
        const data = await response.data
        setResult(data);
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  // whenever signal changes
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.post(`http://localhost:5000/api/listholidays`, {
          country: country,
          month : month,
          year: year,
        });
        const data = await response.data
        setResult(data);
        console.log(data)
      };
      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [signal]);

  return (
    <div className="App">

      <h1> Calendar Application</h1>
      <CountryOptions handleCountry={setCountry} />
      <YearOptions handleYear={setYear} />
      <MonthOptions handleMonth={setMonth} />

      <button onClick={() => setSignal(!signal)}> Submit</button>
      
      <h2>Public Holidays</h2>
      <ul className="list-items">
        {result.map((item) => (
          <li key={`${item.date}+${item.reason}`}>
            <h2>{`Date : ${item.date}`}</h2>
            <p>{`Reason : ${item.reason}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
