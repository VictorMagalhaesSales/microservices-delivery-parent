import { Button, Grid, makeStyles, MenuItem, Select } from '@material-ui/core';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Route } from '../utils/models';

const API_URL = process.env.REACT_APP_API_URL as string;


const useStyles = makeStyles({
    root: {
      width: "100%",
      height: "100%",
    },
    select: {
        color: "gray"
    },
    form: {
      margin: "16px",
    },
    btnSubmitWrapper: {
      textAlign: "center",
      marginTop: "8px",
    },
    map: {
      width: "100%",
      height: "100%",
    },
  });

type Props = {
    
};
export const Mapping = (props: Props) => {
    const classes = useStyles();
    const [routes, setRoutes] = useState<Route[]>([]);
    const [routeIdSelected, setRouteIdSelected] = useState<string>("");

    useEffect(() => {
        fetch(`${API_URL}/routes`)
          .then((data) => data.json())
          .then((data) => setRoutes(data));
      }, []);

      
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
                a
                <div id="map" className={classes.map}/>
            </Grid>
        </Grid>
    );
};
