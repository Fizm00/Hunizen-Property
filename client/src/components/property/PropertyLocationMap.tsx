import { MapPin, Star } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { NearbyPlace } from "../../types";

interface PropertyLocationMapProps {
  title: string;
  location: string;
  latLng: [number, number];
  nearbyPlaces: NearbyPlace[];
}

const propertyIcon = L.divIcon({
  html: `
    <div class="flex items-center justify-center w-10 h-10 bg-zinc-900 border-2 border-[#F4F3EC] rounded-full shadow-lg">
      <svg class="w-5 h-5 text-[#F4F3EC]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </div>
  `,
  className: "custom-property-marker",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const placeIcon = L.divIcon({
  html: `
    <div class="flex items-center justify-center w-8 h-8 bg-zinc-800 border border-zinc-700 rounded-full shadow-md">
      <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
  `,
  className: "custom-place-marker",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function PropertyLocationMap({
  title,
  location,
  latLng,
  nearbyPlaces,
}: PropertyLocationMapProps) {
  return (
    <div className="py-8 border-b border-slate-200/80 flex flex-col gap-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800">Lokasi dan Lingkungan Sekitar</h2>
        <p className="flex items-center gap-0.5 mt-1.5 text-sm text-slate-400 font-semibold">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          {location}
        </p>
      </div>

      <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-zinc-100 relative z-10 border border-slate-100">
        <MapContainer
          center={latLng}
          zoom={14}
          zoomControl={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={latLng} icon={propertyIcon}>
            <Popup className="font-sans">
              <span className="font-bold text-xs">{title}</span>
            </Popup>
          </Marker>

          {nearbyPlaces.map((np, idx) => {
            const latOffset = idx === 0 ? 0.003 : idx === 1 ? -0.004 : 0.002;
            const lngOffset = idx === 0 ? -0.002 : idx === 1 ? 0.003 : 0.005;
            const markerLatLng: [number, number] = [
              latLng[0] + latOffset,
              latLng[1] + lngOffset,
            ];

            return (
              <Marker key={idx} position={markerLatLng} icon={placeIcon}>
                <Popup className="font-sans">
                  <span className="font-bold text-xs">{np.name}</span>
                  <span className="text-xs block text-slate-400">Jarak: {np.distance}</span>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide">Tempat di sekitar</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {nearbyPlaces.map((np, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-3.5 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm"
            >
              <div>
                <span className="text-sm font-bold text-slate-700 block">{np.name}</span>
                <span className="text-xs text-slate-400 font-semibold block">{np.distance}</span>
              </div>

              <div className="flex items-center gap-0.5 text-sm text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                <span>{np.rating.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
