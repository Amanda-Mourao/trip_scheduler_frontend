import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.prototype.options.iconUrl = markerIconUrl;
L.Icon.Default.prototype.options.iconRetinaUrl = markerIconRetinaUrl;
L.Icon.Default.prototype.options.shadowUrl = markerShadowUrl;
L.Icon.Default.imagePath = "";

function Map2({
  countries = [],
  onMarkerClick,
  center,
  width = "100%",
  height = "400px",
}) {
  return (
    <div style={{ width, height }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={2}
        className="grayscale"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        {countries.map((country, id) =>
          country.latlng && country.latlng.length === 2 ? (
            <Marker
              key={id}
              position={country.latlng}
              eventHandlers={{
                click: () => onMarkerClick(country),
              }}
            >
              <Popup>
                <strong className="uppercase">{country.name.common}</strong>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}

export default Map2;
