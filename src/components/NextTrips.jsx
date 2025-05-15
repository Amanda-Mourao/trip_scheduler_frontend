import { useEffect, useState } from "react";

function NextTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const nextTrips = JSON.parse(localStorage.getItem("trip")) || [];
    setTrips(nextTrips);
  }, []);
  console.log(trips);

  return (
    <>
      {trips.length === 0 ? (
        <p>No Trips planned yet. Plan your next trip here.</p>
      ) : (
        trips.map((trip, id) => (
          <div key={id}>
            <p>{trip.date}</p>
            <p>{trip.enddate}</p>
            <p>{trip.country}</p>
            <p>{trip.description}</p>
            <p>{trip.preparation}</p>
          </div>
        ))
      )}
    </>
  );
}

export default NextTrips;
