import { Route } from "./route.model";

export class Map {
    public map: google.maps.Map;
    private routes: { [id: number]: Route } = {};
    constructor(element: Element, options: google.maps.MapOptions) {
      this.map = new google.maps.Map(element, options);
    }
  
    moveCurrentMarker(id: number, position: google.maps.LatLngLiteral) {
      this.routes[id].currentMarker.setPosition(position);
    }
  
    removeRoute(id: number) {
      const route = this.routes[id];
      route.delete();
      delete this.routes[id];
    }
  
    addRoute(id: number, routeOptions: {
        currentMarkerOptions: google.maps.ReadonlyMarkerOptions;
        endMarkerOptions: google.maps.ReadonlyMarkerOptions;
    }) {
      if (id in this.routes) {
        throw new RouteExistsError();
    }
  
      const { currentMarkerOptions, endMarkerOptions } = routeOptions;
      this.routes[id] = new Route({
        currentMarkerOptions: { ...currentMarkerOptions, map: this.map },
        endMarkerOptions: { ...endMarkerOptions, map: this.map },
      });
  
      this.fitBounds();
    }
  
    private fitBounds() {
      const bounds = new google.maps.LatLngBounds();
  
      Object.keys(this.routes).forEach((id: string) => {
        const route = this.routes[+id];
        bounds.extend(route.currentMarker.getPosition() as any);
        bounds.extend(route.endMarker.getPosition() as any);
      });
  
      this.map.fitBounds(bounds);
    }
}

export class RouteExistsError extends Error {}