export class Route {
    public currentMarker: google.maps.Marker;
    public endMarker: google.maps.Marker;
    private directionsRenderer: google.maps.DirectionsRenderer;
  
    constructor(options: {
      currentMarkerOptions: google.maps.ReadonlyMarkerOptions;
      endMarkerOptions: google.maps.ReadonlyMarkerOptions;
    }) {
      const { currentMarkerOptions, endMarkerOptions } = options;
      this.currentMarker = new google.maps.Marker(currentMarkerOptions);
      this.endMarker = new google.maps.Marker(endMarkerOptions);
  
      const strokeColor = (this.currentMarker.getIcon() as google.maps.ReadonlySymbol)
        .strokeColor;
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor,
          strokeOpacity: 0.5,
          strokeWeight: 5,
        },
      });
      this.directionsRenderer.setMap(
        this.currentMarker.getMap() as google.maps.Map
      );
  
      this.calculateRoute();
    }
  
    private calculateRoute() {
      const currentPosition = this.currentMarker.getPosition() as google.maps.LatLng;
      const endPosition = this.endMarker.getPosition() as google.maps.LatLng;
  
      new google.maps.DirectionsService().route(
        {
          origin: currentPosition,
          destination: endPosition,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            this.directionsRenderer.setDirections(result);
            return;
          }
  
          throw new Error(status);
        }
      );
    }
  
    delete() {
      this.currentMarker.setMap(null);
      this.endMarker.setMap(null);
      this.directionsRenderer.setMap(null);
    }
}
