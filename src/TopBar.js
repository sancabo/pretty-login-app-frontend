import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  makeStyles,
  Link,
} from "@material-ui/core";
import { Security } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  siteHome: {
    backgroundColor: "white",
    width: "300px",
    height: "64px",
    borderRadius: "0 32px 32px 0",
    display: "flex",
    alignItems: "center",
    paddingLeft: "30px",
  },
}));
function TopBar(props) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Link
          component={RouterLink}
          to="/"
          className={classes.withSpacingMargin}
          underline="none"
        >
          <Paper elevation={3} className={classes.siteHome}>
            <Avatar>
              <Security />
            </Avatar>
            <div style={{ width: "30px" }} />
            <Typography variant="h5" color="primary">
              My App
            </Typography>
          </Paper>
        </Link>
        {props.children}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
