import { Button, Grid, MenuItem, Select } from '@material-ui/core';
import { Loader } from "google-maps";
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { mappingStyles } from '../css/mapping';
import { getCurrentPosition } from '../utils/geolocation';
import { Route } from '../utils/models';

const googleMapsLoader = new Loader(process.env.REACT_APP_GOOGLE_API_KEY);
const API_URL = process.env.REACT_APP_API_URL as string;

export const Mapping = () => {
  
    const classes = mappingStyles();
    const [routes, setRoutes] = useState<Route[]>([]);
    const [routeIdSelected, setRouteIdSelected] = useState<string>("");
    const mapRef = useRef<google.maps.Map>();

    // PEGAR AS ROTAS DO BACKEND NESTJS
    useEffect(() => {
        fetch(`${API_URL}/routes`)
          .then((data) => data.json())
          .then((data) => setRoutes(data));
      }, []);
    
    // MONTAR O MAPA NA POSIÇÃO ATUAL
    useEffect(() => {(async () => {
        const [, position] = await Promise.all([
          googleMapsLoader.load(),
          getCurrentPosition({ enableHighAccuracy: true }),
        ]);
        const divMap = document.getElementById("map") as HTMLElement;
        mapRef.current = new google.maps.Map(divMap, {zoom: 15, center: position});
    })(); },[]);

    // INICIAR A ROTA
    const startRoute = useCallback((event: FormEvent) => {
        event.preventDefault();
        console.log(routeIdSelected)
      },
      [routeIdSelected, routes]
    );

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={3}>
              <form className={classes.form} onSubmit={startRoute}>
                  <Select fullWidth displayEmpty value={routeIdSelected} className={classes.select}
                      onChange={(event) => setRouteIdSelected(event.target.value + "")}>
                      <MenuItem value="">
                          <em>Selecione uma corrida</em>
                      </MenuItem>
                      {routes.map((route, key) => (
                          <MenuItem key={key} value={route._id}>
                              {route.title}
                          </MenuItem>
                      ))}
                  </Select>
                  <div className={classes.btnSubmitWrapper}>
                      <Button type="submit" color="primary" variant="contained">Iniciar uma corrida</Button>
                  </div>
              </form>
            </Grid>
            <Grid item xs={12} sm={9}>
                <div id="map" className={classes.map}/>
            </Grid>
        </Grid>
    );
};
