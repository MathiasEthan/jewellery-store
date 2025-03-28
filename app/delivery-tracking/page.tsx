'use client';

import { useState } from 'react';
import DeliveryMap from '../components/DeliveryMap';

export default function DeliveryTrackingPage() {
  // Example locations (you can replace these with actual locations)
  const [deliveryLocation] = useState({
    lat: 40.7128, // New York City
    lng: -74.0060,
    address: 'New York City, NY'
  });

  const [warehouseLocation] = useState({
    lat: 34.0522, // Los Angeles
    lng: -118.2437,
    address: 'Los Angeles, CA'
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Delivery Tracking</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <h3 className="font-medium text-gray-700">Delivery Location</h3>
              <p className="text-gray-600">{deliveryLocation.address}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-medium text-gray-700">Warehouse Location</h3>
              <p className="text-gray-600">{warehouseLocation.address}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Instructions</h3>
              <p className="text-gray-600">Click on the red marker on the map to see the estimated delivery time.</p>
            </div>
          </div>
        </div>
        
        <div>
          <DeliveryMap 
            deliveryLocation={deliveryLocation}
            warehouseLocation={warehouseLocation}
          />
        </div>
      </div>
    </div>
  );
} 