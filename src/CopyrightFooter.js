import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
function CopyrightFooter() {
  const useStyles = makeStyles((theme) => ({
    bottomToolbar: {
      justifyContent: "center",
    },
  }));

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.bottomToolbar}>
        <Typography>
          Created by sancabo@git. Released under the MIT License.
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default CopyrightFooter;
