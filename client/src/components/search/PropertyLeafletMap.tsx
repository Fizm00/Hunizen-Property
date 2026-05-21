import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Star, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SearchKostCard } from "../../types";
import { formatPriceLabel } from "../../utils/formatters";

// Setup Leaflet Map controller for smooth camera panning/zooming
interface MapControllerProps {
  selectedLatLng: [number, number] | null;
}

function MapController({ selectedLatLng }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (selectedLatLng) {
      map.flyTo(selectedLatLng, 14, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [selectedLatLng, map]);

  return null;
}

// Generate premium HTML custom marker tag (Airbnb Style)
const createLeafletMarkerIcon = (
  priceLabel: string,
  isActive: boolean,
  type: "Campur" | "Putra" | "Putri"
) => {
  const genderColor =
    type === "Campur" ? "#f59e0b" : type === "Putra" ? "#3b82f6" : "#db2777";

  const markerClass = isActive
    ? "bg-[#F4F3EC] text-zinc-900 border-[#F4F3EC] scale-110 z-50 font-extrabold"
    : "bg-zinc-900/95 text-zinc-300 border-zinc-800 hover:border-zinc-500 hover:text-white";

  const arrowClass = isActive
    ? "bg-[#F4F3EC] border-[#F4F3EC]"
    : "bg-zinc-900 border-zinc-800";

  return L.divIcon({
    html: `
      <div class="flex flex-col items-center transform -translate-x-1/2 -translate-y-full">
        <div class="flex items-center gap-1 px-3 py-1.5 border rounded-full text-xs font-bold shadow-md transition-all duration-300 ${markerClass}">
          <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${genderColor}"></span>
          <span>${priceLabel}</span>
        </div>
        <div class="w-2 h-2 -mt-1 rotate-45 border-r border-b transition-all duration-300 ${arrowClass}"></div>
      </div>
    `,
    className: "custom-leaflet-marker",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

interface PropertyLeafletMapProps {
  properties: SearchKostCard[];
  hoveredPropertyId: string | null;
  setHoveredPropertyId: (id: string | null) => void;
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  selectedProperty: SearchKostCard | null;
}

export function PropertyLeafletMap({
  properties,
  hoveredPropertyId,
  setHoveredPropertyId,
  selectedPropertyId,
  setSelectedPropertyId,
  selectedProperty,
}: PropertyLeafletMapProps) {
  const initialCenter: [number, number] = [-7.778, 110.385];
  const initialZoom = 13;

  return (
    <div className="relative w-full h-full bg-[#121214] overflow-hidden">

      <MapContainer
        center={initialCenter}
        zoom={initialZoom}
        zoomControl={false}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <MapController
          selectedLatLng={selectedProperty ? selectedProperty.latLng : null}
        />
        {properties.map((kost) => {
          const isHovered = hoveredPropertyId === kost.id;
          const isSelected = selectedPropertyId === kost.id;
          const isActive = isHovered || isSelected;

          const priceLabel = formatPriceLabel(kost.price);

          const markerIcon = createLeafletMarkerIcon(priceLabel, isActive, kost.type);

          return (
            <Marker
              key={kost.id}
              position={kost.latLng}
              icon={markerIcon}
              eventHandlers={{
                click: () => {
                  setSelectedPropertyId(kost.id);
                },
                mouseover: () => {
                  setHoveredPropertyId(kost.id);
                },
                mouseout: () => {
                  setHoveredPropertyId(null);
                },
              }}
            />
          );
        })}
      </MapContainer>

      {/* 2. Floating Detail Popup Overlay (Sync with React state) */}
      <AnimatePresence>
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-80 bg-zinc-950/98 backdrop-blur-md border border-zinc-800 rounded-3xl p-3 shadow-2xl z-20"
          >
            <div className="relative w-full">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPropertyId(null)}
                className="absolute top-2 right-2 z-10 flex justify-center items-center w-7 h-7 bg-black/60 hover:bg-black/95 text-zinc-400 hover:text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image box */}
              <div className="relative w-full h-40 overflow-hidden rounded-[1.25rem] bg-zinc-900">
                <img
                  src={selectedProperty.img}
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 left-2 px-3 py-0.5 rounded-full text-[9px] font-bold text-white ${selectedProperty.type === "Campur"
                    ? "bg-amber-600"
                    : selectedProperty.type === "Putra"
                      ? "bg-blue-600"
                      : "bg-rose-600"
                  }`}>
                  {selectedProperty.type}
                </span>
              </div>

              {/* Text content details */}
              <div className="p-3">
                <div className="flex justify-between items-center w-full">
                  <span className="flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold text-amber-500 bg-amber-500/10 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500 stroke-amber-500" />
                    {selectedProperty.rating.toFixed(1)}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400">
                    Sisa {selectedProperty.roomLeft} Kamar
                  </span>
                </div>

                <h4 className="mt-2 font-bold text-sm text-zinc-100 line-clamp-1">
                  {selectedProperty.title}
                </h4>

                <p className="flex items-center gap-0.5 mt-1 text-[11px] text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span className="line-clamp-1">{selectedProperty.location}</span>
                </p>

                <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-800/60 w-full">
                  <div className="flex flex-col">
                    {selectedProperty.originalPrice && (
                      <span className="text-[9px] text-zinc-500 line-through block">
                        {selectedProperty.originalPrice}
                      </span>
                    )}
                    <span className="text-xs font-black text-[#F4F3EC]">
                      {selectedProperty.price}
                    </span>
                  </div>

                  <button className="px-4 py-1.5 bg-[#F4F3EC] hover:bg-white text-zinc-900 text-[10px] font-extrabold rounded-full transition-colors cursor-pointer">
                    Sewa Kost
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
