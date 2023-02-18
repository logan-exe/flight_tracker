import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import env from "react-dotenv";
function App() {
  const [flightStatus, setFlightStatus] = useState();
  const [flighId, setFlightId] = useState();
  const [loading, setLoading] = useState();

  const getFlightStatus = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://flight-radar1.p.rapidapi.com/flights/search",
      params: { query: flighId, limit: "25" },
      headers: {
        "X-RapidAPI-Key": env.API_KEY,
        "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setFlightStatus(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };
  return (
    <div className="App">
      <div style={{ width: "100vw" }}>
        <input
          type="text"
          onChange={(e) => setFlightId(e.target.value)}
          style={{ width: "50%", marginTop: "40px", padding: "12px" }}
          placeholder="Enter flight Number"
        />
        <button onClick={() => getFlightStatus()} style={{ padding: "12px" }}>
          {" "}
          {loading ? "loading..." : "Search Flight"}
        </button>
      </div>

      <center>
        <div className="table">
          {flightStatus.results.length !== 0 ? (
            <table>
              <thead>
                <th>Flight id</th>
                <th>Flight Label</th>
                <th>lon</th>
                <th>lat</th>
                <th>Route</th>

                <th>Type</th>
              </thead>
              <tbody>
                {flightStatus.results.map((flight, index) => {
                  return (
                    <tr key={index}>
                      <td>{flight.id}</td>
                      <td>{flight.label}</td>
                      <td>{flight.detail.lon}</td>
                      <td>{flight.detail.lat}</td>
                      <td>{flight.detail.route}</td>
                      <td>{flight.type}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            "No Data To Show. Search for Flights"
          )}
        </div>
      </center>
    </div>
  );
}

export default App;
