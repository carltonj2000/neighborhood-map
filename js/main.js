/* eslint no-unused-vars: "off" */

/* for development should remove this for production */
document.write('<script async src="http://HOST:3000/browser-sync/browser-sync-client.js?v=2.18.8"><\/script>'.replace('HOST', location.hostname));

/** Initialize the map and a marker **/
function initMap() {
  const uluru = {lat: -25.363, lng: 131.044};
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru,
  });
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
