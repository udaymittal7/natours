/* eslint-disable */

// DOM elements
const mapBox = document.getElementById('map');

// delegation
if(mapBox){
    const locations = JSON.parse(mapBox.dataset.locations);
    // console.log(locations);
    
    mapboxgl.accessToken = 'pk.eyJ1IjoidWRheW1pdHRhbCIsImEiOiJja2x2OTV1OGcybzk4Mm9uMXJndTZncWQ0In0.KtWy5eBzlBvvv0IxY5dd1Q';
    
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/udaymittal/cklv2voua2ufa17qp3psaxias',
        // center: [-118.118491, 34.111745],
        // zoom: 10
        scrollZoom: false
    });
    
    const bounds = new mapboxgl.LngLatBounds();
    
    locations.forEach(loc => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';
    
        //Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);
    
        //Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
    
        // include map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
}