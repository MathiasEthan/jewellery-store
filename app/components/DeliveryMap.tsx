'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

interface DeliveryMapProps {
  deliveryLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  warehouseLocation: {
    lat: number;
    lng: number;
    address: string;
  };
}

// Dynamically import Leaflet with no SSR
const DeliveryMapComponent = ({ deliveryLocation, warehouseLocation }: DeliveryMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Calculate estimated delivery time based on distance
  const calculateDeliveryTime = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    // Simple distance calculation using the Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    // Simple estimation: 1 day per 1000km, minimum 1 day
    const estimatedDays = Math.max(1, Math.ceil(distance / 1000));
    return estimatedDays;
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      // Initialize map
      const map = L.map(mapRef.current).setView([deliveryLocation.lat, deliveryLocation.lng], 8);
      mapInstanceRef.current = map;

      // Add OpenStreetMap tiles with a different style
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(map);

      // Create custom icons
      const deliveryIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: red; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      const warehouseIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: blue; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      // Clear existing markers
      if (markersRef.current.length > 0) {
        markersRef.current.forEach(marker => {
          if (marker && map.hasLayer(marker)) {
            map.removeLayer(marker);
          }
        });
        markersRef.current = [];
      }

      // Add markers for both locations
      const deliveryMarker = L.marker([deliveryLocation.lat, deliveryLocation.lng], {
        icon: deliveryIcon
      }).addTo(map);

      const warehouseMarker = L.marker([warehouseLocation.lat, warehouseLocation.lng], {
        icon: warehouseIcon
      }).addTo(map);

      markersRef.current = [deliveryMarker, warehouseMarker];

      // Draw line between points
      const line = L.polyline([
        [deliveryLocation.lat, deliveryLocation.lng],
        [warehouseLocation.lat, warehouseLocation.lng]
      ], {
        color: 'red',
        weight: 3,
        opacity: 0.8
      }).addTo(map);

      // Calculate and display delivery time
      const deliveryTime = calculateDeliveryTime(
        deliveryLocation.lat,
        deliveryLocation.lng,
        warehouseLocation.lat,
        warehouseLocation.lng
      );

      // Create popup for delivery time
      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold">Estimated Delivery Time</h3>
          <p>${deliveryTime} day${deliveryTime > 1 ? 's' : ''}</p>
        </div>
      `;

      // Add popup to delivery marker
      deliveryMarker.bindPopup(popupContent);

      // Fit bounds to show both markers
      const bounds = L.latLngBounds([
        [deliveryLocation.lat, deliveryLocation.lng],
        [warehouseLocation.lat, warehouseLocation.lng]
      ]);
      map.fitBounds(bounds);
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [deliveryLocation, warehouseLocation, isClient]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

// Export the component with no SSR
export default dynamic(() => Promise.resolve(DeliveryMapComponent), {
  ssr: false
});