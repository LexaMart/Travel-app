import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import iconImg from '../../../assets/images/maps-and-flags.svg'

import 'leaflet/dist/leaflet.css'

export const Map = ({ lat, lng }) => {
  const mapIcon = L.icon({
    iconUrl: iconImg,
    iconSize: [38, 95]
  })
  return (
    <div className="country-content-card map">
      <MapContainer center={[lat, lng]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={mapIcon} position={[lat, lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}