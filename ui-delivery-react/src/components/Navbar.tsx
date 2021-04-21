import { AppBar, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { FunctionComponent } from "react";
import DriverIcon from "@material-ui/icons/DriveEta";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "center"
  }
});

export const Navbar: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <IconButton edge="start" color="default" aria-label="menu">
          <DriverIcon />
        </IconButton>
        <Typography variant="h6" className="whiteColor">Delivery</Typography>
      </Toolbar>
    </AppBar>
  );
};
