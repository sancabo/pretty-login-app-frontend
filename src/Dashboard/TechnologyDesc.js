import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  withMargin: {
    marginLeft: "10px",
  },
  descText: {
    fontSize: "0.9rem",
  },
}));

function TechnologyDesc({ name, desc }) {
  const classes = useStyles();
  return (
    <div style={{ display: "flex" }}>
      <Typography color="secondary" className={classes.descText}>
        {name}
      </Typography>
      <div style={{ width: "25px" }} />
      <Typography className={(classes.withMargin, classes.descText)}>
        {desc}
      </Typography>
    </div>
  );
}

export default TechnologyDesc;
