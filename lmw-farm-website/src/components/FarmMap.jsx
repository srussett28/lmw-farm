import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';

function FarmMap() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // All your locations with coordinates
  const locations = [
    {
      id: 'farm',
      name: '🏡 LMW Farm',
      position: { lat: 36.4580, lng: -80.6140 },
      type: 'farm',
      address: 'Mount Airy, NC',
      details: 'Home base - Fresh eggs collected daily',
      color: '#8B4513'
    },
    {
      id: 'mtairy-market',
      name: '🌾 Mount Airy Farmers Market',
      position: { lat: 36.4993, lng: -80.6081 },
      type: 'active',
      address: '232 W. Independence Blvd., Mount Airy',
      details: 'Fridays 9:00 AM - 12:00 PM (April-September)',
      color: '#4CAF50'
    },
    {
      id: 'dobson-market',
      name: '🌾 Dobson Farmers Market',
      position: { lat: 36.3970, lng: -80.7240 },
      type: 'active',
      address: '903 East Atkins Street, Dobson',
      details: 'Fridays 3:00 PM - 6:00 PM (May-September)',
      color: '#4CAF50'
    },
    {
      id: 'mayberry-mall',
      name: '🏬 Mayberry Mall',
      position: { lat: 36.5089, lng: -80.6170 },
      type: 'coming',
      address: '388 Frederick Street, Mount Airy',
      details: 'Coming Soon - Primary pickup hub',
      color: '#2196F3'
    },
    {
      id: 'mtairy-library',
      name: '📚 Mount Airy Library',
      position: { lat: 36.4889, lng: -80.6070 },
      type: 'coming',
      address: '145 Rockford Street, Mount Airy',
      details: 'Coming Soon - Downtown location',
      color: '#2196F3'
    },
    {
      id: 'pilot-library',
      name: '🏔️ Pilot Mountain Library',
      position: { lat: 36.3856, lng: -80.4700 },
      type: 'coming',
      address: '319 W. Main Street, Pilot Mountain',
      details: 'Coming Soon - Eastern Surry County',
      color: '#2196F3'
    },
    {
      id: 'scc',
      name: '🎓 Surry Community College',
      position: { lat: 36.3889, lng: -80.4650 },
      type: 'coming',
      address: '612 E. Main Street, Pilot Mountain',
      details: 'Coming Soon - College campus',
      color: '#2196F3'
    },
    {
      id: 'king-market',
      name: '🌾 King Farmers Market',
      position: { lat: 36.2789, lng: -80.3589 },
      type: 'future',
      address: '105 Moore Road, King',
      details: 'Future - Wednesdays 11 AM - 1 PM',
      color: '#FF9800'
    },
    {
      id: 'elkin-market',
      name: '🌾 Elkin Farmers Market',
      position: { lat: 36.2448, lng: -80.8509 },
      type: 'future',
      address: '226 North Bridge Street, Elkin',
      details: 'Future - Saturdays 9 AM - 12 PM',
      color: '#FF9800'
    },
    {
      id: 'pilot-market',
      name: '🌾 Pilot Mountain Market',
      position: { lat: 36.3856, lng: -80.4700 },
      type: 'future',
      address: '300 South Key Street, Pilot Mountain',
      details: 'Future - Saturdays 3 PM - 6 PM',
      color: '#FF9800'
    }
  ];

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
        <Map
          defaultCenter={{ lat: 36.4580, lng: -80.6140 }}
          defaultZoom={10}
          mapId="lmw-farm-map"
        >
          {locations.map((location) => (
            <AdvancedMarker
              key={location.id}
              position={location.position}
              onClick={() => setSelectedLocation(location)}
            >
              <Pin
                background={location.color}
                borderColor="#fff"
                glyphColor="#fff"
              />
            </AdvancedMarker>
          ))}

          {selectedLocation && (
            <InfoWindow
              position={selectedLocation.position}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1">{selectedLocation.name}</h3>
                <p className="text-sm text-gray-700 mb-1">{selectedLocation.address}</p>
                <p className="text-sm text-gray-600">{selectedLocation.details}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}

export default FarmMap;