import { FC } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Tooltip,
} from 'react-leaflet';
import { LatLngExpression, icon } from 'leaflet';

function ChangeView({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position, 4);
  return null;
}

const Map: FC<{
  latlng: [string, string];
  countryName: string;
  flag: string;
}> = ({ latlng, countryName, flag }) => {
  const position: LatLngExpression = latlng.map(Number) as LatLngExpression;
  return (
    <MapContainer center={position} scrollWheelZoom={false} zoom={4}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker
        position={position}
        icon={icon({
          iconUrl: '/marker-icon.png',
          iconSize: [25, 41],
        })}
      >
        <Tooltip direction='top' offset={[0, -20]} opacity={1} permanent>
          {flag} {countryName}
        </Tooltip>
      </Marker>
      <ChangeView position={position} />
    </MapContainer>
  );
};

export default Map;
