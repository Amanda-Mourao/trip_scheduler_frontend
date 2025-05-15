import { useState } from "react";
import Map from "./Map";

function PlanTrip() {
  const [date, setDate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [preparation, setPreparation] = useState("");

  const handleSubmit = () => {
    if (
      !date ||
      !enddate ||
      !country.trim() ||
      !description.trim() ||
      !preparation.trim()
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const newTrip = { date, enddate, country, description, preparation };
    const existingTrip = JSON.parse(localStorage.getItem("trip")) || [];
    const matchingDate = existingTrip.some((trip) => trip.date === date);
    if (matchingDate) {
      alert("Already booked a Trip for this date!");
      return;
    }

    existingTrip.push(newTrip);

    localStorage.setItem("trip", JSON.stringify(existingTrip));

    setDate("");
    setEnddate("");
    setCountry("");
    setDescription("");
    setPreparation("");
  };

  return (
    <div>
      <h2>PLAN YOUR NEXT TRIP</h2>
      <div className="flex flex-col">
        <label id="start">When does your next trip start?</label>
        <input
          type="date"
          id="start"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label id="end">When does your next trip end?</label>
        <input
          type="date"
          is="end"
          value={enddate}
          onChange={(e) => setEnddate(e.target.value)}
        />
        <label id="country">
          Which country do you want to visit this time?
        </label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Type in your destination"
        />
        <label id="description">
          Places you want to visit or activities you want to do there?
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type in your plans"
        />
        <label id="preparation">What do you need for this trip?</label>
        <input
          type="text"
          id="preparation"
          value={preparation}
          onChange={(e) => setPreparation(e.target.value)}
          placeholder="Type in what needs to be done before your Trip starts"
        />
      </div>
      <div>
        <button onClick={handleSubmit}>SAVE THIS TRIP</button>
      </div>
      <div>
        <Map />
      </div>
    </div>
  );
}

export default PlanTrip;
