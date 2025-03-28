'use client';

import DeliveryMap from './DeliveryMap';

export default function DeliveryMapSection() {
  const deliveryLocation = {
    lat: 19.0760, // Mumbai
    lng: 72.8777,
    address: 'Mumbai, Maharashtra'
  };

  const warehouseLocation = {
    lat: 28.6139, // Delhi
    lng: 77.2090,
    address: 'Delhi, NCR'
  };

  return (
    <div className="mt-8">
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
        <div className="mb-4">
          <h3 className="font-medium text-gray-700">Instructions</h3>
          <p className="text-gray-600">Click on the red marker on the map to see the estimated delivery time.</p>
        </div>
        <DeliveryMap 
          deliveryLocation={deliveryLocation}
          warehouseLocation={warehouseLocation}
        />
      </div>
    </div>
  );
} 