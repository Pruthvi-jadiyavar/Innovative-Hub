import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Circle, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 37.4220656, // Googleplex default
    lng: -122.0840897
};



const MapComponent = ({ dangerZones = [] }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback(function callback(map) {
        // const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                styles: [
                    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] } // Cleaner look
                ],
                streetViewControl: false,
                mapTypeControl: false,
            }}
        >
            {/* Current Location Marker (Mocked) */}
            <Marker position={center} label="You" />

            {/* Danger Zones */}
            {/* Danger Zones */}
            {dangerZones.map((zone, index) => (
                <Circle
                    key={index}
                    center={{ lat: zone.lat, lng: zone.lng }}
                    radius={zone.radius}
                    options={{
                        fillColor: zone.type === 'danger' ? '#E53E3E' : '#DD6B20',
                        fillOpacity: 0.3,
                        strokeColor: zone.type === 'danger' ? '#E53E3E' : '#DD6B20',
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                    }}
                />
            ))}
        </GoogleMap>
    );
};

export default React.memo(MapComponent);
