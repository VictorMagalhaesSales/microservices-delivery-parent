import { Button, Grid, MenuItem, Select } from '@material-ui/core';
import { Loader } from "google-maps";
import { sample, shuffle } from 'lodash';
import { useSnackbar } from 'notistack';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { mappingStyles } from '../css/mapping';
import { colors, getCurrentPosition, makeCarIcon, makeMarkerIcon } from '../utils/functions';
import { Route } from '../utils/interfaces';
import { Map, RouteExistsError } from '../utils/map.model';
import { Navbar } from './Navbar';

const googleMapsLoader = new Loader(process.env.REACT_APP_GOOGLE_API_KEY);
const API_URL = process.env.REACT_APP_API_URL as string;

export const Mapping = () => {
  
    const classes = mappingStyles();
    const [routes, setRoutes] = useState<Route[]>([]);
    const [routeIdSelected, setRouteIdSelected] = useState<string>("");
    const { enqueueSnackbar } = useSnackbar();
    const socketIORef = useRef<SocketIOClient.Socket>();
    const mapRef = useRef<Map>();

    const finishRoute = useCallback(
        (route: Route) => {
          enqueueSnackbar(`${route.title} finalizou!`, {
            variant: "success",
          });
          mapRef.current?.removeRoute(route._id);
        },
        [enqueueSnackbar]
    );

    useEffect(() => {
        if (!socketIORef.current?.connected) {
          socketIORef.current = io.connect(API_URL);
          socketIORef.current.on("connect", () => console.log("conectou"));
        }
    
        const handler = (data: {
          routeId: number;
          position: [number, number];
          finished: boolean;
        }) => {
          console.log(data);
          mapRef.current?.moveCurrentMarker(data.routeId, {
            lat: data.position[0],
            lng: data.position[1],
          });
          const route = routes.find((route) => route._id === data.routeId) as Route;
          if (data.finished) {
            finishRoute(route);
          }
        };
        socketIORef.current?.on("new-position", handler);
        return () => {
          socketIORef.current?.off("new-position", handler);
        };
    }, [finishRoute, routes, routeIdSelected]);
    
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
        mapRef.current = new Map(divMap, {zoom: 15, center: position});
    })(); },[]);

    const startRoute = useCallback((event: FormEvent): void => {
        event.preventDefault();
        const route = routes.find((route) => route._id === +routeIdSelected);
        const color = sample(shuffle(colors)) as string; // Pega uma cor aleatoriamente
        if (route == null) {
            enqueueSnackbar(`Rota não encontrada`, {variant: "error"});
        } else {
            iniciarRota(route, color);
        }
      },
      [routeIdSelected, routes, enqueueSnackbar]
    );

    const iniciarRota = (route: Route, color: string) => {
        try {
            mapRef.current?.addRoute(+routeIdSelected, {
                currentMarkerOptions: {
                  position: route?.startPosition,
                  icon: makeCarIcon(color),
                },
                endMarkerOptions: {
                  position: route?.endPosition,
                  icon: makeMarkerIcon(color),
                },
            });
            socketIORef.current?.emit("new-direction", {routeId: routeIdSelected});
        } catch (error) {
            if (error instanceof RouteExistsError) {
                enqueueSnackbar(`${route?.title} já adicionado, espere finalizar.`, {variant: "error"});
                return;
            }
            console.error(error);
        }
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={3}>
                <Navbar/>
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
