import { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

const center = { lat: 48.8584, lng: 2.2945 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <div className="flex flex-col items-center h-screen w-screen relative">
      <div className="absolute inset-0">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div className="p-4 rounded-lg m-4 bg-white shadow-base min-w-[20rem] z-10">
        <div className="flex justify-between space-x-2">
          <Autocomplete>
            <input
              type="text"
              placeholder="Origin"
              ref={originRef}
              className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none"
            />
          </Autocomplete>
          <Autocomplete>
            <input
              type="text"
              placeholder="Destination"
              ref={destinationRef}
              className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none"
            />
          </Autocomplete>
          <div className="flex items-center space-x-2">
            <button
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 focus:outline-none"
              onClick={calculateRoute}
            >
              Calculate Route
            </button>
            <button
              className="p-2 text-pink-500 hover:text-pink-600 focus:outline-none"
              onClick={clearRoute}
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-4 space-x-4">
          <div>
            <span>Distance: {distance}</span>
          </div>
          <div>
            <span>Duration: {duration}</span>
          </div>
          <button
            className="p-2 text-pink-500 hover:text-pink-600 focus:outline-none"
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
          >
            <FaLocationArrow />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
