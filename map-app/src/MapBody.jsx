import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useEffect, useState } from 'react';
import './styles/MapBody.css';
import * as L from "leaflet";
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import "leaflet-routing-machine";
import 'lrm-graphhopper';


// function buttonClick() {
//   console.log("Hello, World!")
// }

function MapBody() {




  const [policeData, setPoliceData] = useState([]);

  const [currentPosition, setCurrentPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);
  const [routing, setRouting] = useState(null);

  // var map = L.map('map')

  // map.setView([23.7457455, 90.4237244], 13)



  async function getPoliceData() {
    const response = await fetch("http://localhost:5001/api/incident/all");
    let data = await response.json();
    // console.log(data);
    setPoliceData(data)
  }

  getPoliceData()

  const iconMarkup = renderToStaticMarkup(<i className="material-symbols-outlined" style={{ color: 'red' }}>warning</i>);
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });



  // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  // }).addTo(map);

  // let marker, circle;

  // navigator.geolocation.getCurrentPosition((position) => {

  //   const lat = position.coords.latitude
  //   const lng = position.coords.longitude
  //   const accuracy = position.coords.accuracy

  //   map.setViimport "leaflet-routing-machine";ew([lat, lng], 13);

  //   if (marker) {
  //     map.removeLayer(marker)
  //     map.removeLayer(circle)
  //   }

  //   marker = L.marker([lat, lng]).addTo(map);
  //   circle = L.circle([lat, lng], {
  //     color: 'red',
  //     fillColor: '#f03',
  //     fillOpacity: 0.5,
  //     radius: accuracy
  //   }).addTo(map);


  // }, (error) => {
  //   console.log(error)
  // })

  // const MapClickEvent = () => {
  //   useMapEvents({
  //     click: (e) => {
  //       const { lat, lng } = e.latlng;
  //       if (!currentPosition) {
  //         setCurrentPosition([lat, lng]);
  //       } else if (!destinationPosition) {
  //         setDestinationPosition([lat, lng]);
  //       } else {
  //         setCurrentPosition([lat, lng]);
  //         setDestinationPosition(null);
  //       }
  //     },
  //   });
  //   return null;
  // };

  const handleGoClick = () => {
    if (currentPosition && destinationPosition) {
      // Calculate the route using GraphHopper (similar to your existing code)
      // Update the map with the new route
      // You can remove the existing route if needed
      console.log('Calculating route...');
    } else {
      console.log('Please set both current position and destination.');
    }
  };

  const MapClickEvent = () => {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        if (!currentPosition) {
          setCurrentPosition([lat, lng]);
        } else if (!destinationPosition) {
          setDestinationPosition([lat, lng]);
          if (routing) {
            map.removeControl(routing);
          }
          const leafletRouting = L.Routing.control({
            waypoints: [
              L.latLng(currentPosition),
              L.latLng([lat, lng])
            ],
            routeWhileDragging: true,
            router: new L.Routing.graphHopper('65a6ed8f-3edf-44ca-a7cf-a83806334864'),
          }).addTo(map);
          setRouting(leafletRouting);
        } else {
          setCurrentPosition([lat, lng]);
          setDestinationPosition(null);
          if (routing) {
            map.removeControl(routing);
          }
        }
      },
    });


    return null;
  };






  return (
    <div>
      <div className='topbar'>
        {/* <button className="button" onClick={buttonClick()}>Get Direction</button> */}


        <button onClick={handleGoClick}>GO</button>
      </div>
      <MapContainer center={[23.7457455, 90.4237244]} zoom={13} scrollWheelZoom={false}
        style={{ height: "650px" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {policeData.map((data) =>
          <Marker className='incident-marker' position={[data['latitude'], data['longitude']]} icon={customMarkerIcon}>
            <Popup>
              {data['incident']}
            </Popup>
          </Marker>

        )}
        {currentPosition && <Marker position={currentPosition} />}
        {destinationPosition && <Marker position={destinationPosition} />}

        <MapClickEvent />

      </MapContainer>
    </div>
  )
}

export default MapBody;