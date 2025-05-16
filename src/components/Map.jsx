import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map({ center }) {
  return (
    <div className="w-150 bg-gray-200" style={{ height: "650px" }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={2}
        className="h-full w-full grayscale"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={[center.lat, center.lng]}>
          <Popup>Your selected location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
